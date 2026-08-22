<script lang="ts">
	import NetworkCanvas from './NetworkCanvas.svelte';
	import { profile } from '$lib/data/site';

	const command = 'mahyar --rust --telegram --network-tooling';
	let typed = $state('');

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			typed = command;
			return;
		}
		let i = 0;
		let timer: ReturnType<typeof setTimeout>;
		const step = () => {
			i += 1;
			typed = command.slice(0, i);
			if (i < command.length) timer = setTimeout(step, 26 + Math.random() * 36);
		};
		timer = setTimeout(step, 320);
		return () => clearTimeout(timer);
	});
</script>

<!-- H1 · Marquee — full-fold bottom-anchored statement on md+, compact flow on phones -->
<section id="top" class="relative flex flex-col overflow-hidden md:min-h-svh">
	<NetworkCanvas />

	<div
		class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-24 pb-16 md:justify-end md:pb-16"
	>
		<div class="w-full">
			<p
				class="enter machine text-xs leading-relaxed sm:text-sm text-mist max-sm:break-words"
				style="--i: 0"
			>
				<span class="sr-only">$ {command}</span>
				<span aria-hidden="true">
					<span class="text-dim">$</span> {typed}<span class="caret"></span>
				</span>
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
					Browse projects <span class="arr arr-d" aria-hidden="true">&darr;</span>
				</a>
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					class="link-arrow"
				>
					github.com/QMahyar <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
				</a>
			</div>
		</div>
	</div>
</section>
