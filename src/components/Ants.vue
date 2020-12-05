<template>
    <div><div id="main" class="w-100 h-100"></div></div>
</template>

<script>
import Two from 'two.js';

var paths = [];
const PARTY_SIZE = 10, ANT_V = 1;
const MIN_PATH_DIST = 2, MAX_PATH_DIST = 4, ANT_RATE = ANT_V * 50;
const D_PATH_LMAX = 10;
const CONTRAST_C = '#000000';

const RADIUS = 200, K = 5;
const PR = 30;
const CELLSIZE = RADIUS * Math.SQRT1_2;
var two, radialGrid;
var offsetX, offsetY;
var canvasW, canvasH;

// convenience functions
const distSq = (x1, x2, y1, y2) => {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

const marsaglia = () => {
    let u = 0, v = 0;

    while (u * u + v * v == 0 || u * u + v * v >= 1) {
        u = Math.random();
        v = Math.random();
    }

    let s = u * u + v * v;
    return u * Math.sqrt(-2 * Math.log(s) / s);
}

const closestHole = (cx, cy, r) => {
    if (cx < PR || cx > two.width - PR || cy < PR || cy > two.height - PR)
        return -2;

    var cr = cy / CELLSIZE | 0, cc = cx / CELLSIZE | 0;
    var i0 = Math.max(0, cr - 2), j0 = Math.max(0, cc - 2);
    var i1 = Math.min(radialGrid.length - 1, cr + 2), j1 = Math.min(radialGrid[0].length - 1, cc + 2);

    for (let i = i0; i <= i1; i++) 
        for (let j = j0; j <= j1; j++) 
            if (radialGrid[i][j] && distSq(radialGrid[i][j].x, cx, radialGrid[i][j].y, cy) <= r ** 2) 
                return radialGrid[0].length * i + j;

    return -1;
}

const closestPeg = (x, y) => {
    let xa = x - offsetX, ya =  y - offsetY;
    let xb = (xa - PR) % (PR * 2) < PR ? xa - (xa % PR) : xa + PR - (xa % PR);
    let yb = (ya - PR) % (PR * 2) < PR ? ya - (ya % PR) : ya + PR - (ya % PR);
    return [xb + offsetX, yb + offsetY];
}

const radialGridLookUp = (x, y) => {
    return (y / CELLSIZE | 0) * radialGrid[0].length + (x / CELLSIZE | 0); 
}

const poissonSampleHoles = () => {
    var [sx, sy] = [...closestPeg(
        (two.width - PR) * Math.random() + PR / 2,
        (two.height - PR) * Math.random() + PR / 2
    )];
    var startHole = Hole(sx, sy, 20);
    radialGrid[startHole.y / CELLSIZE | 0][startHole.x / CELLSIZE | 0] = startHole;
    var active = [startHole];

    while (active.length) {
        var curInd = Math.random() * active.length | 0;
        var parent = active[curInd];
        const SEED = Math.random();
        const EPSILON = 0.0000001;
        var j;

        for (j = 0; j < K; j++) {
            var a = 2 * Math.PI * (SEED + 1.0 * j / K);
            const r = RADIUS + EPSILON;
            var x = parent.x + r * Math.cos(a), y = parent.y + r * Math.sin(a);

            // let tmp = two.makeCircle(x, y, 5);
            // tmp.noStroke();
            // tmp.fill = 'black';
            
            if (closestHole(x, y, RADIUS) == -1) {
                var [rx, ry] = [...closestPeg(x, y)];
                var newHole = Hole(rx, ry, 20);
                radialGrid[ry / CELLSIZE | 0][rx / CELLSIZE | 0] = newHole;
                active.push(newHole);
            }
        }

        if (j >= K) {
            var lastHole = active.pop();

            if (curInd < active.length)
                active[curInd] = lastHole;
        }
    }
}

// classes
const Point = (x, y, r, c) => {
    const self = {
        x: x,
        y: y,
        radius: r,
        colour: c,
        sprite: {},
        render() {
            this.sprite.translation.set(this.x, this.y)
            this.sprite.fill = this.colour;
        }
    };

    self.sprite = two.makeCircle(self.x, self.y, self.radius);
    self.sprite.noStroke();
    self.sprite.fill = self.colour;
    return self;
}

const Animatable = () => {
    return {
        flags: {
            remove: false
        }
    }
}

const Hole = (x, y) => {
    const self = {
        ...Point(x, y, 20, '#7ac253'),
        polarity: 0,
        flip() {
            this.polarity = 1 - this.polarity;
            this.colour = this.polarity == 1 ? CONTRAST_C : '#7ac253';
            this.render();
        }
    };

    two.update();
    document.getElementById(self.sprite.id).addEventListener('mousedown', e => {
        self.flip();
        paths.push(Path(self, Math.random() * 0.35 + 0.4, PARTY_SIZE));
    });
    return self;
}

const Ant = (path, hill, p) => {
    const self = { 
        ...Animatable(),
        ...Point(hill.x, hill.y, 10, p == 1 ? CONTRAST_C : '#7ac253'),
        p: p,
        path: path,
        progress: 0, // radian angle covered if curve, pixels covered if straight
        ind: 0
    }

    const behaviours = self => ({
        move: () => {
            let closest = closestHole(self.x, self.y, 20);

            if (closest >= 0) {
                let hole = radialGrid[(closest / radialGrid[0].length) | 0][closest % radialGrid[0].length];

                if (closest != radialGridLookUp(self.path.start.x, self.path.start.y) && hole.polarity != self.p) {   
                    self.flags.remove = true;    
                    self.sprite.remove();
                    hole.flip();

                    if (Math.random < 0.1) paths.push(Path(hole, Math.random() * 0.35 + 0.4, PARTY_SIZE));
                    return;
                }
            }

            if (self.ind == self.path.num) {
                self.path.make(self.x, self.y, self.path.moves[self.ind - 1].d);
            }

            let move = self.path.moves[self.ind];

            if (move.type == 'curve') {
                self.progress += ANT_V / move.r; let a = self.progress;
                self.x = move.c.x + move.r * Math.cos(move.turn * a + (move.d + 2) * Math.PI / 2);
                self.y = move.c.y - move.r * Math.sin(move.turn * a + (move.d + 2) * Math.PI / 2);
            }
            else if (move.type == 'straight') {
                self.progress += ANT_V;
                self.x += (move.d > 1 ? -1 : 1) * ((move.d + 1) % 2) * ANT_V;
                self.y += (move.d > 1 ? 1 : -1) * (move.d % 2) * ANT_V;
            }
            
            self.x = (self.x - offsetX + canvasW) % canvasW + offsetX;
            self.y = (self.y - offsetY + canvasH) % canvasH + offsetY;
            self.render();

            if (self.progress > (move.type == 'curve' ? Math.PI / 2 : move.l)) {
                self.ind++;
                self.progress = 0;
            }
        }
    });

    return {...self, ...behaviours(self)};
}

const Path = (startHole, straightness, size) => {
    const self = {
        start: startHole,
        straightness: straightness,
        size: size,
        startFrame: two.frameCount,
        moves: [],
        ants: [],
        num: 0,
        antNum: 0,
        make(px, py, pd) {
            let type = Math.random();

            if (type < this.straightness) {
                this.moves.push({
                    type: 'straight',
                    d: pd,
                    l: ((Math.random() * (MAX_PATH_DIST - MIN_PATH_DIST)) | 0 + MIN_PATH_DIST) * PR * 2,
                });
            }
            else {
                let move = {
                    type: 'curve',
                    r: ((Math.random() * (MAX_PATH_DIST - MIN_PATH_DIST)) | 0 + MIN_PATH_DIST) * PR * 2
                };

                let turn = Math.random();

                if (turn > 0.5) {
                    move.d = (pd + 1) % 4;
                    move.turn = 1;
                }
                else {
                    move.d = (pd + 3) % 4;
                    move.turn = -1;
                }

                move.c = { 
                    x: px + move.r * Math.cos(Math.PI / 2 * move.d),
                    y: py - move.r * Math.sin(Math.PI / 2 * move.d)
                };

                this.moves.push(move);
            }

            this.num++;
        }
    }

    self.make(self.start.x, self.start.y, Math.random() * 4 | 0);
    return self;
}

var run = () => {
    var div = document.getElementById('main');
    two = new Two({ type: Two.Types.svg }).appendTo(div);
    window.addEventListener('resize', resize, false);
    resize();
    two.renderer.domElement.style.display = 'block';

    function resize() {
        let h = Math.max(document.body.clientHeight, window.innerHeight);
        two.width = screen.availWidth;
        two.height = h;
        two.renderer.setSize(screen.availWidth, h);
    }

    radialGrid = new Array(Math.ceil(two.height / CELLSIZE));
    for (let i = 0; i < radialGrid.length; i++) { radialGrid[i] = new Array(Math.ceil(two.width / CELLSIZE)); }

    function init() {
        let numw = Math.ceil(two.width / (PR * 2)), numh = Math.ceil(two.height / (PR * 2));
        offsetX = (two.width - numw * PR * 2) / 2; offsetY = (two.height - numh * PR * 2) / 2;
        canvasW = numw * PR * 2; canvasH = numh * PR * 2;

        for (let i = 0; i < numw; i++)
            for (let j = 0; j < numh; j++) {
                if (Math.random() < 0.5) continue;

                var r = PR / 5;
                var cx = offsetX + PR + i * PR * 2, cy = offsetY + PR + j * PR * 2;
                var a = two.makeLine(cx - r, cy, cx + r, cy);
                var b = two.makeLine(cx, cy - r, cx, cy + r);
                a.stroke = b.stroke = '#3d6166';
                a.linewidth = b.linewidth = 1;
            }

        //poissonSampleHoles();
    }

    init();

    two.bind('update', (f) => {
        paths = paths.filter(p => !(p.antNum == PARTY_SIZE && p.ants.length == 0));

        paths.forEach(p => {
            p.ants = p.ants.filter(a => !a.flags.remove);

            if ((f - p.startFrame) % ANT_RATE == 0 && p.antNum < p.size) {
                p.ants.push(Ant(p, p.start, p.start.polarity));
                p.antNum++;
            }

            p.ants.forEach(a => a.move());
        })
    }).play();
};

export default {
    name: 'ants',
    mounted() {run();}
}
</script>

<style>

</style>