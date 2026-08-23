<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import StatsStrip from '$lib/components/StatsStrip.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import NetworkCanvas from '$lib/components/NetworkCanvas.svelte';
</script>

<a
	href="#projects"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
>
	Skip to content
</a>

<div class="grain atmosphere relative">
	<!-- Full-page network field — fixed behind every section, alive on scroll -->
	<div
		class="pointer-events-none fixed inset-0 -z-[1] opacity-60 sm:opacity-80"
		aria-hidden="true"
	>
		<NetworkCanvas />
	</div>
	<Nav />
	<main>
		<Hero />
		<Projects />
		<StatsStrip />
		<Stack />
	</main>
	<Contact />
</div>
