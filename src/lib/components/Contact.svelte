<script lang="ts">
	import { Send, AtSign, ArrowUp } from '@lucide/svelte';
	import { profile } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	const channels = [
		{
			label: 'github',
			value: 'QMahyar',
			href: profile.github,
			external: true
		},
		{
			icon: Send,
			label: 'telegram — fastest',
			value: 't.me/Qstickers',
			href: profile.telegram,
			external: true
		},
		{
			icon: AtSign,
			label: 'x / twitter',
			value: profile.handle,
			href: profile.twitter,
			external: true
		}
	];
</script>

<footer id="contact" class="relative scroll-mt-20 overflow-hidden border-t border-white/5 pt-28 md:pt-36">
	<div
		class="pointer-events-none absolute inset-0"
		style="background:
			radial-gradient(40rem 22rem at 50% 115%, rgba(47, 168, 238, 0.12), transparent 65%),
			radial-gradient(30rem 16rem at 15% 90%, rgba(155, 31, 173, 0.06), transparent 65%);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-6xl px-6">
		<div class="text-center">
			<p use:reveal class="font-mono text-xs tracking-[0.28em] text-dim uppercase">03 — transmission</p>
			<h2 use:reveal={{ delay: 80 }} class="mt-6 text-5xl font-bold tracking-tight text-fog md:text-7xl">
				Open a channel<span class="text-glow">.</span>
			</h2>
			<p use:reveal={{ delay: 160 }} class="mx-auto mt-5 max-w-md text-mist">
				Fastest route is Telegram — but any of these work.
			</p>
		</div>

		<div class="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
			{#each channels as channel, i (channel.label)}
				<div use:reveal={{ delay: i * 90 }}>
					<a
						href={channel.href}
						target={channel.external ? '_blank' : undefined}
						rel={channel.external ? 'noopener noreferrer' : undefined}
						class="glass group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-glow/30 hover:bg-white/[0.04]"
					>
						<span
							class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-mist transition-colors group-hover:text-glow"
						>
							{#if channel.label === 'github'}
								<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
									/>
								</svg>
							{:else}
								<channel.icon size={19} aria-hidden="true" />
							{/if}
						</span>
						<span class="min-w-0">
							<span class="block font-mono text-[10px] tracking-widest text-dim uppercase">
								{channel.label}
							</span>
							<span class="block truncate text-sm font-medium text-fog">{channel.value}</span>
						</span>
					</a>
				</div>
			{/each}
		</div>

		<div
			class="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 font-mono text-xs text-dim sm:flex-row"
		>
			<p>&copy; 2026 Mahyar</p>
			<p>svelte 5 · tailwind v4 · github pages</p>
			<a href="#top" class="inline-flex items-center gap-1.5 transition-colors hover:text-glow">
				back to top <ArrowUp size={13} aria-hidden="true" />
			</a>
		</div>
	</div>
</footer>
