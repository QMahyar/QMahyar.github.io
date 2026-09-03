<script lang="ts">
	import { tick } from 'svelte';
	import type { ProjectPage } from '$lib/data/projects/types';

	let { page }: { page: ProjectPage } = $props();

	let copied = $state(false);

	async function copyHint() {
		try {
			await navigator.clipboard.writeText(page.installHint);
			copied = true;
			await tick();
			setTimeout(() => {
				copied = false;
			}, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}
</script>

<section class="relative flex flex-col overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_28rem_at_26%_44%,oklch(15%_0.008_255/_0.88),transparent_68%)] max-sm:bg-[radial-gradient(32rem_22rem_at_28%_40%,oklch(15%_0.008_255/_0.9),transparent_72%)]"
		aria-hidden="true"
	></div>

	<div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-24 pb-12 md:pt-20 md:pb-14">
		<p class="enter machine text-xs leading-relaxed text-mist sm:text-sm" style="--i: 0">
			<span class="text-dim">$</span> flagship · {page.lang} · {page.updated}
		</p>

		<h1
			class="enter mt-6 text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.95] font-bold text-fog"
			style="--i: 1"
		>
			{page.name}<span class="text-glow" aria-hidden="true">.</span><span class="sr-only">.</span>
		</h1>

		<p class="enter mt-7 max-w-xl text-lg leading-relaxed md:text-xl" style="--i: 2">
			{page.tagline}
		</p>

		<ul class="enter mt-6 flex flex-wrap gap-2" style="--i: 2" aria-label="Highlights">
			{#each page.badges as badge (badge)}
				<li
					class="machine rounded border border-line px-2 py-1 text-[11px] tracking-wide text-dim"
				>
					{badge}
				</li>
			{/each}
		</ul>

		<div class="enter mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style="--i: 3">
			<a href="#quickstart" class="link-arrow inline-flex min-h-11 items-center">
				quickstart <span class="arr arr-d" aria-hidden="true">&darr;</span>
			</a>
			<a
				href={page.repo}
				target="_blank"
				rel="noopener noreferrer"
				class="link-arrow machine inline-flex min-h-11 items-center text-sm"
			>
				view repo <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
			</a>
		</div>

		<div class="enter term mt-10" style="--i: 3">
			<div class="flex items-center justify-between gap-4">
				<p class="term-label mb-0">$ quick install</p>
				<button
					type="button"
					class="machine inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-xs text-dim transition-colors duration-150 hover:text-glow"
					onclick={copyHint}
					aria-label="Copy install command"
				>
					{#if copied}
						<span class="text-warm text-[11px]" aria-hidden="true">✓ copied</span>
						<span class="sr-only">(copied to clipboard)</span>
					{:else}
						copy
					{/if}
				</button>
			</div>
			<pre class="mt-3 overflow-x-auto whitespace-pre-wrap break-all">{page.installHint}</pre>
		</div>
	</div>
</section>
