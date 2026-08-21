<script lang="ts">
	import { Star } from '@lucide/svelte';
	import type { Project } from '$lib/data/site';
	import { langColor } from '$lib/data/site';

	let { project, compact = false }: { project: Project; compact?: boolean } = $props();
</script>

{#if compact}
	<!-- Ledger row -->
	<li>
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group flex items-baseline gap-4 py-4"
		>
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
			<span class="hidden min-w-0 flex-1 truncate text-sm text-dim sm:block">
				{project.description}
			</span>
			<span class="machine ml-auto inline-flex shrink-0 items-center gap-2 text-xs text-dim">
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
	<li>
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group block border-t border-line/50 pt-5"
		>
			<div class="flex items-baseline justify-between gap-4">
				<h3
					class="text-lg font-semibold tracking-tight text-fog transition-colors duration-150 group-hover:text-glow"
				>
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
