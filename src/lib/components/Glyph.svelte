<script lang="ts">
	function hash(str: string): number {
		let h = 2166136261;
		for (let i = 0; i < str.length; i++) {
			h ^= str.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return h >>> 0;
	}

	function mulberry32(a: number): () => number {
		return () => {
			a |= 0;
			a = (a + 0x6d2b79f5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	interface Node {
		x: number;
		y: number;
		r: number;
	}

	function makeGlyph(seedStr: string): { nodes: Node[]; edges: [number, number][]; accent: number } {
		const rand = mulberry32(hash(seedStr));
		const count = 4 + Math.floor(rand() * 2);
		const nodes: Node[] = [];
		for (let i = 0; i < count; i++) {
			const r = 1.5 + rand() * 1.4;
			let x = 0;
			let y = 0;
			for (let tries = 0; tries < 24; tries++) {
				x = 7 + rand() * 34;
				y = 7 + rand() * 34;
				if (nodes.every((p) => Math.hypot(p.x - x, p.y - y) >= 12)) break;
			}
			nodes.push({ x, y, r });
		}
		const edges: [number, number][] = [];
		for (let i = 0; i < nodes.length - 1; i++) edges.push([i, i + 1]);
		if (nodes.length > 3 && rand() > 0.45) edges.push([0, nodes.length - 1]);
		return { nodes, edges, accent: Math.floor(rand() * nodes.length) };
	}

	let {
		seed,
		size = 24,
		class: cls = ''
	}: { seed: string; size?: number; class?: string } = $props();

	const glyph = $derived(makeGlyph(seed));
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 48 48"
	fill="none"
	class={cls}
	aria-hidden="true"
>
	{#each glyph.edges as [a, b] (`${a}-${b}`)}
		<line
			x1={glyph.nodes[a].x}
			y1={glyph.nodes[a].y}
			x2={glyph.nodes[b].x}
			y2={glyph.nodes[b].y}
			stroke="var(--color-line)"
			stroke-width="1.5"
		/>
	{/each}
	{#each glyph.nodes as node, i (i)}
		<circle
			cx={node.x}
			cy={node.y}
			r={node.r}
			fill={i === glyph.accent ? 'var(--color-glow)' : 'var(--color-dim)'}
		/>
	{/each}
</svg>
