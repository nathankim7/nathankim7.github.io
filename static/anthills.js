//import Two from 'two.js';

// agnostic globals
const holes = [];
var paths = [];
const PARTY_SIZE = 10, ANT_V = 1;
const MIN_PATH_RADIUS = 50, MAX_PATH_RADIUS = 90, ANT_RATE = ANT_V * 50;
const D_PATH_LMAX = 10;
const CONTRAST_C = '#555555';

var div = document.getElementById('main');
var two = new Two({ fullscreen: true, type: Two.Types.svg }).appendTo(div);

const RADIUS = 150, BORDER = RADIUS / 3, K = 5, MIN_TRAVEL_DISTANCE = 75;
const CELLSIZE = RADIUS * Math.SQRT1_2;
const GRIDW = Math.ceil(two.width / CELLSIZE);
const GRIDH = Math.ceil(two.height / CELLSIZE);
const grid = new Array(GRIDH); for (let i = 0; i < grid.length; i++) { grid[i] = new Array(GRIDW); }

// convenience functions
const distSq = (x1, x2, y1, y2) => {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

const closestHole = (cx, cy, r) => {
    if (cx < BORDER || cx > two.width - BORDER || cy < BORDER || cy > two.height - BORDER)
        return -2;

    var cr = cy / CELLSIZE | 0, cc = cx / CELLSIZE | 0;
    var i0 = Math.max(0, cr - 2), j0 = Math.max(0, cc - 2);
    var i1 = Math.min(GRIDH - 1, cr + 2), j1 = Math.min(GRIDW - 1, cc + 2);

    for (let i = i0; i <= i1; i++) 
        for (let j = j0; j <= j1; j++) 
            if (grid[i][j] && distSq(grid[i][j].x, cx, grid[i][j].y, cy) <= r ** 2) 
                return grid[0].length * i + j;

    return -1;
}

const gridLookUp = (x, y) => {
    return (y / GRIDH | 0) * GRIDW + (x / GRIDW | 0); 
}

function poissonSampleHoles(holes) {
    var startHole = Hole((two.width - BORDER) * Math.random() + BORDER / 2,
                        (two.height - BORDER) * Math.random() + BORDER / 2, 20);
    holes.push(startHole);
    grid[startHole.y / CELLSIZE | 0][startHole.x / CELLSIZE | 0] = startHole;
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
            var x = parent.x + r * Math.cos(a);
            var y = parent.y + r * Math.sin(a);
            
            if (closestHole(x, y, RADIUS) == -1) {
                var newHole = Hole(x, y, 20);
                grid[y / CELLSIZE | 0][x / CELLSIZE | 0] = newHole;
                active.push(newHole);
                holes.push(newHole);
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
        paths.push(Path(self, Math.random() * 0.4 + 0.3));
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
                let hole = grid[(closest / GRIDW) | 0][closest % GRIDW];

                if (closest != gridLookUp(self.path.start.x, self.path.start.y) && hole.polarity != self.p) {   
                    self.flags.remove = true;    
                    self.sprite.remove();
                    hole.flip();
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
            
            self.x = (self.x + two.width) % two.width;
            self.y = (self.y + two.height) % two.height;
            self.render();

            if (self.progress > (move.type == 'curve' ? Math.PI / 2 : move.l)) {
                self.ind++;
                self.progress = 0;
            }
        }
    });

    return {...self, ...behaviours(self)};
}

const Path = (startHole, straightness) => {
    const self = {
        start: startHole,
        straightness: straightness,
        startFrame: two.frameCount,
        moves: [],
        ants: [],
        num: 0,
        antNum: 0,
        make(px, py, pd) {
            let type = Math.random();

            if (type < this.straightness) {
                let l = Math.random() * (MAX_PATH_RADIUS - MIN_PATH_RADIUS) + MIN_PATH_RADIUS;
                this.moves.push({
                    type: 'straight',
                    d: pd,
                    l: l,
                });
            }
            else {
                let move = {
                    type: 'curve',
                    r: Math.random() * (MAX_PATH_RADIUS - MIN_PATH_RADIUS) + MIN_PATH_RADIUS
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

function init() {
    poissonSampleHoles(holes);
}

init();

two.bind('update', (f) => {
    paths = paths.filter(p => !(p.antNum == PARTY_SIZE && p.ants.length == 0));

    paths.forEach(p => {
        p.ants = p.ants.filter(a => !a.flags.remove);

        if ((f - p.startFrame) % ANT_RATE == 0 && p.antNum < PARTY_SIZE) {
            p.ants.push(Ant(p, p.start, p.start.polarity));
            p.antNum++;
        }

        p.ants.forEach(a => a.move());
    })
}).play();