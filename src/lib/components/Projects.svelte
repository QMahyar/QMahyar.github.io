<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import SectionHeading from './SectionHeading.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { flagships, projects, moreProjects, langColor, profile } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="projects" class="relative scroll-mt-20 py-28 md:py-36">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			index="01"
			label="selected work"
			title="Built in the open."
			blurb="Two flagships carry the flag — both Rust, both alive. The full catalogue lives on GitHub."
		/>

		<!-- Flagship pair -->
		<div class="grid gap-5 lg:grid-cols-2">
			{#each flagships as project, i (project.name)}
				<div use:reveal={{ delay: i * 90 }} class="h-full">
					<article
						class="glass group relative h-full overflow-hidden transition-colors duration-300 hover:border-glow/30"
					>
						<div
							class="pointer-events-none absolute inset-0 opacity-70"
							style="background: radial-gradient(26rem 16rem at 85% 0%, rgba(47,168,238,0.10), transparent 65%);"
							aria-hidden="true"
						></div>

						<!-- corner radar -->
						<div
							class="pointer-events-none absolute -top-8 -right-8 size-36 opacity-60"
							aria-hidden="true"
						>
							<div class="absolute inset-[12%] rounded-full border border-beam/25"></div>
							<div class="absolute inset-[32%] rounded-full border border-beam/15"></div>
							<div
								class="animate-sweep absolute inset-[12%] rounded-full"
								style="background: conic-gradient(from 0deg, rgba(121,234,234,0.25), transparent 22%);"
							></div>
							<span
								class="animate-blip absolute top-[38%] left-[58%] size-1 rounded-full bg-glow shadow-[0_0_10px_rgba(121,234,234,0.9)]"
								style="animation-delay: {i * 1.3}s"></span>
						</div>

						<div class="relative flex h-full flex-col p-7 md:p-10">
							<p class="font-mono text-[11px] tracking-[0.28em] text-glow uppercase">
								flagship &middot; rust
							</p>
							<h3 class="mt-3 text-3xl font-bold tracking-tight text-fog md:text-4xl">
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-colors hover:text-glow"
								>
									{project.name}
								</a>
							</h3>
							<p class="mt-4 max-w-md leading-relaxed text-mist">{project.description}</p>

							<div class="mt-6 flex flex-wrap items-center gap-2.5">
								{#each project.tags as tag (tag)}
									<span class="chip">{tag}</span>
								{/each}
							</div>

							<p
								class="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-sm text-dim"
							>
								<span>{project.lang}</span>
								{#if typeof project.stars === 'number'}
									<span aria-hidden="true">&middot;</span><span>{project.stars} stars</span>
								{/if}
								<span aria-hidden="true">&middot;</span>
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 text-glow transition-colors hover:text-fog"
								>
									view repo <ArrowRight size={15} aria-hidden="true" />
								</a>
							</p>
						</div>
					</article>
				</div>
			{/each}
		</div>

		<div class="mt-5 grid gap-5 sm:grid-cols-2">
			{#each projects as project, i (project.name)}
				<div use:reveal={{ delay: (i % 2) * 80 }}>
					<ProjectCard {project} featured />
				</div>
			{/each}
		</div>

		<div use:reveal class="mt-16">
			<p class="mb-2 font-mono text-xs tracking-[0.28em] text-dim uppercase">// also on github</p>
			<ul class="divide-y divide-white/5">
				{#each moreProjects as project (project.name)}
					<li>
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group flex items-baseline gap-4 py-4 transition-colors"
						>
							<span class="min-w-32 font-medium text-fog transition-colors group-hover:text-glow md:min-w-44">
								{project.name}
								{#if project.archived}
									<span
										class="ml-2 rounded border border-white/10 px-1.5 py-0.5 align-middle font-mono text-[9px] tracking-wider text-dim uppercase"
										>archived</span
									>
								{/if}
							</span>
							<span class="hidden flex-1 truncate text-sm text-dim sm:block">
								{project.description}
							</span>
							<span class="ml-auto inline-flex shrink-0 items-center gap-2 font-mono text-xs text-dim">
								<span
									class="size-2 rounded-full"
									style="background-color: {langColor[project.lang] ?? langColor.Other}"
									aria-hidden="true"></span>
								{project.lang}
							</span>
							<ArrowRight
								size={14}
								class="shrink-0 text-dim opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-glow group-hover:opacity-100"
								aria-hidden="true"
							/>
						</a>
					</li>
				{/each}
			</ul>
			<p class="mt-8 font-mono text-sm text-dim">
				&rarr; everything else:
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					class="text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-glow"
					>github.com/QMahyar</a
				>
			</p>
		</div>
	</div>
</section>
