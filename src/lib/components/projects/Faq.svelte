<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { Faq } from '$lib/data/projects/types';

	let { items }: { items: Faq[] } = $props();
</script>

<div class="divide-y divide-line/50 border-t border-line/50" use:reveal>
	{#each items as item, i (item.q)}
		<details class="group py-1" use:reveal={{ delay: i * 30 }}>
			<summary
				class="machine flex min-h-11 cursor-pointer items-center gap-3 text-sm text-fog marker:text-dim"
			>
				<span class="text-dim transition-transform duration-150 group-open:rotate-90" aria-hidden="true">›</span>
				{item.q}
			</summary>
			<p class="mt-1 mb-4 max-w-2xl pl-6 text-sm leading-relaxed">{item.a}</p>
		</details>
	{/each}
</div>
