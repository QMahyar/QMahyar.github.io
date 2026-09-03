<script lang="ts">
	import { heroPeriodCenter, flashHeroPeriod } from '$lib/stores/hero-pulse';

	let canvas: HTMLCanvasElement;

	$effect(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return () => {};
		const g: CanvasRenderingContext2D = ctx;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		/** Resolve CSS color tokens to rgb() triples so canvas strokes stay token-driven.
		 *  One shared 1x1 probe canvas + one getComputedStyle call for all tokens. */
		const probe = document.createElement('canvas');
		probe.width = 1;
		probe.height = 1;
		const pctx = probe.getContext('2d', { willReadFrequently: true });
		const rootStyle = getComputedStyle(document.documentElement);
		function tokenRgb(name: string): [number, number, number] {
			if (!pctx) return [255, 255, 255];
			pctx.clearRect(0, 0, 1, 1);
			pctx.fillStyle = rootStyle.getPropertyValue(name).trim();
			pctx.fillRect(0, 0, 1, 1);
			const d = pctx.getImageData(0, 0, 1, 1).data;
			return [d[0], d[1], d[2]];
		}

		const BEAM = tokenRgb('--color-beam');
		const GLOW = tokenRgb('--color-glow');
		const FOG = tokenRgb('--color-fog');
		const rgba = ([r, g, b]: [number, number, number], a: number) =>
			`rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;

		interface Node {
			x: number;
			y: number;
			vx: number;
			vy: number;
			r: number;
			cyan: boolean;
		}

		interface Packet {
			a: number;
			b: number;
			t: number;
			speed: number;
		}

		let width = 0;
		let height = 0;
		let dpr = 1;
		let raf = 0;
		let running = true;
		let inView = true;
		const nodes: Node[] = [];
		const packets: Packet[] = [];
		const mouse = { x: -9999, y: -9999 };
		const LINK_DIST = 140;

		function resize() {
			const rect = canvas.getBoundingClientRect();
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			g.setTransform(dpr, 0, 0, dpr, 0, 0);
			seed();
			if (reduced) drawFrame(collectPairs(), true);
		}

		function seed() {
			nodes.length = 0;
			packets.length = 0;
			const count = Math.max(24, Math.min(85, Math.floor((width * height) / 16000)));
			for (let i = 0; i < count; i++) {
				// Bias a couple of early nodes toward the hero wordmark area
				const biased = i < 2 && width > 600;
				nodes.push({
					x: biased ? Math.random() * width * 0.22 : Math.random() * width,
					y: biased ? Math.random() * height * 0.32 : Math.random() * height,
					vx: (Math.random() - 0.5) * 0.35,
					vy: (Math.random() - 0.5) * 0.35,
					r: Math.random() * 1.1 + 1,
					cyan: i % 7 === 0
				});
			}
		}

		function spawnPacket(pairs: Array<[number, number, number]>) {
			if (pairs.length === 0 || packets.length >= 14) return;
			const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
			packets.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
		}

		interface HeroPacket {
			from: number; sx: number; sy: number; tx: number; ty: number; t: number; speed: number;
		}
		const heroPackets: HeroPacket[] = [];

		function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }

		function spawnHeroPacket() {
			if (reduced) return;
			const hero = heroPeriodCenter();
			if (!hero || nodes.length === 0 || heroPackets.length >= 3) return;
			const rect = canvas.getBoundingClientRect();
			const hx = hero.x - rect.left;
			const hy = hero.y - rect.top;
			if (hx < -50 || hy < -50 || hx > width + 50 || hy > height + 50) return;
			let nearest = 0;
			let minDist = Infinity;
			for (let i = 0; i < nodes.length; i++) {
				const d = Math.hypot(nodes[i].x - hx, nodes[i].y - hy);
				if (d < minDist) { minDist = d; nearest = i; }
			}
			if (minDist > LINK_DIST * 3) return;
			heroPackets.push({
				from: nearest,
				sx: nodes[nearest].x,
				sy: nodes[nearest].y,
				tx: hx, ty: hy, t: 0,
				speed: 0.02 + Math.random() * 0.012
			});
		}

		/** Pairs carry their squared distance so drawLinks avoids a second hypot pass. */
		function collectPairs(): Array<[number, number, number]> {
			const pairs: Array<[number, number, number]> = [];
			const max2 = LINK_DIST * LINK_DIST;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const d2 = dx * dx + dy * dy;
					if (d2 < max2) pairs.push([i, j, d2]);
				}
			}
			return pairs;
		}

		function drawLinks(pairs: Array<[number, number, number]>, staticFrame: boolean) {
			for (const [a, b, d2] of pairs) {
				const na = nodes[a];
				const nb = nodes[b];
				const dist = Math.sqrt(d2);
				const alpha = (1 - dist / LINK_DIST) * (staticFrame ? 0.28 : 0.22);
				g.strokeStyle = rgba(BEAM, alpha);
				g.lineWidth = 1;
				g.beginPath();
				g.moveTo(na.x, na.y);
				g.lineTo(nb.x, nb.y);
				g.stroke();
			}
		}

		function mouseLinks() {
			if (mouse.x === -9999) return;
			for (const n of nodes) {
				const dx = n.x - mouse.x;
				const dy = n.y - mouse.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 170) {
					const alpha = (1 - dist / 170) * 0.32;
					g.strokeStyle = rgba(GLOW, alpha);
					g.lineWidth = 1;
					g.beginPath();
					g.moveTo(n.x, n.y);
					g.lineTo(mouse.x, mouse.y);
					g.stroke();
				}
			}
		}

		function drawNodes() {
			for (const n of nodes) {
				g.fillStyle = rgba(n.cyan ? GLOW : FOG, n.cyan ? 0.72 : 0.42);
				g.beginPath();
				g.arc(n.x, n.y, n.r + (n.cyan ? 0.6 : 0), 0, Math.PI * 2);
				g.fill();
			}
		}

		function drawPackets() {
			for (let i = packets.length - 1; i >= 0; i--) {
				const p = packets[i];
				p.t += p.speed;
				const na = nodes[p.a];
				const nb = nodes[p.b];
				const x = na.x + (nb.x - na.x) * p.t;
				const y = na.y + (nb.y - na.y) * p.t;
				g.fillStyle = rgba(GLOW, 0.95);
				g.beginPath();
				g.arc(x, y, 1.8, 0, Math.PI * 2);
				g.fill();
				if (p.t >= 1) packets.splice(i, 1);
			}
			for (let i = heroPackets.length - 1; i >= 0; i--) {
				const p = heroPackets[i];
				p.t += p.speed;
				const cx = lerp(p.sx, p.tx, p.t);
				const cy = lerp(p.sy, p.ty, p.t);
				g.fillStyle = rgba(GLOW, 0.95);
				g.beginPath();
				g.arc(cx, cy, 2, 0, Math.PI * 2);
				g.fill();
				for (let j = 1; j <= 3; j++) {
					const tt = Math.max(0, p.t - j * 0.06);
					g.fillStyle = rgba(GLOW, 0.28 / j);
					g.beginPath();
					g.arc(lerp(p.sx, p.tx, tt), lerp(p.sy, p.ty, tt), 1.3, 0, Math.PI * 2);
					g.fill();
				}
				if (p.t >= 1) {
					flashHeroPeriod();
					heroPackets.splice(i, 1);
				}
			}
		}

		function step() {
			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				if (n.x < -20) n.x = width + 20;
				else if (n.x > width + 20) n.x = -20;
				if (n.y < -20) n.y = height + 20;
				else if (n.y > height + 20) n.y = -20;
			}
		}

		function drawFrame(pairs: Array<[number, number, number]>, staticFrame = false) {
			g.clearRect(0, 0, width, height);
			drawLinks(pairs, staticFrame);
			mouseLinks();
			drawNodes();
			if (!staticFrame) drawPackets();
		}

		let lastSpawn = 0;
		let lastFrame = 0;
		function loop(time: number) {
			if (!running) return;
			if (time - lastFrame < 32) {
				raf = requestAnimationFrame(loop);
				return;
			}
			lastFrame = time;
			step();
			const pairs = collectPairs();
			drawFrame(pairs, false);
			if (time - lastSpawn > 650) {
				lastSpawn = time;
				spawnPacket(pairs);
				if (Math.random() < 0.3) spawnHeroPacket();
			}
			raf = requestAnimationFrame(loop);
		}

		function start() {
			if (!running || !inView || reduced) return;
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(loop);
		}

		function stop() {
			running = false;
			cancelAnimationFrame(raf);
		}

		resize();

		if (reduced) {
			drawFrame(collectPairs(), true);
			return () => {};
		}

		start();

		const onResize = () => resize();
		const onMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		};
		const onLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};
		const onVisibility = () => {
			if (document.hidden) {
				stop();
			} else {
				running = true;
				start();
			}
		};

		const coarse = window.matchMedia('(pointer: coarse)').matches;
		window.addEventListener('resize', onResize);
		if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('mouseleave', onLeave);
		window.addEventListener('blur', onLeave);
		document.addEventListener('visibilitychange', onVisibility);

		const io = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
			if (inView && running) start();
			else if (!inView) cancelAnimationFrame(raf);
		});
		io.observe(canvas);

		return () => {
			stop();
			io.disconnect();
			window.removeEventListener('resize', onResize);
			if (!coarse) window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('mouseleave', onLeave);
			window.removeEventListener('blur', onLeave);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
