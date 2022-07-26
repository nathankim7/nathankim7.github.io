<script lang="ts">
	import {onMount} from 'svelte';
	import Two from 'two.js';
	import type { Circle } from "two.js/src/shapes/circle";

	let innerHeight: number;
	let clientHeight: number;

	var paths = [];
	const PARTY_SIZE = 10,
		ANT_V = 1;
	const MIN_PATH_DIST = 2,
		MAX_PATH_DIST = 4,
		ANT_RATE = ANT_V * 50;
	const D_PATH_LMAX = 10;
	const CONTRAST_C = '#000000';

	const RADIUS = 200,
		K = 5;
	const PR = 30;
	const CELLSIZE = RADIUS * Math.SQRT1_2;
	var two: Two, radialGrid;
	var offsetX: number, offsetY: number;
	var canvasW: number, canvasH: number;

	// convenience functions
	const distSq = (x1: number, x2: number, y1: number, y2: number) => {
		return (x1 - x2) ** 2 + (y1 - y2) ** 2;
	};

	const closestHole = (cx: number, cy: number, r: number) => {
		if (cx < PR || cx > two.width - PR || cy < PR || cy > two.height - PR) return -2;

		var cr = (cy / CELLSIZE) | 0,
			cc = (cx / CELLSIZE) | 0;
		var i0 = Math.max(0, cr - 2),
			j0 = Math.max(0, cc - 2);
		var i1 = Math.min(radialGrid.length - 1, cr + 2),
			j1 = Math.min(radialGrid[0].length - 1, cc + 2);

		for (let i = i0; i <= i1; i++)
			for (let j = j0; j <= j1; j++)
				if (radialGrid[i][j] && distSq(radialGrid[i][j].x, cx, radialGrid[i][j].y, cy) <= r ** 2)
					return radialGrid[0].length * i + j;

		return -1;
	};

	const radialGridLookUp = (x: number, y: number) => {
		return ((y / CELLSIZE) | 0) * radialGrid[0].length + ((x / CELLSIZE) | 0);
	};

	// classes
	const Point = (x: number, y: number, r: number, c: string) => {
		const self = {
			x: x,
			y: y,
			radius: r,
			colour: c,
			sprite: <Circle>{},
			render() {
				this.sprite.translation.set(this.x, this.y);
				this.sprite.fill = this.colour;
			}
		};

		self.sprite = two.makeCircle(self.x, self.y, self.radius);
		self.sprite.noStroke();
		self.sprite.fill = self.colour;
		return self;
	};

	const Animatable = () => {
		return {
			flags: {
				remove: false
			}
		};
	};

	const Hole = (x: number, y: number) => {
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
		// document.getElementById(self.sprite.id)?.addEventListener('mousedown', (e) => {
		// 	self.flip();
		// 	paths.push(Path(self, Math.random() * 0.35 + 0.4, PARTY_SIZE));
		// });
		return self;
	};

	const Ant = (path, hill, p: number) => {
		const self = {
			...Animatable(),
			...Point(hill.x, hill.y, 10, p == 1 ? CONTRAST_C : '#7ac253'),
			p: p,
			path: path,
			progress: 0, // radian angle covered if curve, pixels covered if straight
			ind: 0
		};

		const behaviours = (self) => ({
			move: () => {
				let closest = closestHole(self.x, self.y, 20);

				if (closest >= 0) {
					let hole =
						radialGrid[(closest / radialGrid[0].length) | 0][closest % radialGrid[0].length];

					if (
						closest != radialGridLookUp(self.path.start.x, self.path.start.y) &&
						hole.polarity != self.p
					) {
						self.flags.remove = true;
						self.sprite.remove();
						hole.flip();

						if (Math.random() < 0.1) paths.push(Path(hole, Math.random() * 0.35 + 0.4, PARTY_SIZE));
						return;
					}
				}

				if (self.ind == self.path.num) {
					self.path.make(self.x, self.y, self.path.moves[self.ind - 1].d);
				}

				let move = self.path.moves[self.ind];

				if (move.type == 'curve') {
					self.progress += ANT_V / move.r;
					let a = self.progress;
					self.x = move.c.x + move.r * Math.cos(move.turn * a + ((move.d + 2) * Math.PI) / 2);
					self.y = move.c.y - move.r * Math.sin(move.turn * a + ((move.d + 2) * Math.PI) / 2);
				} else if (move.type == 'straight') {
					self.progress += ANT_V;
					self.x += (move.d > 1 ? -1 : 1) * ((move.d + 1) % 2) * ANT_V;
					self.y += (move.d > 1 ? 1 : -1) * (move.d % 2) * ANT_V;
				}

				self.x = ((self.x - offsetX + canvasW) % canvasW) + offsetX;
				self.y = ((self.y - offsetY + canvasH) % canvasH) + offsetY;
				self.render();

				if (self.progress > (move.type == 'curve' ? Math.PI / 2 : move.l)) {
					self.ind++;
					self.progress = 0;
				}
			}
		});

		return { ...self, ...behaviours(self) };
	};

	const Path = (startHole, straightness: number, size: number) => {
		const self = {
			start: startHole,
			straightness: straightness,
			size: size,
			startFrame: two.frameCount,
			moves: [],
			ants: [],
			num: 0,
			antNum: 0,
			make(px: number, py: number, pd: number) {
				let type = Math.random();

				if (type < this.straightness) {
					this.moves.push({
						type: 'straight',
						d: pd,
						l: ((Math.random() * (MAX_PATH_DIST - MIN_PATH_DIST)) | (0 + MIN_PATH_DIST)) * PR * 2
					});
				} else {
					let move = {
						type: 'curve',
						r: ((Math.random() * (MAX_PATH_DIST - MIN_PATH_DIST)) | (0 + MIN_PATH_DIST)) * PR * 2
					};

					let turn = Math.random();

					if (turn > 0.5) {
						move.d = (pd + 1) % 4;
						move.turn = 1;
					} else {
						move.d = (pd + 3) % 4;
						move.turn = -1;
					}

					move.c = {
						x: px + move.r * Math.cos((Math.PI / 2) * move.d),
						y: py - move.r * Math.sin((Math.PI / 2) * move.d)
					};

					this.moves.push(move);
				}

				this.num++;
			}
		};

		self.make(self.start.x, self.start.y, (Math.random() * 4) | 0);
		return self;
	};

	let div: HTMLElement;

	const run = () => {
		two = new Two({ type: Two.Types.canvas }).appendTo(div);
		window.addEventListener('resize', resize, false);
		resize();
		two.renderer.domElement.style.display = 'block';

		function resize() {
			let h = Math.max(clientHeight, innerHeight);
			two.width = screen.availWidth;
			two.height = h;
			two.renderer.setSize(screen.availWidth, h);
		}

		radialGrid = new Array(Math.ceil(two.height / CELLSIZE));
		for (let i = 0; i < radialGrid.length; i++) {
			radialGrid[i] = new Array(Math.ceil(two.width / CELLSIZE));
		}

		function init() {
			let numw = Math.ceil(two.width / (PR * 2)),
				numh = Math.ceil(two.height / (PR * 2));
			offsetX = (two.width - numw * PR * 2) / 2;
			offsetY = (two.height - numh * PR * 2) / 2;
			canvasW = numw * PR * 2;
			canvasH = numh * PR * 2;

			for (let i = 0; i < numw; i++)
				for (let j = 0; j < numh; j++) {
					if (Math.random() < 0.5) continue;

					var r = PR / 5;
					var cx = offsetX + PR + i * PR * 2,
						cy = offsetY + PR + j * PR * 2;
					var a = two.makeLine(cx - r, cy, cx + r, cy);
					var b = two.makeLine(cx, cy - r, cx, cy + r);
					a.stroke = b.stroke = '#3d6166';
					a.linewidth = b.linewidth = 1;
				}
		}

		init();

		two
			.bind('update', (f: number) => {
				paths = paths.filter((p) => !(p.antNum == PARTY_SIZE && p.ants.length == 0));

				paths.forEach((p) => {
					p.ants = p.ants.filter((a) => !a.flags.remove);

					if ((f - p.startFrame) % ANT_RATE == 0 && p.antNum < p.size) {
						p.ants.push(Ant(p, p.start, p.start.polarity));
						p.antNum++;
					}

					p.ants.forEach((a) => a.move());
				});
			})
			.play();
	};

	onMount(() => { run(); });
</script>

<svelte:window bind:innerHeight/>

<div bind:this={div} id="bg" bind:clientHeight class="w-100 h-100 ants" />
