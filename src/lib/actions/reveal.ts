interface RevealOptions {
	delay?: number;
	/** Split the element's text into word spans and stagger them via --wd. */
	words?: boolean;
}

/** Wrap every word of a text-only node in an inline-block span with a stagger index. */
function splitWords(node: HTMLElement): HTMLElement[] {
	const spans: HTMLElement[] = [];
	const walk = (el: Node) => {
		for (const child of [...el.childNodes]) {
			if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
				const frag = document.createDocumentFragment();
				for (const part of child.textContent.split(/(\s+)/)) {
					if (!part) continue;
					if (/^\s+$/.test(part)) {
						frag.appendChild(document.createTextNode(' '));
						continue;
					}
					const span = document.createElement('span');
					span.className = 'rw';
					span.style.setProperty('--wd', String(spans.length));
					span.textContent = part;
					spans.push(span);
					frag.appendChild(span);
				}
				child.replaceWith(frag);
			}
		}
	};
	walk(node);
	return spans;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduced || !('IntersectionObserver' in window)) {
		node.classList.add(reduced || options.words ? 'no-io' : 'is-visible');
		if (options.words && reduced) splitWords(node);
		return {};
	}

	if (options.words) {
		node.setAttribute('data-words', '');
		splitWords(node);
	} else {
		node.classList.add('reveal');
	}

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
