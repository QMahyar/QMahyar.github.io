<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { stats } from '$lib/data/site';

	let section: HTMLElement;
	let progress = $state(0);

	$effect(() => {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
					progress = 1;
					return;
				}
				const t0 = performance.now();
				const duration = 1100;
				const tick = (now: number) => {
					const p = Math.min(1, (now - t0) / duration);
					progress = 1 - Math.pow(1 - p, 3);
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		io.observe(section);
		return () => io.disconnect();
	});

	/** Short integers count up; symbols (∞) and years land immediately. */
	function display(value: string): string {
		if (progress >= 1 || !/^\d{1,2}$/.test(value)) return value;
		return String(Math.round(Number(value) * progress));
	}
</script>

<!-- Stat strip — proof column between the ledger and the stack -->
<section bind:this={section} class="relative border-t border-line/50 py-20 md:py-24">
	<div class="mx-auto max-w-6xl px-6">
		<dl class="grid gap-x-6 gap-y-10 sm:grid-cols-3">
			{#each stats as stat, i (stat.label)}
				<div class="flex flex-col" use:reveal={{ delay: i * 90 }}>
					<dd class="order-1 machine text-[2rem] font-semibold tracking-tight text-fog tabular-nums md:text-[2.44rem]">
						{display(stat.value)}
					</dd>
					<dt class="order-2 mt-2 machine text-xs tracking-wider text-dim uppercase">
						{stat.label}
					</dt>
				</div>
			{/each}
		</dl>
	</div>
</section>
