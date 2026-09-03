<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Glyph from '$lib/components/Glyph.svelte';
	import { projectPages } from '$lib/data/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const fullBySlug = new Map(projectPages.map((p) => [p.slug, p]));
</script>

<svelte:head>
	<title>Projects — Mahyar</title>
	<meta
		name="description"
		content="Every project, in one index — flagship deep-dives for tele-cli and cf-scanner, plus the smaller tools, extensions, and configs."
	/>
	<link rel="canonical" href="https://qmahyar.github.io/projects" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Projects — Mahyar" />
	<meta
		property="og:description"
		content="Flagship deep-dives for tele-cli and cf-scanner, plus every smaller tool and extension."
	/>
	<meta property="og:url" content="https://qmahyar.github.io/projects" />
	<meta property="og:image" content="https://qmahyar.github.io/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects — Mahyar" />
	<meta
		name="twitter:description"
		content="Flagship deep-dives for tele-cli and cf-scanner, plus every smaller tool and extension."
	/>
	<meta name="twitter:image" content="https://qmahyar.github.io/og.png" />
</svelte:head>

<section class="relative flex flex-col overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_28rem_at_26%_44%,oklch(15%_0.008_255/_0.88),transparent_68%)] max-sm:bg-[radial-gradient(32rem_22rem_at_28%_40%,oklch(15%_0.008_255/_0.9),transparent_72%)]"
		aria-hidden="true"
	></div>
	<div
		class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-24 pb-12 md:pt-20 md:pb-14"
	>
		<p class="enter machine text-xs leading-relaxed text-mist sm:text-sm" style="--i: 0">
			<span class="text-dim">$</span> ls ~/projects --all
		</p>
		<h1
			class="enter mt-6 text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.95] font-bold text-fog"
			style="--i: 1"
		>
			Projects<span class="text-glow" aria-hidden="true">.</span><span class="sr-only">.</span>
		</h1>
		<p class="enter mt-7 max-w-xl text-lg leading-relaxed md:text-xl" style="--i: 2">
			Two flagships with full deep-dives — everything else indexed below, linked out to its repo.
		</p>
	</div>
</section>

<div class="mx-auto max-w-6xl px-6 pb-8">
	<!-- Flagships — internal deep-dives first, repo second -->
	<section aria-label="Flagship projects" class="flex flex-col gap-20 py-10 md:gap-24">
		{#each data.flagships as project, i (project.name)}
			{@const flip = i % 2 === 1}
			{@const full = project.slug ? fullBySlug.get(project.slug) : undefined}
			<article class="grid min-w-0 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
				<div
					class="min-w-0 {flip ? 'md:order-2' : ''}"
					use:reveal={{ delay: flip ? 90 : 0 }}
					data-variant="diptych"
				>
					<p class="machine text-xs tracking-[0.08em] text-dim uppercase">
						flagship &middot; rust &middot; {project.updated}
					</p>
					<h2 class="mt-3 text-3xl tracking-tight md:text-4xl">
						{#if project.slug}
							<a href="/projects/{project.slug}" class="transition-colors duration-150 hover:text-glow">
								{project.name}
							</a>
						{:else}
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								class="transition-colors duration-150 hover:text-glow"
							>
								{project.name}
							</a>
						{/if}
					</h2>
					<p class="mt-5 max-w-md leading-relaxed">{project.description}</p>
					<div class="mt-7 flex flex-wrap gap-x-8 gap-y-3">
						{#if project.slug}
							<a href="/projects/{project.slug}" class="link-arrow machine text-sm">
								deep-dive <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
							</a>
						{/if}
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="link-arrow machine text-sm"
						>
							view repo <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
						</a>
					</div>
					{#if full}
						<ul class="mt-6 flex flex-wrap gap-2" aria-label="{project.name} highlights">
							{#each full.badges as badge (badge)}
								<li
									class="machine rounded border border-line px-2 py-1 text-[11px] tracking-wide text-dim"
								>
									{badge}
								</li>
							{/each}
						</ul>
					{/if}
				</div>

				<div
					class="surface spot min-w-0 p-6 md:p-8 {flip ? 'md:order-1' : ''}"
					use:reveal={{ delay: flip ? 0 : 90 }}
					use:spotlight
					data-variant="diptych"
				>
					<p class="term-label">{project.name} &middot; spec</p>
					<ul class="divide-y divide-line/60">
						{#each project.spec as row (row.key)}
							<li
								class="flex w-full flex-col gap-1 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
							>
								<span class="machine text-[13px] text-dim">{row.key}</span>
								<span class="machine text-[13px] text-fog sm:text-right">{row.value}</span>
							</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</section>

	<!-- Ledger — smaller repos as an index -->
	<section aria-label="All projects" class="mt-20 md:mt-28">
		<h2 class="sr-only">All projects</h2>
		<ul class="grid gap-x-10 gap-y-5 sm:grid-cols-2">
			{#each data.projects as project, i (project.name)}
				<ProjectCard {project} delay={i * 45} />
			{/each}
		</ul>

		<ul class="mt-20 divide-y divide-line/50 border-t border-line/50">
			{#each data.moreProjects as project, i (project.name)}
				<ProjectCard {project} compact delay={i * 45} />
			{/each}
		</ul>

		<!-- Compact deep-dive teasers for the next-full tier -->
		<section aria-label="Next deep-dives" class="mt-20">
			<p class="machine text-sm text-dim" use:reveal>
				next deep-dives<span aria-hidden="true">.</span>
				<span class="mx-3 text-line" aria-hidden="true">/</span>
				queued from the long tail
			</p>
			<ul class="mt-6 grid gap-6 sm:grid-cols-3">
				{#each [{ name: 'q-proxy', blurb: 'Self-hosted Cloudflare Worker proxy panel — subs for every client, WARP configs.', href: 'https://github.com/QMahyar/q-proxy' }, { name: 'warp-generator', blurb: 'Private WARP subscriptions, self-hosted on Cloudflare — no VPS, no domain.', href: 'https://github.com/QMahyar/warp-generator' }, { name: 'QShot', blurb: 'Fast, trim screenshot tool — capture, annotate, share.', href: 'https://github.com/QMahyar/QShot' }] as item, i (item.name)}
					<li
						class="surface spot min-w-0 p-6"
						use:reveal={{ delay: i * 60 }}
						use:spotlight
						data-variant="ledger"
					>
						<div class="flex items-center gap-3">
							<Glyph seed={item.name} size={28} class="shrink-0 opacity-80" />
							<h3 class="font-medium text-fog">{item.name}</h3>
						</div>
						<p class="mt-3 text-sm leading-relaxed text-dim">{item.blurb}</p>
						<p class="mt-4">
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								class="link-arrow machine text-xs"
							>
								view repo <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
							</a>
						</p>
					</li>
				{/each}
			</ul>
		</section>
	</section>
</div>
