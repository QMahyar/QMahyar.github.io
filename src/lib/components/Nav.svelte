<script lang="ts">
	import { page } from '$app/state';
	import { profile } from '$lib/data/site';

	const onProjects = $derived(page.url.pathname.startsWith('/projects'));

let scrolled = $state(false);
let progress = $state(0);

function onScroll() {
	scrolled = window.scrollY > 24;
	const doc = document.documentElement;
	const max = doc.scrollHeight - window.innerHeight;
	progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

$effect(() => {
	onScroll();
});
</script>

<svelte:window onresize={onScroll} onscroll={onScroll} />

<!-- N9 · edge-aligned minimal — wordmark hard-left, one CTA hard-right, the space is the design -->
<header
	class="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-300 {scrolled
		? 'bg-void/85 backdrop-blur-md'
		: ''}"
>
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6" aria-label="Main">
		<a href="/" aria-label="Mahyar — home" class="machine shrink-0 text-lg font-semibold tracking-tight text-fog">
			<span aria-hidden="true">Q<span class="text-glow">_</span></span>
		</a>
		<ul class="flex items-center gap-2.5 sm:gap-4 md:gap-6">
			<li>
				<a href="/projects" aria-current={onProjects ? 'page' : undefined} class="inline-flex min-h-11 items-center machine text-xs tracking-wide transition-colors duration-150 hover:text-fog sm:text-sm {onProjects ? 'text-fog' : 'text-dim'}">projects</a>
			</li>
			<li>
				<a href="/#stack" class="inline-flex min-h-11 items-center machine text-xs tracking-wide text-dim transition-colors duration-150 hover:text-fog sm:text-sm">stack</a>
			</li>
			<li>
				<a href="/#contact" class="inline-flex min-h-11 items-center machine text-xs tracking-wide text-dim transition-colors duration-150 hover:text-fog sm:text-sm">contact</a>
			</li>
		</ul>
		<a
			href={profile.telegram}
			target="_blank"
			rel="noopener noreferrer"
			class="link-arrow machine inline-flex min-h-11 shrink-0 items-center text-xs sm:text-sm"
		>
			<span class="max-[374px]:hidden">say hello</span><span class="hidden max-[374px]:inline">hi</span> <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
		</a>
	</nav>

	<!-- scroll progress hairline -->
	<div class="progress" style="--p: {progress}" aria-hidden="true"></div>
	<!-- Packet trail — comet head on the left edge, desktop only -->
	<div class="packet-trail" style="--p: {progress}" aria-hidden="true">
		<div class="packet-comet"></div>
	</div>
</header>
