<script lang="ts">
	import type { ProjectPage } from '$lib/data/projects/types';

	let { prev, next }: { prev: ProjectPage['prev']; next: ProjectPage['next'] } = $props();
</script>

<nav
	aria-label="More projects"
	class="mt-24 flex items-center justify-between gap-6 border-t border-line/50 pt-8 md:mt-32"
>
	{#if prev}
		<a href={prev.href} class="link-arrow machine inline-flex min-h-11 items-center text-sm">
			<span class="arr arr-d rotate-90" aria-hidden="true">&darr;</span>&nbsp;{prev.label}
		</a>
	{:else}
		<span></span>
	{/if}
	{#if next}
		<a href={next.href} class="link-arrow machine inline-flex min-h-11 items-center text-sm">
			{next.label}&nbsp;<span class="arr arr-d -rotate-90" aria-hidden="true">&darr;</span>
		</a>
	{:else}
		<span></span>
	{/if}
</nav>
