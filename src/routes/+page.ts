export const prerender = true;

import { flagships as fallbackFlagships, projects as fallbackProjects, moreProjects as fallbackMore, stats as fallbackStats } from '$lib/data/site';

interface GhRepo {
	name: string;
	stargazers_count: number;
	pushed_at: string;
	archived: boolean;
}

function fmtUpdated(iso: string): string {
	try {
		return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(iso));
	} catch {
		return iso.slice(0, 7);
	}
}

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	try {
		const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
		const token =
			// @ts-ignore — available only during prerender/server
			(typeof process !== 'undefined' ? (process as unknown as { env?: Record<string, string> }).env?.GITHUB_TOKEN : undefined) ??
			// Vite-exposed (if workflow sets VITE_GITHUB_TOKEN)
			(import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GITHUB_TOKEN;

		if (token) headers.Authorization = `Bearer ${token}`;

		const res = await fetch('https://api.github.com/users/QMahyar/repos?per_page=100&sort=updated', { headers });
		if (!res.ok) throw new Error(`GitHub ${res.status}`);
		const repos: GhRepo[] = await res.json();
		const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

		const enrich = <T extends { name: string }>(list: T[]): T[] =>
			list.map((p) => {
				const gh = byName.get(p.name.toLowerCase());
				if (!gh) return p;
				return {
					...p,
					stars: gh.stargazers_count,
					updated: fmtUpdated(gh.pushed_at),
					archived: gh.archived || (p as unknown as { archived?: boolean }).archived
				};
			});

		const flagships = enrich(fallbackFlagships as unknown as { name: string }[]) as typeof fallbackFlagships;
		const projects = enrich(fallbackProjects as unknown as { name: string }[]) as typeof fallbackProjects;
		const moreProjects = enrich(fallbackMore as unknown as { name: string }[]) as typeof fallbackMore;

		const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
		const publicRepos = repos.length;
		const stats = [
			{ value: String(publicRepos), label: 'public repos' },
			{ value: String(totalStars), label: 'stars earned' },
			{ value: String(new Date().getFullYear()), label: 'still shipping' }
		] as const;

		return { flagships, projects, moreProjects, stats, githubLive: true };
	} catch {
		return {
			flagships: fallbackFlagships,
			projects: fallbackProjects,
			moreProjects: fallbackMore,
			stats: fallbackStats,
			githubLive: false
		};
	}
}
