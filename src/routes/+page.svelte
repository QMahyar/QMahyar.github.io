<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import StatsStrip from '$lib/components/StatsStrip.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Mahyar — Developer & Security Enthusiast</title>
	<meta
		name="description"
		content="Mahyar builds tools for Telegram, networking, and developer workflows — Cloudflare WARP scanners, config generators, Telegram automation, and coding-agent extensions. Rust, TypeScript, Go."
	/>
	<link rel="canonical" href="https://qmahyar.github.io/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Mahyar — Developer & Security Enthusiast" />
	<meta
		property="og:description"
		content="Tools for Telegram, networking, and developer workflows. Rust · TypeScript · Go."
	/>
	<meta property="og:url" content="https://qmahyar.github.io/" />
	<meta property="og:image" content="https://qmahyar.github.io/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Mahyar — developer and security enthusiast, with a cyan network motif." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Mahyar — Developer & Security Enthusiast" />
	<meta
		name="twitter:description"
		content="Tools for Telegram, networking, and developer workflows."
	/>
	<meta name="twitter:image" content="https://qmahyar.github.io/og.png" />
	<meta name="twitter:image:alt" content="Mahyar — developer and security enthusiast, with a cyan network motif." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Mahyar',
		url: 'https://qmahyar.github.io/',
		sameAs: ['https://github.com/QMahyar', 'https://t.me/QMahyar', 'https://x.com/Mahyartdb'],
		jobTitle: 'Developer & Security Enthusiast',
		description: 'Builds tools for Telegram, networking, and developer workflows — Rust, TypeScript, Go.'
	}).replace(/</g, '\\u003c')}<\/script>`}
</svelte:head>

<Hero />
<Projects flagships={data.flagships} projects={data.projects} moreProjects={data.moreProjects} />
<StatsStrip stats={[...data.stats]} />
<Stack />
