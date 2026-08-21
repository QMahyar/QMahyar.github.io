<script lang="ts">
	import { Star } from '@lucide/svelte';
	import type { Project } from '$lib/data/site';
	import { langColor } from '$lib/data/site';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<a
	href={project.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group glass relative flex flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-glow/30 hover:bg-white/[0.045] md:p-8"
>
	<div class="flex items-start justify-between gap-4">
		<h3 class="text-xl font-semibold text-fog transition-colors group-hover:text-glow md:text-2xl">
			{project.name}
		</h3>
		{#if typeof project.stars === 'number'}
			<span
				class="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-sm text-dim"
				aria-label="{project.stars} stars"
			>
				<Star size={14} aria-hidden="true" />
				{project.stars}
			</span>
		{/if}
	</div>

	<p class="flex-1 text-sm leading-relaxed text-mist">{project.description}</p>

	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap gap-2">
			{#each project.tags as tag (tag)}
				<span class="chip">{tag}</span>
			{/each}
		</div>
		<span class="inline-flex items-center gap-2 font-mono text-xs text-dim">
			{#if featured && project.updated}<span>{project.updated}</span>{/if}
			<span
				class="size-2.5 rounded-full"
				style="background-color: {langColor[project.lang] ?? langColor.Other}"
				aria-hidden="true"></span>
			{project.lang}
		</span>
	</div>

	<svg
		class="absolute top-6 right-6 size-4 -translate-x-1 translate-y-1 text-glow opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:top-8 md:right-8"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M7 7h10v10" />
		<path d="M7 17 17 7" />
	</svg>
</a>
