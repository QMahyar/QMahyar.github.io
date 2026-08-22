<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { stats } from '$lib/data/site';

	let section: HTMLElement;
	let progresses = $state([0, 0, 0]);

	$effect(() => {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
					progresses = [1, 1, 1];
					return;
				}
				const duration = 1600;
				for (let idx = 0; idx < 3; idx++) {
					const startDelay = idx * 140;
					setTimeout(() => {
						const t0 = performance.now();
						const tick = (now: number) => {
							const p = Math.min(1, (now - t0) / duration);
							progresses[idx] = 1 - Math.pow(1 - p, 3);
							if (p < 1) requestAnimationFrame(tick);
						};
						requestAnimationFrame(tick);
					}, startDelay);
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(section);
		return () => io.disconnect();
	});

	function display(value: string, idx: number): string {
		const p = progresses[idx];
		if (p >= 1 || !/^\d{1,2}$/.test(value)) return value;
		return String(Math.round(Number(value) * p));
	}
</script>

<!-- Stat strip — proof column between the ledger and the stack -->
<section bind:this={section} class="relative border-t border-line/50 py-20 md:py-24">
	<div class="mx-auto max-w-6xl px-6">
		<dl class="grid gap-x-6 gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-line/50">
			{#each stats as stat, i (stat.label)}
				<div
					class="flex flex-col sm:pl-6 sm:first:pl-0"
					use:reveal={{ delay: i * 90 }}
					data-variant="stack"
				>
					<dd class="order-1 machine text-[2rem] font-semibold tracking-tight text-fog tabular-nums md:text-[2.44rem]">
						{display(stat.value, i)}
					</dd>
					<dt class="order-2 mt-2 machine text-xs tracking-wider text-dim uppercase">
						{stat.label}
					</dt>
				</div>
			{/each}
		</dl>
	</div>
</section>
