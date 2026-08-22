<script lang="ts">
	import { profile } from '$lib/data/site';

	let scrolled = $state(false);
	let progress = $state(0);

	function onScroll() {
		scrolled = window.scrollY > 24;
		const doc = document.documentElement;
		const max = doc.scrollHeight - window.innerHeight;
		progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
	}
</script>

<svelte:window onscroll={onScroll} />

<!-- N9 · edge-aligned minimal — wordmark hard-left, one CTA hard-right, the space is the design -->
<header
	class="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 {scrolled
		? 'border-transparent bg-void/85 backdrop-blur-md'
		: 'border-transparent'}"
>
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6" aria-label="Main">
		<a href="#top" class="machine shrink-0 text-lg font-semibold tracking-tight text-fog">
			Q<span class="text-glow">_</span>
		</a>
		<div class="hidden items-center gap-6 md:flex" aria-label="Sections">
			<a href="#projects" class="machine text-sm tracking-wide text-dim transition-colors duration-150 hover:text-fog">projects</a>
			<a href="#stack" class="machine text-sm tracking-wide text-dim transition-colors duration-150 hover:text-fog">stack</a>
			<a href="#contact" class="machine text-sm tracking-wide text-dim transition-colors duration-150 hover:text-fog">contact</a>
		</div>
		<a
			href={profile.telegram}
			target="_blank"
			rel="noopener noreferrer"
			class="link-arrow machine ml-auto shrink-0 text-sm min-h-11 items-center md:ml-0"
		>
			say hello <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
		</a>
	</nav>

	<!-- scroll progress hairline -->
	<div class="progress" style="--p: {progress}" aria-hidden="true"></div>
</header>
