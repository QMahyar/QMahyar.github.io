<script lang="ts">
	import { tick } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { InstallTab } from '$lib/data/projects/types';

	let { tabs }: { tabs: InstallTab[] } = $props();

	let activeId = $state<string | null>(null);
	let copied = $state(false);

	const active = $derived.by(() => tabs.find((t) => t.id === activeId) ?? tabs[0]);

	async function copyCode() {
		if (!active) return;
		try {
			await navigator.clipboard.writeText(active.code);
			copied = true;
			await tick();
			setTimeout(() => {
				copied = false;
			}, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}

	function select(id: string) {
		activeId = id;
		copied = false;
	}
</script>

<div use:reveal>
	<div role="tablist" aria-label="Install methods" class="flex flex-wrap gap-x-8 gap-y-2">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				aria-selected={tab.id === activeId}
				aria-controls="install-panel"
				onclick={() => select(tab.id)}
				class="machine inline-flex min-h-11 items-center border-b pb-1 text-sm transition-colors duration-150 {tab.id === activeId
					? 'border-glow text-fog'
					: 'border-transparent text-dim hover:text-fog'}"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	{#if active}
		<div id="install-panel" role="tabpanel" class="term mt-6">
			<div class="flex items-center justify-between gap-4">
				<p class="term-label mb-0">{active.title}</p>
				<button
					type="button"
					class="machine inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-xs text-dim transition-colors duration-150 hover:text-glow"
					onclick={copyCode}
					aria-label="Copy {active.title} commands"
				>
					{#if copied}
						<span class="text-warm text-[11px]" aria-hidden="true">✓ copied</span>
						<span class="sr-only">(copied to clipboard)</span>
					{:else}
						copy
					{/if}
				</button>
			</div>
			<pre class="mt-3 overflow-x-auto whitespace-pre-wrap break-all">{active.code}</pre>
			{#if active.note}
				<p class="machine mt-4 text-xs text-dim">{active.note}</p>
			{/if}
		</div>
	{/if}
</div>
