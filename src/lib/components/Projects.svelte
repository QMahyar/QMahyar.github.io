<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import ProjectCard from './ProjectCard.svelte';
	import { flagships, projects, moreProjects, profile } from '$lib/data/site';
</script>

<section id="projects" class="relative scroll-mt-20 py-28 md:py-36">
	<div class="mx-auto max-w-6xl px-6">
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
						<dl class="divide-y divide-line/60">
							{#each project.spec as row (row.key)}
								<div class="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
									<dt class="machine text-[13px] text-dim">{row.key}</dt>
									<dd class="machine text-[13px] text-fog sm:text-right">{row.value}</dd>
								</div>
							{/each}
						</dl>
					</div>
				</article>
			{/each}
		</div>

		<!-- Ledger — the smaller repos as an index -->
		<div class="mt-28 md:mt-36">
			<div class="grid gap-x-10 gap-y-5 sm:grid-cols-2">
				{#each projects as project, i (project.name)}
					<ProjectCard {project} delay={i * 45} />
				{/each}
			</div>

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
