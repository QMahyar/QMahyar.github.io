<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import ProjectCard from './ProjectCard.svelte';
	import { tick } from 'svelte';
	import type { Flagship, Project } from '$lib/data/site';
	import {
		flagships as fallbackFlagships,
		projects as fallbackProjects,
		moreProjects as fallbackMore,
		profile
	} from '$lib/data/site';

	let {
		flagships = fallbackFlagships as Flagship[],
		projects = fallbackProjects as Project[],
		moreProjects = fallbackMore as Project[]
	}: {
		flagships?: Flagship[];
		projects?: Project[];
		moreProjects?: Project[];
	} = $props();

	let copiedKey = $state<string | null>(null);

	async function copySpec(projectName: string, key: string, value: string) {
		try {
			await navigator.clipboard.writeText(`${key}: ${value}`);
			copiedKey = `${projectName}:${key}`;
			await tick();
			setTimeout(() => { copiedKey = null; }, 1400);
		} catch {
			// Clipboard API unavailable — silently ignore
		}
	}

	function isCopied(projectName: string, key: string): boolean {
		return copiedKey === `${projectName}:${key}`;
	}
</script>

<section id="projects" class="relative scroll-mt-20 py-28 md:py-36">
	<div class="mx-auto max-w-6xl px-6">
		<h2 class="sr-only">Projects</h2>
		<!-- Split Studio diptychs — text and proof alternate direction -->
		<div class="flex flex-col gap-24 md:gap-32">
			{#each flagships as project, i (project.name)}
				{@const flip = i % 2 === 1}
				<article
					class="grid min-w-0 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
				>
					<div class="min-w-0 {flip ? 'md:order-2' : ''}" use:reveal={{ delay: flip ? 90 : 0 }} data-variant="diptych">
						<p class="machine text-xs tracking-[0.08em] text-dim uppercase">
							flagship &middot; rust &middot; {project.updated}
						</p>
						<h3 class="mt-3 text-3xl tracking-tight md:text-4xl">
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								class="transition-colors duration-150 hover:text-glow"
							>
								{project.name}
							</a>
						</h3>
						<p class="mt-5 max-w-md leading-relaxed">{project.description}</p>
						<p class="mt-7">
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								class="link-arrow machine text-sm"
							>
								view repo <span class="arr arr-ne" aria-hidden="true">&nearr;</span>
							</a>
						</p>
					</div>

					<div
						class="surface spot min-w-0 p-6 md:p-8 {flip ? 'md:order-1' : ''}"
						use:reveal={{ delay: flip ? 0 : 90 }}
						use:spotlight
						data-variant="diptych"
					>
						<p class="term-label">{project.name} &middot; spec</p>
							<ul class="divide-y divide-line/60">
								{#each project.spec as row (row.key)}
									{@const copied = isCopied(project.name, row.key)}
									<li class="first:[&>button]:pt-0 last:[&>button]:pb-0">
									<button
										type="button"
										class="spec-row flex w-full cursor-pointer flex-col gap-1 py-2.5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 {copied ? 'spec-copied' : ''}"
										onclick={() => copySpec(project.name, row.key, row.value)}
										title="Click to copy {row.key}: {row.value}"
										aria-label="Copy {row.key}: {row.value}"
									>
										<span class="machine text-[13px] text-dim">{row.key}</span>
										<span class="machine text-[13px] text-fog sm:text-right">
											{row.value}
											{#if copied}
												<span class="ml-2 inline-block text-warm text-[11px]" aria-hidden="true">✓ copied</span>
												<span class="sr-only">(copied to clipboard)</span>
											{/if}
										</span>
									</button>
									</li>
								{/each}
							</ul>
					</div>
				</article>
			{/each}
		</div>

		<!-- Ledger — the smaller repos as an index -->
		<div class="mt-28 md:mt-36">
			<ul class="grid gap-x-10 gap-y-5 sm:grid-cols-2">
				{#each projects as project, i (project.name)}
					<ProjectCard {project} delay={i * 45} />
				{/each}
			</ul>

			<ul class="mt-20 divide-y divide-line/50 border-t border-line/50">
				{#each moreProjects as project, i (project.name)}
					<ProjectCard {project} compact delay={i * 45} />
				{/each}
			</ul>

			<p class="mt-10 machine text-sm text-dim" use:reveal>
				&rarr; everything else:
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					class="text-mist underline decoration-line underline-offset-4 transition-colors duration-150 hover:text-glow"
					>github.com/QMahyar</a
				>
			</p>
		</div>
	</div>
</section>
