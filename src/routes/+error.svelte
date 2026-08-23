<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>404 — Mahyar</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative flex min-h-[70svh] flex-col items-center justify-center px-6 py-24 text-center">
	<p class="machine text-xs tracking-widest text-dim uppercase">404 · not found</p>
	<h1 class="mt-4 text-4xl font-bold tracking-tight text-fog md:text-5xl">This page doesn't exist.</h1>
	<p class="mt-4 max-w-md text-mist">The address you followed leads nowhere. Head back to the start and browse from there.</p>
	<a href="/" class="link-arrow mt-8 machine text-sm">back to home <span class="arr arr-ne" aria-hidden="true">&nearr;</span></a>
</section>
