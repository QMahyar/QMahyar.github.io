<script lang="ts">
	import { tick } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { ProjectPage, Quickstep } from '$lib/data/projects/types';
	import SubHero from './SubHero.svelte';
	import SectionHead from './SectionHead.svelte';
	import InstallTabs from './InstallTabs.svelte';
	import FeatureDiptych from './FeatureDiptych.svelte';
	import CommandRef from './CommandRef.svelte';
	import Faq from './Faq.svelte';
	import PrevNext from './PrevNext.svelte';

	let { page }: { page: ProjectPage } = $props();

	let copiedStep = $state<string | null>(null);

	async function copyStep(step: Quickstep) {
		try {
			await navigator.clipboard.writeText(step.code);
			copiedStep = step.title;
			await tick();
			setTimeout(() => {
				copiedStep = null;
			}, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}
</script>

<SubHero {page} />

<div class="mx-auto max-w-6xl px-6">
	<!-- 01 · install -->
	<section aria-labelledby="install-head" class="scroll-mt-20 py-16 md:py-20">
		<span id="install-head" class="sr-only">Install</span>
		<SectionHead index="01" title="install" blurb="three ways onto your machine" />
		<div class="mt-8">
			<InstallTabs tabs={page.install} />
		</div>
	</section>

	<!-- 02 · quickstart -->
	<section id="quickstart" aria-labelledby="quickstart-head" class="scroll-mt-20 border-t border-line/50 py-16 md:py-20">
		<span id="quickstart-head" class="sr-only">Quickstart</span>
		<SectionHead index="02" title="quickstart" blurb="zero to first result" />
		<div class="mt-8 flex flex-col gap-8">
			{#each page.quickstart as step (step.title)}
				<div class="term" use:reveal>
					<div class="flex items-center justify-between gap-4">
						<p class="term-label mb-0">{step.title}</p>
						<button
							type="button"
							class="machine inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-xs text-dim transition-colors duration-150 hover:text-glow"
							onclick={() => copyStep(step)}
							aria-label="Copy {step.title} commands"
						>
							{#if copiedStep === step.title}
								<span class="text-warm text-[11px]" aria-hidden="true">✓ copied</span>
								<span class="sr-only">(copied to clipboard)</span>
							{:else}
								copy
							{/if}
						</button>
					</div>
					<pre class="mt-3 overflow-x-auto whitespace-pre-wrap break-all">{step.code}</pre>
					{#if step.caption}
						<p class="machine mt-4 text-xs text-dim">{step.caption}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- 03 · features -->
	<section aria-labelledby="features-head" class="scroll-mt-20 border-t border-line/50 py-16 md:py-20">
		<span id="features-head" class="sr-only">Features</span>
		<SectionHead index="03" title="features" blurb="what it does, with proof" />
		<div class="mt-10">
			<FeatureDiptych features={page.features} />
		</div>
	</section>

	<!-- 04 · commands -->
	<section aria-labelledby="commands-head" class="scroll-mt-20 border-t border-line/50 py-16 md:py-20">
		<span id="commands-head" class="sr-only">Commands</span>
		<SectionHead index="04" title="commands" blurb="the full surface, filterable" />
		<div class="mt-8">
			<CommandRef groups={page.commands} />
		</div>
	</section>

	<!-- 05 · architecture -->
	<section aria-labelledby="arch-head" class="scroll-mt-20 border-t border-line/50 py-16 md:py-20">
		<span id="arch-head" class="sr-only">Architecture</span>
		<SectionHead index="05" title="architecture" blurb="how it holds together" />
		<div class="mt-8 max-w-2xl" use:reveal>
			{#each page.architecture.summary as para (para)}
				<p class="mt-4 leading-relaxed first:mt-0">{para}</p>
			{/each}
		</div>
		<div class="term mt-8" use:reveal>
			<p class="term-label">data flow</p>
			<pre class="overflow-x-auto whitespace-pre">{page.architecture.diagram}</pre>
		</div>
	</section>

	<!-- 06 · faq -->
	<section aria-labelledby="faq-head" class="scroll-mt-20 border-t border-line/50 py-16 md:py-20">
		<span id="faq-head" class="sr-only">FAQ</span>
		<SectionHead index="06" title="faq" blurb="asked before, answered here" />
		<div class="mt-8">
			<Faq items={page.faq} />
		</div>
	</section>

	<PrevNext prev={page.prev} next={page.next} />
</div>
