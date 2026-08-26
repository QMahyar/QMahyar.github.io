<script lang="ts">
	import { profile } from '$lib/data/site';

let scrolled = $state(false);
let progress = $state(0);

$effect(onScroll);

function onScroll() {
		scrolled = window.scrollY > 24;
		const doc = document.documentElement;
		const max = doc.scrollHeight - window.innerHeight;
		progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
	}
</script>

<svelte:window onresize={onScroll} onscroll={onScroll} />

<!-- N9 · edge-aligned minimal — wordmark hard-left, one CTA hard-right, the space is the design -->
<header
	class="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 {scrolled
		? 'border-transparent bg-void/85 backdrop-blur-md'
		: 'border-transparent'}"
>
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-6 sm:gap-6" aria-label="Main">
		<a href="#top" class="machine shrink-0 text-lg font-semibold tracking-tight text-fog">
			Q<span class="text-glow">_</span>
		</a>
		<ul class="flex items-center gap-3 sm:gap-4 md:gap-6" aria-label="Sections">
			<li>
				<a href="#projects" class="inline-flex min-h-11 items-center machine text-xs tracking-wide text-dim transition-colors duration-150 hover:text-fog sm:text-sm">projects</a>
			</li>
			<li>
				<a href="#stack" class="inline-flex min-h-11 items-center machine text-xs tracking-wide text-dim transition-colors duration-150 hover:text-fog sm:text-sm">stack</a>
			</li>
			<li>
				<a href="#contact" class="inline-flex min-h-11 items-center machine text-xs tracking-wide text-dim transition-colors duration-150 hover:text-fog sm:text-sm">contact</a>
			</li>
		</ul>
		<a
			href={profile.telegram}
			target="_blank"
			rel="noopener noreferrer"
			class="link-arrow machine shrink-0 text-xs min-h-11 items-center sm:text-sm"
		>
			say hello <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
		</a>
	</nav>

	<!-- scroll progress hairline -->
	<div class="progress" style="--p: {progress}" aria-hidden="true"></div>
</header>
