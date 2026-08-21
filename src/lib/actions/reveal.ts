interface RevealOptions {
	delay?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduced || !('IntersectionObserver' in window)) {
		node.classList.add('is-visible');
		return {};
	}

	node.classList.add('reveal');
	if (options.delay) {
		node.style.transitionDelay = `${options.delay}ms`;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
	);

	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
