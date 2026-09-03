import { teleCliPage } from './tele-cli';
import { cfScannerPage } from './cf-scanner';

export const projectPages = [teleCliPage, cfScannerPage];

export const fullSlugs = ['tele-cli', 'cf-scanner'] as const;

export function prevNext(slug: string) {
	const i = projectPages.findIndex((p) => p.slug === slug);
	if (i < 0) return { prev: null, next: null };
	return {
		prev: i > 0 ? projectPages[i - 1] : null,
		next: i < projectPages.length - 1 ? projectPages[i + 1] : null
	};
}

export * from './types';
