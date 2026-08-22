<script lang="ts">
	let canvas: HTMLCanvasElement;

	$effect(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return () => {};
		const g: CanvasRenderingContext2D = ctx;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		/** Resolve a CSS color token to an rgb() triple so canvas strokes stay token-driven. */
		function tokenRgb(name: string): [number, number, number] {
			const probe = document.createElement('canvas');
			probe.width = 1;
			probe.height = 1;
			const pctx = probe.getContext('2d');
			if (!pctx) return [255, 255, 255];
			pctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
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
			if (reduced) drawFrame(true);
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

		function spawnPacket(pairs: [number, number][]) {
			if (pairs.length === 0 || packets.length >= 14) return;
			const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
			packets.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
		}

		function collectPairs(): [number, number][] {
			const pairs: [number, number][] = [];
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) pairs.push([i, j]);
				}
			}
			return pairs;
		}

		function drawLinks(pairs: [number, number][], staticFrame: boolean) {
			for (const [a, b] of pairs) {
				const na = nodes[a];
				const nb = nodes[b];
				const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
				const alpha = (1 - dist / LINK_DIST) * (staticFrame ? 0.4 : 0.32);
				g.strokeStyle = rgba(BEAM, alpha);
				g.lineWidth = 1;
				g.beginPath();
				g.moveTo(na.x, na.y);
				g.lineTo(nb.x, nb.y);
				g.stroke();
			}
		}

		function mouseLinks() {
			for (const n of nodes) {
				const dx = n.x - mouse.x;
				const dy = n.y - mouse.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 170) {
					const alpha = (1 - dist / 170) * 0.45;
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
				g.fillStyle = rgba(n.cyan ? GLOW : FOG, n.cyan ? 0.9 : 0.55);
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

		function drawFrame(staticFrame = false) {
			g.clearRect(0, 0, width, height);
			const pairs = collectPairs();
			drawLinks(pairs, staticFrame);
			mouseLinks();
			drawNodes();
			if (!staticFrame) drawPackets();
		}

		let lastSpawn = 0;
		function loop(time: number) {
			if (!running) return;
			step();
			drawFrame(false);
			if (time - lastSpawn > 650) {
				lastSpawn = time;
				spawnPacket(collectPairs());
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
			drawFrame(true);
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

		window.addEventListener('resize', onResize);
		window.addEventListener('pointermove', onMove, { passive: true });
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
			window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('mouseleave', onLeave);
			window.removeEventListener('blur', onLeave);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
