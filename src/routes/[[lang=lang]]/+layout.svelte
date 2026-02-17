<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { t, getNavRoutes, type NavRoutes } from '$lib/i18n';
	import { FloatingNav, GridBackground } from '$lib/components/ui';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	const translations = $derived(t(data.lang));
	const routes = $derived(getNavRoutes(data.lang) as NavRoutes);

	// Build nav items for FloatingNav
	const navItems = $derived([
		{ name: translations.nav.home, link: routes.home },
		{ name: translations.nav.ports, link: routes.ports },
		{ name: translations.nav.boatTrips, link: routes.boatTrips },
		{ name: translations.nav.botel, link: routes.botel },
		{ name: translations.nav.about, link: routes.about },
		{ name: translations.nav.contact, link: routes.contact }
	]);

	// Language options for mobile menu
	const languageOptions = $derived([
		{ code: 'sk', label: 'SK', href: '/', active: data.lang === 'sk' },
		{ code: 'en', label: 'EN', href: '/en/', active: data.lang === 'en' },
		{ code: 'ru', label: 'RU', href: '/ru/', active: data.lang === 'ru' }
	]);

	// Zoom limiter
	const MIN_ZOOM = 0.5;
	const MAX_ZOOM = 2.0;

	$effect(() => {
		if (!browser) return;

		let isCtrlPressed = false;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Control') isCtrlPressed = true;
		}

		function handleKeyUp(e: KeyboardEvent) {
			if (e.key === 'Control') isCtrlPressed = false;
		}

		function handleWheel(e: WheelEvent) {
			if (!isCtrlPressed && !e.ctrlKey) return;
			const currentZoom = window.visualViewport?.scale ?? 1;
			if ((e.deltaY < 0 && currentZoom >= MAX_ZOOM) || (e.deltaY > 0 && currentZoom <= MIN_ZOOM)) {
				e.preventDefault();
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: true });
		window.addEventListener('keyup', handleKeyUp, { passive: true });
		window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('wheel', handleWheel);
		};
	});

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

	// Scroll to top after navigation
	afterNavigate((navigation) => {
		if (navigation.to?.url.hash) return;

		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;
		if (fromPath && toPath) {
			const fromWithoutLang = getPathWithoutLang(fromPath);
			const toWithoutLang = getPathWithoutLang(toPath);
			if (fromWithoutLang === toWithoutLang) return;
		}

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		window.scrollTo(0, 0);
	});

	// View Transitions API
	onNavigate((navigation) => {
		if (!browser) return;
		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;
		if (fromPath === toPath) return;

		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app-wrapper">
	<!-- Floating Navigation - Light Theme -->
	<FloatingNav {navItems} languages={languageOptions} className="border-gray-200/50 bg-white/80 shadow-lg">
		{#snippet logo()}
			<a href={routes.home} class="flex items-center">
				<span class="text-lg font-bold text-orange-500">Kormorán</span>
			</a>
		{/snippet}
	</FloatingNav>

	<!-- Language Selector - Fixed position, hidden on mobile (will show in mobile menu) -->
	<div class="fixed right-4 top-5 z-40 hidden gap-1 md:flex md:gap-2">
		<a
			href="/"
			class="rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:border-orange-400 hover:text-orange-500 md:px-3 md:py-1"
			class:active={data.lang === 'sk'}
		>
			SK
		</a>
		<a
			href="/en/"
			class="rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:border-orange-400 hover:text-orange-500 md:px-3 md:py-1"
			class:active={data.lang === 'en'}
		>
			EN
		</a>
		<a
			href="/ru/"
			class="rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:border-orange-400 hover:text-orange-500 md:px-3 md:py-1"
			class:active={data.lang === 'ru'}
		>
			RU
		</a>
	</div>

	<!-- Skip Link -->
	<a href="#main-content" class="skip-link">
		{data.lang === 'sk' ? 'Preskočiť na obsah' : data.lang === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
	</a>

	<!-- Main Content -->
	<main
		id="main-content"
		class="min-h-screen bg-white"
		tabindex="-1"
		aria-label={data.lang === 'sk' ? 'Hlavný obsah' : data.lang === 'ru' ? 'Основное содержимое' : 'Main content'}
	>
		{@render children()}
	</main>

	<!-- Footer -->
	<Footer lang={data.lang} />
</div>

<style>
	.app-wrapper {
		min-height: 100vh;
		background: #ffffff;
	}

	.skip-link {
		position: absolute;
		top: -100%;
		left: 50%;
		transform: translateX(-50%);
		background: #f60;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		font-weight: 500;
		text-decoration: none;
		z-index: 1000;
		transition: top 0.2s ease;
	}

	.skip-link:focus {
		top: 1rem;
		outline: 2px solid #f60;
		outline-offset: 2px;
	}

	.active {
		color: #f60 !important;
		border-color: #f60 !important;
		background: rgba(255, 102, 0, 0.05) !important;
	}
</style>
