<script lang="ts">
	import { Star } from '@lucide/svelte';
	import { reveal } from '$lib/actions/reveal';
	import Glyph from './Glyph.svelte';
	import type { Project } from '$lib/data/site';
	import { langColor } from '$lib/data/site';

	let {
		project,
		compact = false,
		delay = 0
	}: { project: Project; compact?: boolean; delay?: number } = $props();
</script>

{#if compact}
	<!-- Ledger row — mobile: name row + clamped description below; desktop: single row -->
	<li use:reveal={{ delay }} data-variant="ledger">
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-4"
		>
			<span class="flex items-baseline gap-4">
				<Glyph seed={project.name} size={28} class="relative top-0.5 shrink-0 opacity-80 transition-opacity duration-150 group-hover:opacity-100" />
				<span
					class="min-w-32 shrink-0 font-medium text-fog transition-colors duration-150 group-hover:text-glow md:min-w-44"
				>
					{project.name}
					{#if project.archived}
						<span
							class="ml-2 rounded border border-line px-1.5 py-0.5 align-middle machine text-[9px] tracking-wider text-dim uppercase"
							>archived</span
						>
					{/if}
				</span>
				<span class="machine ml-auto inline-flex shrink-0 items-center gap-2 text-xs text-dim sm:hidden">
					<span
						class="size-2 rounded-full"
						style="background-color: {langColor[project.lang] ?? langColor.Other}"
						aria-hidden="true"></span>
					{project.lang}
				</span>
			</span>
			<span class="ml-11 line-clamp-2 text-sm leading-snug text-dim sm:ml-0 sm:min-w-0 sm:flex-1 sm:truncate sm:line-clamp-1">
				{project.description}
			</span>
			<span class="machine ml-auto hidden shrink-0 items-center gap-2 text-xs text-dim sm:inline-flex">
				<span
					class="size-2 rounded-full"
					style="background-color: {langColor[project.lang] ?? langColor.Other}"
					aria-hidden="true"></span>
				{project.lang}
			</span>
		</a>
	</li>
{:else}
	<!-- Ledger block -->
	<li use:reveal={{ delay }} data-variant="ledger">
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group block border-t border-line/50 pt-5"
		>
			<div class="flex items-start justify-between gap-4">
				<h3
					class="flex items-center gap-3 text-lg font-semibold tracking-tight text-fog transition-colors duration-150 group-hover:text-glow"
				>
					<Glyph seed={project.name} size={32} class="shrink-0" />
					{project.name}
				</h3>
				<span class="machine inline-flex shrink-0 items-center gap-1.5 text-xs text-dim">
					{#if typeof project.stars === 'number'}
						<Star size={12} aria-hidden="true" />
						{project.stars}
					{/if}
				</span>
			</div>
			<p class="mt-2 text-sm leading-relaxed">{project.description}</p>
			<p class="machine mt-3 inline-flex items-center gap-2 text-xs text-dim">
				<span
					class="size-2 rounded-full"
					style="background-color: {langColor[project.lang] ?? langColor.Other}"
					aria-hidden="true"></span>
				{project.lang}
				{#if project.updated}<span aria-hidden="true">&middot;</span>
					<span>{project.updated}</span>{/if}
			</p>
		</a>
	</li>
{/if}
