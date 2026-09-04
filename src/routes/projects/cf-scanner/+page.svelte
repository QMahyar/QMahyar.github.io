<script lang="ts">
	import ProjectPage from '$lib/components/projects/ProjectPage.svelte';
	import { cfScannerPage } from '$lib/data/projects/cf-scanner';

	const page = cfScannerPage;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'cf-scanner',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: ['Linux', 'Windows', 'macOS'],
		programmingLanguage: 'Rust',
		description: page.seo.description,
		url: 'https://qmahyar.github.io/projects/cf-scanner',
		codeRepository: page.repo,
		downloadUrl: 'https://github.com/QMahyar/cf-scanner/releases',
		offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
		author: { '@type': 'Person', name: 'Mahyar', url: 'https://qmahyar.github.io/' }
	};
</script>

<svelte:head>
	<title>{page.seo.title}</title>
	<meta name="description" content={page.seo.description} />
	<link rel="canonical" href="https://qmahyar.github.io/projects/cf-scanner" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={page.seo.title} />
	<meta property="og:description" content={page.seo.description} />
	<meta property="og:url" content="https://qmahyar.github.io/projects/cf-scanner" />
	<meta property="og:image" content="https://qmahyar.github.io/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="cf-scanner — working Cloudflare endpoints, with a cyan network motif." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.seo.title} />
	<meta name="twitter:description" content={page.seo.description} />
	<meta name="twitter:image" content="https://qmahyar.github.io/og.png" />
	<meta name="twitter:image:alt" content="cf-scanner — working Cloudflare endpoints, with a cyan network motif." />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<\/script>`}
</svelte:head>

<ProjectPage {page} />
