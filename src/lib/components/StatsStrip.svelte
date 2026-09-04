<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { stats as fallbackStats } from '$lib/data/site';
	import { browser } from '$app/environment';

	let { stats = fallbackStats }: { stats?: Array<{ value: string; label: string }> | typeof fallbackStats } = $props();

	let section: HTMLElement | undefined;
	// Start at final values so SSR and first paint agree — no hydration flash.
	// The count-up only ever animates downward-from-final on intersect.
	let progresses = $state<number[]>([]);

	// Single effect keyed on `stats`: when live data arrives the observer is
	// re-armed, so the strip re-counts to the new values instead of sticking.
	$effect(() => {
		// eslint-disable-next-line svelte/state_referenced_locally -- intentionally re-runs when stats identity changes
		const current = stats;
		const count = current.length;
		progresses = current.map(() => 1);
		const timers: Array<ReturnType<typeof setTimeout>> = [];
		let raf = 0;
		let done = false;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || done) return;
				done = true;
				io.disconnect();
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
				progresses = current.map(() => 0);
				const duration = 1600;
				for (let idx = 0; idx < count; idx++) {
					const startDelay = idx * 140;
					timers.push(
						setTimeout(() => {
							const t0 = performance.now();
							const tick = (now: number) => {
								const p = Math.min(1, (now - t0) / duration);
								progresses[idx] = 1 - Math.pow(1 - p, 3);
								if (p < 1) raf = requestAnimationFrame(tick);
							};
							raf = requestAnimationFrame(tick);
						}, startDelay)
					);
				}
			},
			{ threshold: 0.4 }
		);
		if (section) io.observe(section);
		return () => {
			io.disconnect();
			for (const t of timers) clearTimeout(t);
			cancelAnimationFrame(raf);
		};
	});

	function display(value: string, idx: number): string {
		if (!browser) return value;
		const p = progresses[idx] ?? 1;
		if (p >= 1 || !/^\d{1,2}$/.test(value)) return value;
		return String(Math.round(Number(value) * p));
	}
</script>

<!-- Stat strip — proof column between the ledger and the stack -->
<section bind:this={section} aria-labelledby="stats-head" class="relative border-t border-line/50 py-20 md:py-24">
	<h2 id="stats-head" class="sr-only">GitHub stats</h2>
	<div class="mx-auto max-w-6xl px-6">
		<dl class="grid gap-x-6 gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-line/50">
			{#each stats as stat, i (stat.label)}
				<div
					class="flex flex-col sm:pl-6 sm:first:pl-0"
					use:reveal={{ delay: i * 90 }}
					data-variant="stack"
				>
					<dt class="order-2 mt-2 machine text-xs tracking-wider text-dim uppercase">
						{stat.label}
					</dt>
					<dd class="order-1 machine min-h-[1.2em] text-[2rem] font-semibold tracking-tight {i === 2 ? 'text-warm' : 'text-fog'} tabular-nums md:text-[2.44rem]">
						{display(stat.value, i)}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
