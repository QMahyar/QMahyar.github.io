<script lang="ts">
	import { tick } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import type { CommandGroup } from '$lib/data/projects/types';

	let { groups }: { groups: CommandGroup[] } = $props();

	let query = $state('');
	let copiedLine = $state<string | null>(null);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return groups;
		return groups
			.map((g) => ({
				...g,
				lines: g.lines.filter((l) => l.toLowerCase().includes(q))
			}))
			.filter((g) => g.lines.length > 0);
	});

	const matchCount = $derived(filtered.reduce((n, g) => n + g.lines.length, 0));
	const totalCount = $derived(groups.reduce((n, g) => n + g.lines.length, 0));

	async function copyLine(line: string) {
		clearTimeout(copyTimer);
		try {
			await navigator.clipboard.writeText(line);
			copiedLine = line;
			await tick();
			copyTimer = setTimeout(() => {
				copiedLine = null;
			}, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}

	$effect(() => {
		return () => clearTimeout(copyTimer);
	});
</script>

<div use:reveal>
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<label class="sr-only" for="cmd-filter">Filter commands</label>
		<input
			id="cmd-filter"
			type="search"
			bind:value={query}
			placeholder="filter commands…"
			autocomplete="off"
			class="surface-2 machine w-full max-w-md rounded-lg border border-line/60 px-4 text-sm text-fog placeholder:text-dim focus:border-glow focus:outline-none"
		/>
		<p class="machine text-xs text-dim" aria-live="polite">
			{matchCount} / {totalCount} shown
		</p>
	</div>

	{#if filtered.length === 0}
		<p class="machine mt-8 text-sm text-dim">No commands match “{query}”. Clear the filter to see everything.</p>
	{:else}
		<div class="mt-8 flex flex-col gap-8">
			{#each filtered as group (group.group)}
				<details class="surface spot p-6 md:p-8" use:spotlight open>
					<summary
						class="machine cursor-pointer text-sm text-fog marker:text-dim min-h-11 flex items-center gap-3"
					>
						{group.group}
						<span class="text-xs text-dim">— {group.summary}</span>
					</summary>
					<ul class="mt-4 divide-y divide-line/50 border-t border-line/50">
						{#each group.lines as line (line)}
							<li class="flex items-start justify-between gap-3 py-2.5">
								<code class="machine min-w-0 flex-1 text-[13px] leading-relaxed break-all text-fog"
									>{line}</code
								>
								<button
									type="button"
									class="machine inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center px-2 text-[11px] text-dim transition-colors duration-150 hover:text-glow"
									onclick={() => copyLine(line)}
									aria-label="Copy command: {line}"
								>
									{#if copiedLine === line}
										<span class="text-warm" aria-hidden="true">✓</span>
										<span class="sr-only">(copied to clipboard)</span>
									{:else}
										copy
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				</details>
			{/each}
		</div>
	{/if}
</div>
