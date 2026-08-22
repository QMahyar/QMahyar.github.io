<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	// S2 · hanging — heading floats in negative space, no rules, no numbers
	let { title, blurb = '' }: { title: string; blurb?: string } = $props();
</script>

<header class="mb-16 md:mb-24">
	<h2 class="text-[clamp(1.75rem,3.5vw,2.75rem)]" use:reveal>{title}</h2>
	{#if blurb}
		<p class="mt-4 max-w-xl" use:reveal={{ delay: 90 }}>{blurb}</p>
	{/if}
</header>
