<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/site';

	const channels = [
		{ label: 'telegram', value: 't.me/QMahyar', href: profile.telegram },
		{ label: 'github', value: 'QMahyar', href: profile.github },
		{ label: 'x / twitter', value: profile.handle, href: profile.twitter },
		{ label: 'email', value: 'mahyartdb@gmail.com', href: profile.email }
	];
</script>

<!-- Ft5 · statement — one closing line dominates; channels + meta sit beneath the hairline -->
<footer id="contact" class="relative scroll-mt-20 border-t border-line/50 pt-28 pb-10 md:pt-36">
	<div class="mx-auto max-w-6xl px-6">
		<p
			class="text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fog"
			style="max-width: 24ch; overflow-wrap: anywhere; min-width: 0"
			use:reveal={{ words: true }}
		>
			Everything worth keeping gets ported to Rust.
		</p>

		<ul class="mt-16 flex flex-wrap gap-x-8 gap-y-3">
			{#each channels as channel, i (channel.label)}
				<li use:reveal={{ delay: i * 60 }}>
					<a
						href={channel.href}
						target={channel.href.startsWith('mailto') ? undefined : '_blank'}
						rel={channel.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
						class="group inline-flex min-h-11 items-baseline gap-2"
					>
						<span
							class="machine text-xs tracking-wider text-dim uppercase transition-colors duration-150 group-hover:text-glow"
							>{channel.label}</span
						>
						<span class="text-sm text-fog transition-colors duration-150 group-hover:text-glow"
							>{channel.value}</span
						>
					</a>
				</li>
			{/each}
		</ul>

		<div
			class="mt-14 flex flex-col justify-between gap-3 border-t border-line/50 pt-6 machine text-xs text-dim sm:flex-row"
			use:reveal
		>
			<p>&copy; 2026 Mahyar</p>
			<p>svelte 5 &middot; tailwind v4 &middot; github pages</p>
			<a href="#top" class="transition-colors duration-150 hover:text-glow">back to top &uarr;</a>
		</div>
	</div>
</footer>
