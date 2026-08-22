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
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
		<a href="#top" class="machine text-lg font-semibold tracking-tight text-fog">
			Q<span class="text-glow">_</span>
		</a>
		<a
			href={profile.telegram}
			target="_blank"
			rel="noopener noreferrer"
			class="link-arrow machine text-sm min-h-11 items-center"
		>
			say hello <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
		</a>
	</nav>

	<!-- scroll progress hairline -->
	<div class="progress" style="--p: {progress}" aria-hidden="true"></div>
</header>
