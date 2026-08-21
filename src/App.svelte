<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<a
	href="#projects"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
>
	Skip to content
</a>

<div class="grain relative">
	<Nav />
	<main>
		<Hero />
		<Projects />
		<Stack />
	</main>
	<Contact />
</div>
