<script lang="ts">
	import NetworkCanvas from './NetworkCanvas.svelte';
	import { stats } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="top" class="relative flex min-h-svh flex-col overflow-hidden">
	<NetworkCanvas />

	<!-- depth gradients -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background:
			radial-gradient(52rem 30rem at 18% 12%, rgba(47, 168, 238, 0.10), transparent 60%),
			radial-gradient(44rem 28rem at 85% 55%, rgba(77, 143, 255, 0.07), transparent 60%),
			radial-gradient(60rem 24rem at 50% 108%, rgba(12, 12, 12, 0.95), transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pt-24 pb-16">
		<div class="w-full">
			<p
				use:reveal
				class="font-mono text-xs tracking-[0.32em] text-glow/90 uppercase md:text-sm"
			>
				// rust &middot; telegram &middot; network tooling
			</p>

			<h1
				use:reveal={{ delay: 90 }}
				class="mt-5 text-[clamp(3.6rem,13vw,8.5rem)] leading-[0.95] font-bold tracking-tight text-fog"
			>
				Mahyar<span class="text-glow">.</span>
			</h1>

			<p use:reveal={{ delay: 180 }} class="mt-7 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
				I build sharp tools for Telegram and the networks they run on — MTProto CLIs,
				endpoint scanners, developer automation.
				<span class="text-fog">Everything worth keeping gets ported to Rust.</span>
			</p>

			<div use:reveal={{ delay: 260 }} class="mt-9 flex flex-wrap items-center gap-4">
				<span
					class="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-sm text-mist"
				>
					<span class="relative flex size-2" aria-hidden="true">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-50"
						></span>
						<span class="relative inline-flex size-2 rounded-full bg-pulse"></span>
					</span>
					porting the whole toolbox to rust
				</span>
			</div>

			<div use:reveal={{ delay: 340 }} class="mt-10 flex flex-wrap gap-4">
				<a
					href="#projects"
					class="rounded-xl bg-glow px-7 py-3 font-semibold text-void shadow-[0_0_36px_rgba(121,234,234,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(121,234,234,0.4)]"
				>
					Browse projects
				</a>
				<a
					href="https://t.me/Qstickers"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl border border-white/15 px-7 py-3 font-medium text-fog transition-colors hover:border-glow/50 hover:text-glow"
				>
					Say hello
				</a>
			</div>

			<dl
				use:reveal={{ delay: 420 }}
				class="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-white/8 pt-6 md:max-w-lg"
			>
				{#each stats as stat (stat.label)}
					<div>
						<dt class="order-2 font-mono text-[11px] tracking-wider text-dim uppercase">
							{stat.label}
						</dt>
						<dd class="font-mono text-2xl font-semibold text-fog">{stat.value}</dd>
					</div>
				{/each}
			</dl>		</div>
	</div>

	<div
		class="relative z-10 flex justify-center pb-8"
		aria-hidden="true"
		style="animation: none"
	>
		<svg
			class="size-5 text-dim"
			style="animation: gentle-bounce 2.4s ease-in-out infinite"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</div>
	<style>
		@keyframes gentle-bounce {
			0%,
			100% {
				transform: translateY(0);
			}
			50% {
				transform: translateY(6px);
			}
		}
	</style>
</section>
