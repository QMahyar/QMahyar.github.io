/** Cursor-tracking CSS vars for .spot panels — desktop fine-pointer only, no-op elsewhere. */
export function spotlight(node: HTMLElement) {
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return {};

	// Bounds cached on scroll/resize; pointermove only writes CSS vars.
	// Position updates are rAF-coalesced so fast mouse movement can't
	// force a style recalc per event.
	let left = 0;
	let top = 0;
	let queued: PointerEvent | null = null;
	let raf = 0;

	function measure() {
		const rect = node.getBoundingClientRect();
		left = rect.left;
		top = rect.top;
	}

	function flush() {
		raf = 0;
		if (!queued) return;
		node.style.setProperty('--mx', `${queued.clientX - left}px`);
		node.style.setProperty('--my', `${queued.clientY - top}px`);
		queued = null;
	}

	function move(e: PointerEvent) {
		queued = e;
		if (!raf) raf = requestAnimationFrame(flush);
	}

	measure();
	node.addEventListener('pointermove', move, { passive: true });
	window.addEventListener('scroll', measure, { passive: true, capture: true });
	window.addEventListener('resize', measure);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			window.removeEventListener('scroll', measure, { capture: true });
			window.removeEventListener('resize', measure);
			cancelAnimationFrame(raf);
		}
	};
}
