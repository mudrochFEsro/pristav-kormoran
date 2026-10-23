/**
 * Svelte action for a smooth open/close of a <details> element
 * Animates the height (content fades) with the Web Animations API.
 * Without JS or with reduced motion the native instant toggle is used.
 */

const DURATION = 300;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'; // --ease-out-expo

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @example
 * <details use:smoothDetails>
 *   <summary>Question</summary>
 *   <p>Answer</p>
 * </details>
 */
export function smoothDetails(details: HTMLDetailsElement): { destroy: () => void } {
	const summary = details.querySelector('summary');
	if (!summary) return { destroy: () => {} };

	const content = summary.nextElementSibling as HTMLElement | null;
	let animations: Animation[] = [];

	function cancel() {
		animations.forEach((animation) => animation.cancel());
		animations = [];
		details.style.overflow = '';
	}

	function animate(from: number, to: number, fade: [number, number], onFinish?: () => void) {
		details.style.overflow = 'hidden';
		// fill: forwards holds the end state until onFinish runs, otherwise the full height flashes for a frame on close
		const options: KeyframeAnimationOptions = { duration: DURATION, easing: EASING, fill: 'forwards' };
		const height = details.animate({ height: [`${from}px`, `${to}px`] }, options);
		animations = [height];
		if (content) animations.push(content.animate({ opacity: fade }, options));

		// Rejected when cancelled (clicked again mid-animation), then the new animation takes over
		height.finished
			.then(() => {
				onFinish?.();
				cancel();
			})
			.catch(() => {});
	}

	function handleClick(event: MouseEvent) {
		if (prefersReducedMotion()) return;
		event.preventDefault();

		// Current (possibly mid-animation) height, so a second click reverses smoothly
		const start = details.offsetHeight;
		const closing = details.open && details.dataset.closing === undefined;
		cancel();

		if (closing) {
			// Closed height = summary + the item's borders
			const end = summary!.offsetHeight + details.offsetHeight - details.clientHeight;
			details.dataset.closing = '';
			animate(start, end, [1, 0], () => {
				details.open = false;
				delete details.dataset.closing;
			});
		} else {
			delete details.dataset.closing;
			details.open = true;
			animate(start, details.offsetHeight, [0, 1]);
		}
	}

	summary.addEventListener('click', handleClick);

	return {
		destroy() {
			summary.removeEventListener('click', handleClick);
			cancel();
		}
	};
}
