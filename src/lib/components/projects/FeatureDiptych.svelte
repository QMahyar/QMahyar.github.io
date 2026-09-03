<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import type { Feature } from '$lib/data/projects/types';

	let { features }: { features: Feature[] } = $props();
</script>

<div class="flex flex-col gap-20 md:gap-24">
	{#each features as feature, i (feature.title)}
		{@const flip = i % 2 === 1}
		<article class="grid min-w-0 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
			<div
				class="min-w-0 {flip ? 'md:order-2' : ''}"
				use:reveal={{ delay: flip ? 90 : 0 }}
				data-variant="diptych"
			>
				<h3 class="text-2xl tracking-tight md:text-3xl">{feature.title}</h3>
				<p class="mt-4 max-w-md leading-relaxed">{feature.body}</p>
			</div>

			<div
				class="surface spot min-w-0 p-6 md:p-8 {flip ? 'md:order-1' : ''}"
				use:reveal={{ delay: flip ? 0 : 90 }}
				use:spotlight
				data-variant="diptych"
			>
				<p class="term-label">{feature.title} · spec</p>
				<ul class="divide-y divide-line/60">
					{#each feature.spec as row (row.key)}
						<li
							class="flex w-full flex-col gap-1 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
						>
							<span class="machine text-[13px] text-dim">{row.key}</span>
							<span class="machine text-[13px] text-fog sm:text-right">{row.value}</span>
						</li>
					{/each}
				</ul>
			</div>
		</article>
	{/each}
</div>
