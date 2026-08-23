<script lang="ts">
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '../app.css';

	import Nav from '$lib/components/Nav.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import NetworkCanvas from '$lib/components/NetworkCanvas.svelte';

	let { children } = $props();
</script>

<a
	href="#projects"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
>
	Skip to content
</a>

<div class="grain atmosphere relative">
	<div
		class="pointer-events-none fixed inset-0 -z-[1] opacity-60 sm:opacity-80"
		aria-hidden="true"
	>
		<NetworkCanvas />
	</div>
	<Nav />
	<main>
		{@render children()}
	</main>
	<Contact />
</div>
