import { env } from '$env/dynamic/private';
import {
	flagships as fallbackFlagships,
	projects as fallbackProjects,
	moreProjects as fallbackMore,
	type Flagship,
	type Project
} from '$lib/data/site';

interface GhRepo {
	name: string;
	stargazers_count: number;
	pushed_at: string;
	archived: boolean;
}

function fmtUpdated(iso: string): string {
	try {
		return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(
			new Date(iso)
		);
	} catch {
		return iso.slice(0, 7);
	}
}

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	const withLive = (repos: GhRepo[]) => {
		const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
		const merge = <T extends Flagship | Project>(list: readonly T[]): T[] =>
			list.map((p) => {
				const gh = byName.get(p.name.toLowerCase());
				if (!gh) return p;
				return {
					...p,
					stars: gh.stargazers_count,
					updated: fmtUpdated(gh.pushed_at),
					archived: gh.archived || p.archived
				};
			});

		return {
			flagships: merge(fallbackFlagships),
			projects: merge(fallbackProjects),
			moreProjects: merge(fallbackMore),
			githubLive: true as const
		};
	};

	try {
		// Server-only env: this load runs at prerender time, so the token never reaches the client bundle.
		const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
		if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;

		const res = await fetch(
			'https://api.github.com/users/QMahyar/repos?per_page=100&sort=updated',
			{ headers }
		);
		if (!res.ok) throw new Error(`GitHub ${res.status}`);
		return withLive((await res.json()) as GhRepo[]);
	} catch {
		return {
			flagships: fallbackFlagships,
			projects: fallbackProjects,
			moreProjects: fallbackMore,
			githubLive: false as const
		};
	}
}
