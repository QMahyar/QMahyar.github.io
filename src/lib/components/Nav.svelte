<script lang="ts">
	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 24)} />

<header
	class="fixed inset-x-0 top-0 z-40 transition-all duration-300 {scrolled
		? 'border-b border-white/5 bg-void/75 backdrop-blur-md'
		: 'bg-transparent'}"
>
	<nav class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
		<a href="#top" class="font-mono text-lg font-semibold tracking-tight text-fog">
			Q<span class="text-glow animate-blink">_</span>
		</a>

		<div class="hidden items-center gap-8 text-sm text-mist sm:flex">
			<a href="#projects" class="transition-colors hover:text-fog">Projects</a>
			<a href="#stack" class="transition-colors hover:text-fog">Stack</a>
			<a href="#contact" class="transition-colors hover:text-fog">Contact</a>
		</div>

		<a
			href="https://github.com/QMahyar"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub profile"
			class="text-mist transition-colors hover:text-glow"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
				/>
			</svg>
		</a>
	</nav>
</header>
