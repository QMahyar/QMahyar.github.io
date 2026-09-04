interface RevealOptions {
	delay?: number;
	/** Split the element's text into word spans and stagger them via --wd. */
	words?: boolean;
}

/** Wrap every word of the node in an inline-block span with a stagger index.
 *  Recurses so <span class="text-warm">Rust</span> inside the statement splits too. */
function splitWords(node: HTMLElement): HTMLElement[] {
	const spans: HTMLElement[] = [];
	const walk = (el: Node): void => {
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
			} else if (child.nodeType === Node.ELEMENT_NODE) {
				walk(child);
			}
		}
	};
	walk(node);
	return spans;
}

let sharedObserver: IntersectionObserver | null = null;

/** Lazily-created singleton observer; callbacks disconnect per-node on reveal. */
function getSharedObserver(): IntersectionObserver {
	if (!sharedObserver) {
		sharedObserver = new IntersectionObserver(
			(entries, observer) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
		);
	}
	return sharedObserver;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (options.words) {
		node.setAttribute('data-words', '');
		splitWords(node);
	} else {
		node.classList.add('reveal');
	}

	if (reduced || !('IntersectionObserver' in window)) {
		// Words mode: .no-io reveals .rw children via CSS; plain mode: .is-visible reveals .reveal.
		node.classList.add(options.words ? 'no-io' : 'is-visible');
		return {};
	}

	if (options.delay) {
		node.style.transitionDelay = `${options.delay}ms`;
	}

	// One shared observer across all reveal instances — dozens of
	// use:reveal nodes must not each cost an IntersectionObserver.
	const io = getSharedObserver();
	io.observe(node);

	return {
		destroy() {
			io.unobserve(node);
		}
	};
}
