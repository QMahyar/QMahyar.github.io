<script lang="ts">
	import ProjectPage from '$lib/components/projects/ProjectPage.svelte';
	import { teleCliPage } from '$lib/data/projects/tele-cli';

	const page = teleCliPage;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'tele-cli',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: ['Linux', 'Windows', 'macOS', 'Android'],
		programmingLanguage: 'Rust',
		description: page.seo.description,
		url: 'https://qmahyar.github.io/projects/tele-cli',
		codeRepository: page.repo,
		downloadUrl: 'https://github.com/QMahyar/tele-cli/releases',
		offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
		author: { '@type': 'Person', name: 'Mahyar', url: 'https://qmahyar.github.io/' }
	};
</script>

<svelte:head>
	<title>{page.seo.title}</title>
	<meta name="description" content={page.seo.description} />
	<link rel="canonical" href="https://qmahyar.github.io/projects/tele-cli" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={page.seo.title} />
	<meta property="og:description" content={page.seo.description} />
	<meta property="og:url" content="https://qmahyar.github.io/projects/tele-cli" />
	<meta property="og:image" content="https://qmahyar.github.io/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.seo.title} />
	<meta name="twitter:description" content={page.seo.description} />
	<meta name="twitter:image" content="https://qmahyar.github.io/og.png" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<\/script>`}
</svelte:head>

<ProjectPage {page} />
