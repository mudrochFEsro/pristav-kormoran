<script lang="ts">
	import '$lib/styles/global.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Zoom clipping - prevent infinite browser zoom that breaks vw/vh layouts
	$effect(() => {
		if (typeof window === 'undefined') return;

		// Zoom limits (80% - 150%)
		const MIN_ZOOM = 0.8;
		const MAX_ZOOM = 1.5;

		// Get browser zoom level using devicePixelRatio comparison
		function getZoomLevel(): number {
			// Use screen width vs inner width ratio as approximation
			// devicePixelRatio changes with zoom on most browsers
			const baseRatio = window.screen.availWidth / window.innerWidth;
			// Normalize - on 100% zoom this should be ~1 (accounting for scrollbar)
			return Math.round(baseRatio * 100) / 100;
		}

		function handleWheel(e: WheelEvent) {
			// Only handle Ctrl+scroll (browser zoom gesture)
			if (!e.ctrlKey) return;

			const currentZoom = getZoomLevel();

			// deltaY < 0 = scroll up = zoom in
			// deltaY > 0 = scroll down = zoom out
			const zoomingIn = e.deltaY < 0;
			const zoomingOut = e.deltaY > 0;

			// Block zoom if at limits
			if ((zoomingIn && currentZoom >= MAX_ZOOM) || (zoomingOut && currentZoom <= MIN_ZOOM)) {
				e.preventDefault();
			}
		}

		// Also handle Ctrl+plus/minus keyboard zoom
		function handleKeydown(e: KeyboardEvent) {
			if (!e.ctrlKey) return;

			const currentZoom = getZoomLevel();
			const isZoomIn = e.key === '+' || e.key === '=' || e.key === 'NumpadAdd';
			const isZoomOut = e.key === '-' || e.key === '_' || e.key === 'NumpadSubtract';

			if ((isZoomIn && currentZoom >= MAX_ZOOM) || (isZoomOut && currentZoom <= MIN_ZOOM)) {
				e.preventDefault();
			}
		}

		document.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('wheel', handleWheel);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{@render children()}
