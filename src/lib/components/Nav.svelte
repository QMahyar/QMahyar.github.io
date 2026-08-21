<script lang="ts">
	import { profile } from '$lib/data/site';

	let scrolled = $state(false);

	const links = [
		{ label: 'Projects', href: '#projects' },
		{ label: 'Stack', href: '#stack' },
		{ label: 'Contact', href: '#contact' }
	];

	const socials = [
		{
			label: 'GitHub',
			href: profile.github,
			path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
		},
		{
			label: 'Telegram',
			href: profile.telegram,
			path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
		},
		{
			label: 'X (Twitter)',
			href: profile.twitter,
			path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'
		},
		{
			label: 'Email',
			href: profile.email,
			path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'
		}
	];
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 24)} />

<header class="fixed inset-x-0 top-0 z-40">
	<!-- chrome fades as one composited layer — no border flash on scroll -->
	<div
		class="absolute inset-x-0 top-0 h-full border-b border-white/[0.06] bg-void/80 backdrop-blur-md transition-opacity duration-300 ease-out {scrolled
			? 'opacity-100'
			: 'opacity-0'}"
		aria-hidden="true"
	></div>

	<nav
		class="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6"
		aria-label="Main"
	>
		<a href="#top" class="font-mono text-lg font-semibold tracking-tight text-fog">
			Q<span class="text-glow animate-blink">_</span>
		</a>

		<div class="hidden items-center gap-7 text-sm text-mist md:flex">
			{#each links as link (link.href)}
				<a href={link.href} class="transition-colors hover:text-fog">{link.label}</a>
			{/each}
		</div>

		<div class="flex items-center gap-0.5">
			{#each socials as social (social.label)}
				<a
					href={social.href}
					target={social.href.startsWith('mailto') ? undefined : '_blank'}
					rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
					aria-label={social.label}
					title={social.label}
					class="flex size-8 items-center justify-center rounded-lg text-dim transition-colors duration-200 hover:bg-white/5 hover:text-glow"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d={social.path} />
					</svg>
				</a>
			{/each}
		</div>
	</nav>
</header>
