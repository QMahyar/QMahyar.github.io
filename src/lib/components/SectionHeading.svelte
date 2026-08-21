<script lang="ts">
	let { index, label, title, blurb = '' }: {
		index: string;
		label: string;
		title: string;
		blurb?: string;
	} = $props();
</script>

<div class="mb-14 md:mb-20">
	<p class="flex items-center gap-4 font-mono text-xs tracking-[0.28em] text-dim uppercase">
		<span class="text-glow">{index}</span>
		<span>{label}</span>
		<span class="h-px flex-1 bg-white/8" aria-hidden="true"></span>
	</p>
	<h2 class="mt-6 text-4xl font-bold tracking-tight text-fog md:text-5xl">{title}</h2>
	{#if blurb}
		<p class="mt-4 max-w-xl text-mist">{blurb}</p>
	{/if}
</div>
