<script lang="ts">
	import { fnv1a, mulberry32 } from '$lib/utils/random';

	const rand = mulberry32(fnv1a('qmahyar-constellation'));
	const nodes: Array<{ x: number; y: number; r: number; cyan: boolean }> = [];
	for (let i = 0; i < 28; i++) {
		nodes.push({ x: rand() * 100, y: rand() * 100, r: 0.5 + rand() * 0.8, cyan: i % 7 === 0 });
	}
	const edges: [number, number][] = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 30) edges.push([i, j]);
		}
	}
</script>

<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="h-full w-full" aria-hidden="true">
	{#each edges as [a, b], i (`${a}-${b}`)}
		<line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="var(--color-beam)" stroke-width="0.15" opacity="0.18" />
	{/each}
	{#each nodes as n, i (i)}
		<circle cx={n.x} cy={n.y} r={n.r * 0.3} fill={n.cyan ? 'var(--color-glow)' : 'var(--color-fog)'} opacity={n.cyan ? 0.55 : 0.28} />
	{/each}
</svg>
