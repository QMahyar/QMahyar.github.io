<script lang="ts">
	import { Cpu, LayoutGrid, Globe } from '@lucide/svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { stack } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	const icons: Record<string, typeof Cpu> = {
		cpu: Cpu,
		layout: LayoutGrid,
		globe: Globe
	};
</script>

<section id="stack" class="relative scroll-mt-20 border-t border-white/5 bg-abyss py-28 md:py-36">
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(46rem 26rem at 80% 0%, rgba(47,168,238,0.05), transparent 60%);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-6xl px-6">
		<SectionHeading index="02" label="toolbox" title="The stack." />

		<div class="grid gap-5 md:grid-cols-3">
			{#each stack as group, i (group.title)}
				<div use:reveal={{ delay: i * 90 }}>
					<div class="glass h-full p-7 transition-colors duration-300 hover:border-glow/25">
						<div class="flex items-center gap-3.5">
							<span class="flex size-9 items-center justify-center rounded-lg border border-white/10 text-glow">
								<svelte:component this={icons[group.icon]} size={17} aria-hidden="true" />
							</span>
							<h3 class="font-mono text-xs tracking-[0.24em] text-dim uppercase">{group.title}</h3>
						</div>
						<ul class="mt-6 space-y-4">
							{#each group.items as item (item.name)}
								<li class="flex items-baseline justify-between gap-3 border-b border-white/4 pb-3 last:border-0 last:pb-0">
									<span class="text-sm font-medium text-fog">{item.name}</span>
									<span class="text-right font-mono text-[11px] text-dim">{item.note}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>

		<p use:reveal class="mt-12 text-center font-mono text-xs tracking-wider text-dim">
			editor: wezterm + powershell 7 &nbsp;·&nbsp; daily driver: windows &nbsp;·&nbsp; deployed on:
			github pages
		</p>
	</div>
</section>
