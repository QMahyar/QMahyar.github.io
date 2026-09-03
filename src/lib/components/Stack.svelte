<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { stack } from '$lib/data/site';
</script>

<section id="stack" class="relative scroll-mt-20 border-t border-line/50 py-28 md:py-36">
	<div class="mx-auto max-w-6xl px-6">
		<!-- S4 · inline no-break — the head emerges inside the flow, no spatial break -->
		<h2 class="sr-only">Stack</h2>
		<p class="mb-10 machine text-sm text-dim" use:reveal>
			The stack<span aria-hidden="true">.</span>
			<span class="mx-3 text-line" aria-hidden="true">/</span>
			what the tools are made of
		</p>

		<div class="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr_0.8fr]">
			{#each stack as group, i (group.title)}
				<div class="min-w-0" use:reveal={{ delay: i * 90 }} data-variant="stack">
					<h3 class="text-lg font-semibold tracking-tight text-fog">{group.title}</h3>
					<!-- F3 · tabular spec sheet — rows, hairline rules, no cards -->
					<dl class="mt-5 divide-y divide-line/50 border-t border-line/50">
						{#each group.items as item (item.name)}
							<div class="flex items-baseline justify-between gap-4 py-3 transition-colors duration-150 hover:bg-panel-2/60">
								<dt class="text-sm font-medium text-fog">{item.name}</dt>
								<dd class="machine text-right text-xs text-dim">{item.note}</dd>
							</div>
						{/each}
					</dl>
					{#if i === 2}
						<dl class="mt-8 machine text-xs leading-relaxed text-dim">
							<div class="flex gap-2">
								<dt class="sr-only">Editor</dt>
								<dd>editor: wezterm + powershell 7</dd>
							</div>
							<div class="flex gap-2">
								<dt class="sr-only">Daily driver</dt>
								<dd>daily driver: windows</dd>
							</div>
							<div class="flex gap-2">
								<dt class="sr-only">Deployed on</dt>
								<dd>deployed on: github pages</dd>
							</div>
						</dl>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
