<script lang="ts">
	import NetworkCanvas from './NetworkCanvas.svelte';
	import { profile } from '$lib/data/site';
</script>

<!-- H1 · Marquee — the statement fills the fold, bottom-anchored, left-biased -->
<section id="top" class="relative flex min-h-svh flex-col overflow-hidden">
	<NetworkCanvas />

	<div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pt-20 pb-24">
		<div class="w-full">
			<p class="enter machine text-sm text-mist" style="--i: 0">
				<span class="text-dim">$</span> mahyar --rust --telegram --network-tooling<span
					class="caret"
					aria-hidden="true"></span>
			</p>

			<h1
				class="enter mt-6 text-[clamp(3.5rem,11vw,7rem)] font-bold leading-[0.95] text-fog"
				style="--i: 1"
			>
				Mahyar.
			</h1>

			<p
				class="enter mt-7 max-w-xl text-lg leading-relaxed md:text-xl"
				style="--i: 2"
			>
				I build sharp tools for Telegram and the networks they run on — MTProto CLIs,
				endpoint scanners, developer automation.
			</p>

			<div class="enter mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style="--i: 3">
				<a href="#projects" class="link-arrow">
					Browse projects <span aria-hidden="true">&darr;</span>
				</a>
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					class="link-arrow"
				>
					github.com/QMahyar <span aria-hidden="true">&nearr;</span>
				</a>
			</div>
		</div>
	</div>
</section>
