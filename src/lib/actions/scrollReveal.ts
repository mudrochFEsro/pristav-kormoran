/**
 * Svelte action for scroll-based reveal animations
 * Uses IntersectionObserver to trigger animations when elements enter viewport
 */

export type ScrollRevealVariant = 'fade' | 'scale' | 'slide-left' | 'slide-right';

export interface ScrollRevealOptions {
	/** Animation variant - default: 'fade' */
	variant?: ScrollRevealVariant;
	/** Delay before animation starts (ms) - useful for staggered animations */
	delay?: number;
	/** Viewport threshold (0-1) - default: 0.1 */
	threshold?: number;
	/** Only animate once - default: true */
	once?: boolean;
}

const variantClassMap: Record<ScrollRevealVariant, string> = {
	fade: 'scroll-fade',
	scale: 'scroll-scale',
	'slide-left': 'scroll-slide-left',
	'slide-right': 'scroll-slide-right'
};

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll reveal action for Svelte components
 *
 * @example
 * <div use:scrollReveal={{ variant: 'fade', delay: 100 }}>
 *   Content that fades in on scroll
 * </div>
 */
export function scrollReveal(
	node: HTMLElement,
	options: ScrollRevealOptions = {}
): { destroy: () => void; update: (newOptions: ScrollRevealOptions) => void } {
	const {
		variant = 'fade',
		delay = 0,
		threshold = 0.1,
		once = true
	} = options;

	// Respect reduced motion preference
	if (prefersReducedMotion()) {
		return {
			destroy: () => {},
			update: () => {}
		};
	}

	// Add base animation classes
	node.classList.add('scroll-animate', variantClassMap[variant]);

	let observer: IntersectionObserver | null = null;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	function handleIntersect(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Trigger animation with optional delay
				if (delay > 0) {
					timeoutId = setTimeout(() => {
						node.classList.add('animate-in');
					}, delay);
				} else {
					node.classList.add('animate-in');
				}

				// Stop observing if only animating once
				if (once && observer) {
					observer.unobserve(node);
				}
			} else if (!once) {
				// Reset animation when leaving viewport (if not once-only)
				if (timeoutId) {
					clearTimeout(timeoutId);
					timeoutId = null;
				}
				node.classList.remove('animate-in');
			}
		});
	}

	// Create and start observer
	observer = new IntersectionObserver(handleIntersect, {
		threshold,
		rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
	});

	observer.observe(node);

	return {
		destroy() {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			if (observer) {
				observer.disconnect();
			}
		},
		update(newOptions: ScrollRevealOptions) {
			// Remove old variant class
			node.classList.remove(variantClassMap[variant]);

			// Add new variant class
			const newVariant = newOptions.variant ?? 'fade';
			node.classList.add(variantClassMap[newVariant]);
		}
	};
}
