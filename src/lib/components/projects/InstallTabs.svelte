<script lang="ts">
	import { tick } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { InstallTab } from '$lib/data/projects/types';

	let { tabs }: { tabs: InstallTab[] } = $props();

	let activeId = $state<string | null>(null);
	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	const active = $derived.by(() => tabs.find((t) => t.id === (activeId ?? tabs[0]?.id)) ?? tabs[0]);
	const activeKey = $derived(active?.id ?? tabs[0]?.id ?? '');

	async function copyCode() {
		if (!active) return;
		clearTimeout(copyTimer);
		try {
			await navigator.clipboard.writeText(active.code);
			copied = true;
			await tick();
			copyTimer = setTimeout(() => {
				copied = false;
			}, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}

	function select(id: string) {
		clearTimeout(copyTimer);
		activeId = id;
		copied = false;
	}

	$effect(() => {
		return () => clearTimeout(copyTimer);
	});

	function onTabKey(e: KeyboardEvent, id: string) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		const i = tabs.findIndex((t) => t.id === id);
		const d = e.key === 'ArrowRight' ? 1 : -1;
		const next = tabs[(i + d + tabs.length) % tabs.length];
		select(next.id);
		const list = (e.currentTarget as HTMLElement).closest('[role="tablist"]');
		list?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[tabs.findIndex((t) => t.id === next.id)]?.focus();
	}
</script>

<div use:reveal>
	<div role="tablist" aria-label="Install methods" class="flex flex-wrap gap-x-8 gap-y-2">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				id="install-tab-{tab.id}"
				aria-selected={tab.id === activeKey}
				aria-controls="install-panel"
				tabindex={tab.id === activeKey ? 0 : -1}
				onclick={() => select(tab.id)}
				onkeydown={(e) => onTabKey(e, tab.id)}
				class="machine inline-flex min-h-11 items-center border-b pb-1 text-sm transition-colors duration-150 {tab.id === activeKey
					? 'border-glow text-fog'
					: 'border-transparent text-dim hover:text-fog'}"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	{#if active}
		<div id="install-panel" role="tabpanel" aria-labelledby="install-tab-{active.id}" tabindex="0" class="term mt-6">
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
