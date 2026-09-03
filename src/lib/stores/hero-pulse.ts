import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

/** Shared reference to the hero period element so the canvas can target it. */
export const heroPulse: Writable<HTMLElement | null> = writable(null);

let current: HTMLElement | null = null;
heroPulse.subscribe((el) => { current = el; });

export function flashHeroPeriod(): void {
	if (!current) return;
	current.classList.remove('period-flash');
	void current.offsetWidth;
	current.classList.add('period-flash');
}

export function heroPeriodCenter(): { x: number; y: number } | null {
	if (!current) return null;
	const rect = current.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0) return null;
	return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
