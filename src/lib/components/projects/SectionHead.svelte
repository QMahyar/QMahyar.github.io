<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { index, title, blurb }: { index: string; title: string; blurb?: string } = $props();
</script>

<h2 class="sr-only">{title}</h2>
<p class="machine text-sm text-dim" use:reveal>
	{index}<span aria-hidden="true">.</span>
	<span class="mx-3 text-line" aria-hidden="true">/</span>
	{title}{#if blurb}<span class="mt-1 block text-dim sm:mt-0 sm:inline"><span class="mx-3 hidden text-line sm:inline" aria-hidden="true">/</span>{blurb}</span>{/if}
</p>
