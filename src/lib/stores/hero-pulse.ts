import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

/** Shared reference to the hero period element so the canvas can target it. */
export const heroPulse: Writable<HTMLElement | null> = writable(null);

function current(): HTMLElement | null {
	return get(heroPulse);
}

export function flashHeroPeriod(): void {
	const el = current();
	if (!el) return;
	el.classList.remove('period-flash');
	void el.offsetWidth;
	el.classList.add('period-flash');
}

export function heroPeriodCenter(): { x: number; y: number } | null {
	const el = current();
	if (!el) return null;
	const rect = el.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0) return null;
	return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
