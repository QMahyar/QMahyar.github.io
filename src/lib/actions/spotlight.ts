/** Cursor-tracking CSS vars for .spot panels — desktop fine-pointer only, no-op elsewhere. */
export function spotlight(node: HTMLElement) {
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return {};

	function move(e: PointerEvent) {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		node.style.setProperty('--my', `${e.clientY - rect.top}px`);
	}

	node.addEventListener('pointermove', move);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
		}
	};
}
