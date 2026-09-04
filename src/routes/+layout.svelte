<script lang="ts">
	import '@fontsource/space-grotesk/latin-400.css';
	import '@fontsource/space-grotesk/latin-700.css';
	import '@fontsource/jetbrains-mono/latin-400.css';
	import '@fontsource/jetbrains-mono/latin-700.css';
	import '../app.css';

	import Nav from '$lib/components/Nav.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import StaticConstellation from '$lib/components/StaticConstellation.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Desktop canvas loads lazily behind a pointer/width gate so mobile never
	// downloads, parses, or hydrates the RAF loop — CSS `hidden sm:block` alone
	// would still ship and run the module on phones.
	import type { Component } from 'svelte';
	let Canvas = $state<Component | null>(null);
	$effect(() => {
		if (!browser) return;
		const mq = window.matchMedia('(min-width: 640px) and (hover: hover) and (pointer: fine)');
		const load = async () => {
			if (mq.matches && !Canvas) {
				const mod = await import('$lib/components/NetworkCanvas.svelte');
				Canvas = mod.default as unknown as Component;
			}
		};
		void load();
		mq.addEventListener('change', load);
		return () => mq.removeEventListener('change', load);
	});
</script>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
>
	Skip to content
</a>

<div class="grain atmosphere relative">
	<!-- Static constellation for mobile — lighter, battery-friendly -->
	<div class="pointer-events-none fixed inset-0 -z-[1] opacity-40 sm:hidden" aria-hidden="true">
		<StaticConstellation />
	</div>
	<!-- Animated canvas for desktop only — module never loads on mobile -->
	{#if Canvas}
		<div
			class="pointer-events-none fixed inset-0 -z-[1] hidden opacity-80 sm:block"
			aria-hidden="true"
		>
			<Canvas />
		</div>
	{/if}
	<Nav />
	<main id="main" tabindex="-1">
		{@render children()}
	</main>
	<Contact />
</div>
