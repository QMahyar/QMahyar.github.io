<script lang="ts">
	import { page } from '$app/state';

	const status = $derived(page.status ?? 404);
	const message = $derived(page.error?.message ?? '');
	const is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{is404 ? '404' : `${status} — Error`} — Mahyar</title>
	<meta
		name="description"
		content={is404
			? 'Page not found — head back to the start and browse from there.'
			: 'Something went wrong — head back to the start and try again.'}
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative flex min-h-[70svh] flex-col items-center justify-center px-6 py-24 text-center">
	<p class="machine text-xs tracking-widest text-dim uppercase">
		{is404 ? '404 · not found' : `${status} · error`}
	</p>
	<h1 class="mt-4 text-4xl font-bold tracking-tight text-fog md:text-5xl">
		{is404 ? "This page doesn't exist." : 'Something went wrong.'}
	</h1>
	<p class="mt-4 max-w-md text-mist">
		{is404
			? 'The address you followed leads nowhere. Head back to the start and browse from there.'
			: message || 'An unexpected error occurred. Head back to the start and try again.'}
	</p>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
		<a href="/" class="link-arrow machine text-sm">back to home <span class="arr arr-ne" aria-hidden="true">&nearr;</span></a>
		<a href="/#projects" class="link-arrow machine text-sm">browse projects <span class="arr arr-d" aria-hidden="true">&darr;</span></a>
	</div>
</section>
