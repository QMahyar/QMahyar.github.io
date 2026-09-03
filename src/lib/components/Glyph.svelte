<script lang="ts">
	import { fnv1a as hash, mulberry32 } from '$lib/utils/random';

	interface Node {
		x: number;
		y: number;
		r: number;
	}

	function makeGlyph(seedStr: string): { nodes: Node[]; edges: [number, number][]; accent: number } {
		const rand = mulberry32(hash(seedStr));
		const count = 3 + Math.floor(rand() * 2);
		const nodes: Node[] = [];
		for (let i = 0; i < count; i++) {
			const r = 2.1 + rand() * 1.2;
			let x = 0;
			let y = 0;
			for (let tries = 0; tries < 24; tries++) {
				x = 8 + rand() * 32;
				y = 8 + rand() * 32;
				if (nodes.every((p) => Math.hypot(p.x - x, p.y - y) >= 14)) break;
			}
			nodes.push({ x, y, r });
		}
		// Structured shape: open polyline that bends like a Q-tail, plus one chord for closure
		const edges: [number, number][] = [];
		for (let i = 0; i < nodes.length - 1; i++) edges.push([i, i + 1]);
		if (nodes.length === 3 && rand() > 0.5) edges.push([0, 2]);
		else if (nodes.length === 4 && rand() > 0.45) edges.push([0, 3]);
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
			stroke-width="1.8"
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
