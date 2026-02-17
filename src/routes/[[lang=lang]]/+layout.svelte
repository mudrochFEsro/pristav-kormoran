<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Header from '$lib/components/layout/Header.svelte';
	import MainNav from '$lib/components/layout/MainNav.svelte';
	import MobileMenu from '$lib/components/layout/MobileMenu.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import WeatherWidget from '$lib/components/header/WeatherWidget.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	// Zoom limiter - prevent extreme zoom levels that break vw/vh layouts
	const MIN_ZOOM = 0.5; // 50%
	const MAX_ZOOM = 2.0; // 200%

	$effect(() => {
		if (!browser) return;

		function handleWheel(e: WheelEvent) {
			// Only handle Ctrl+wheel (zoom gesture)
			if (!e.ctrlKey) return;

			// Get current zoom level from visual viewport or fallback
			const currentZoom = window.visualViewport?.scale ?? 1;

			// Block zoom if at limits
			if ((e.deltaY < 0 && currentZoom >= MAX_ZOOM) || (e.deltaY > 0 && currentZoom <= MIN_ZOOM)) {
				e.preventDefault();
			}
		}

		// Use passive: false to allow preventDefault
		window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleWheel);
		};
	});

	// Mobile menu state - managed at layout level to render outside view-transition wrappers
	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Helper to get path without language prefix
	function getPathWithoutLang(pathname: string): string {
		const langPrefixes = ['/en/', '/ru/', '/en', '/ru'];
		for (const prefix of langPrefixes) {
			if (pathname.startsWith(prefix)) {
				return pathname.slice(prefix.length - (prefix.endsWith('/') ? 1 : 0)) || '/';
			}
		}
		return pathname;
	}

	// Scroll to absolute top after every navigation (except language changes)
	afterNavigate((navigation) => {
		// Close mobile menu on navigation
		isMobileMenuOpen = false;

		// Skip hash links (anchor navigation)
		if (navigation.to?.url.hash) return;

		// Skip scroll for language changes (same page, different language)
		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;
		if (fromPath && toPath) {
			const fromWithoutLang = getPathWithoutLang(fromPath);
			const toWithoutLang = getPathWithoutLang(toPath);
			if (fromWithoutLang === toWithoutLang) {
				// Language change only - don't scroll
				return;
			}
		}

		// Force scroll to absolute top using multiple methods for reliability
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		window.scrollTo(0, 0);
	});

	// Use View Transitions API for smooth content transitions only
	onNavigate((navigation) => {
		if (!browser) return;

		// Skip if navigating to the same route
		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;
		if (fromPath === toPath) return;

		// Check if View Transitions API is supported
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- Mobile menu rendered outside view-transition wrappers for position: fixed to work -->
<MobileMenu lang={data.lang} isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

<a href="#main-content" class="skip-link">
	{data.lang === 'sk' ? 'Preskočiť na obsah' : data.lang === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
</a>
<div class="site-wrapper">
	<!-- Weather widget - not sticky -->
	<div class="layout-weather">
		<WeatherWidget lang={data.lang} />
	</div>
	<!-- Sticky header + nav -->
	<div class="layout-sticky">
		<Header lang={data.lang} />
		<MainNav lang={data.lang} {isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
	</div>
	<main id="main-content" class="main-content" tabindex="-1">
		<div class="container page-content">
			{@render children()}
		</div>
	</main>
	<div class="layout-footer">
		<Footer lang={data.lang} />
	</div>
</div>

<style>
	/* Skip link for keyboard accessibility */
	.skip-link {
		position: absolute;
		top: -100%;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-primary);
		color: var(--color-white);
		padding: var(--space-3) var(--space-5);
		border-radius: var(--radius-md);
		font-weight: 500;
		text-decoration: none;
		z-index: 1000;
		transition: top 0.2s ease;
	}

	.skip-link:focus {
		top: var(--space-3);
		outline: 2px solid var(--color-white);
		outline-offset: 2px;
	}

	.site-wrapper {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex: 1;
		background: var(--color-white);
	}

	.container {
		max-width: var(--container-max-width);
		margin: 0 auto;
		padding: var(--space-6) var(--container-padding) 0;
		background: var(--color-white);
	}

	/* Weather widget - not sticky */
	.layout-weather {
		view-transition-name: layout-weather;
	}

	/* Sticky header + nav combined */
	.layout-sticky {
		view-transition-name: layout-sticky;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.layout-footer {
		view-transition-name: layout-footer;
	}

	.page-content {
		view-transition-name: page-content;
	}

	@media (max-width: 768px) {
		.container {
			padding: var(--space-5) var(--space-4) 0;
		}
	}
</style>
