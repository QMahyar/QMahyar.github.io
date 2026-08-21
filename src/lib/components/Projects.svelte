<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import SectionHeading from './SectionHeading.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { featured, moreProjects, langColor, profile } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	const [head, ...rest] = featured;
</script>

<section id="projects" class="relative scroll-mt-20 py-28 md:py-36">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			index="01"
			label="selected work"
			title="Built in the open."
			blurb="A few things worth your attention — the full catalogue lives on GitHub."
		/>

		<!-- Lead project with scanner motif -->
		<div use:reveal class="mb-5">
			<article
				class="glass relative overflow-hidden transition-colors duration-300 hover:border-glow/30"
			>
				<div
					class="pointer-events-none absolute inset-0 opacity-60"
					style="background: radial-gradient(30rem 18rem at 85% 20%, rgba(47,168,238,0.10), transparent 65%);"
					aria-hidden="true"
				></div>
				<div class="relative flex flex-col gap-8 p-7 md:flex-row md:items-center md:p-12">
					<div class="flex-1">
						<p class="font-mono text-xs tracking-[0.28em] text-glow uppercase">flagship</p>
						<h3 class="mt-4 text-3xl font-bold tracking-tight text-fog md:text-4xl">
							<a href={head.url} target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-glow">
								{head.name}
							</a>
						</h3>
						<p class="mt-5 max-w-lg leading-relaxed text-mist">{head.description}</p>
						<div class="mt-7 flex flex-wrap items-center gap-2.5">
							{#each head.tags as tag (tag)}
								<span class="chip">{tag}</span>
							{/each}
						</div>
						<p class="mt-7 inline-flex items-center gap-2 font-mono text-sm text-dim">
							<span>{head.lang}</span>
							{#if typeof head.stars === 'number'}
								<span aria-hidden="true">·</span><span>{head.stars} stars</span>
							{/if}
							<span aria-hidden="true">·</span>
							<a
								href={head.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 text-glow transition-colors hover:text-fog"
							>
								view repo <ArrowRight size={15} aria-hidden="true" />
							</a>
						</p>
					</div>

					<!-- decorative radar -->
					<div
						class="relative mx-auto aspect-square w-48 shrink-0 md:w-64 lg:w-72"
						aria-hidden="true"
					>
						<div class="absolute inset-0 rounded-full border border-beam/25"></div>
						<div class="absolute inset-[18%] rounded-full border border-beam/20"></div>
						<div class="absolute inset-[36%] rounded-full border border-beam/15"></div>
						<div class="absolute top-1/2 left-0 h-px w-full bg-beam/10"></div>
						<div class="absolute top-0 left-1/2 h-full w-px bg-beam/10"></div>
						<div
							class="animate-sweep absolute inset-0 rounded-full"
							style="background: conic-gradient(from 0deg, rgba(121,234,234,0.35), transparent 22%);"
						></div>
						<span
							class="animate-blip absolute top-[24%] left-[62%] size-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(121,234,234,0.9)]"
						></span>
						<span
							class="animate-blip absolute top-[58%] left-[38%] size-1 rounded-full bg-glow shadow-[0_0_10px_rgba(121,234,234,0.9)]"
							style="animation-delay: 1.2s"></span>
						<span
							class="animate-blip absolute top-[70%] left-[66%] size-1 rounded-full bg-glow shadow-[0_0_10px_rgba(121,234,234,0.9)]"
							style="animation-delay: 2.1s"></span>
					</div>
				</div>
			</article>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			{#each rest as project, i (project.name)}
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
				→ everything else:
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
