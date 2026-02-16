<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';
	import MobileMenu from './MobileMenu.svelte';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));
	const currentPath = $derived($page.url.pathname);

	// Scroll state for glassmorphism effect
	let isScrolled = $state(false);
	// Mobile menu state
	let isMobileMenuOpen = $state(false);

	$effect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					isScrolled = window.scrollY > 50;
					ticking = false;
				});
				ticking = true;
			}
		};

		// Check initial scroll position
		isScrolled = window.scrollY > 50;

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Memoized path normalization
	function normalizePath(path: string): string {
		return path.endsWith('/') ? path.slice(0, -1) : path;
	}

	const normalizedCurrentPath = $derived(normalizePath(currentPath));

	function isActive(route: string): boolean {
		return normalizePath(route) === normalizedCurrentPath;
	}

	// Boat trips label with line break - avoids @html
	const boatTripsLabel = $derived(
		lang === 'sk' ? ['Výlety', 'loďou'] : lang === 'ru' ? ['Прогулки', 'на лодке'] : ['Boat', 'trips']
	);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<nav class="nav" class:nav--scrolled={isScrolled} aria-label="Main navigation">
	<div class="nav__container">
		<!-- Mobile toggle -->
		<button
			class="nav__toggle"
			class:nav__toggle--active={isMobileMenuOpen}
			aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isMobileMenuOpen}
			onclick={toggleMobileMenu}
		>
			<span></span>
		</button>

		<!-- Logo - first on left -->
		<a href={resolve(routes.home)} class="nav__logo" aria-label="Homepage">
			<img src="/images/logo-pristav.svg" alt="Prístav Kormorán" width="90" height="90" />
		</a>

		<!-- Navigation items -->
		<div class="nav__group">
			<a href={resolve(routes.about)} class="nav__link" class:nav__link--active={isActive(routes.about)} aria-current={isActive(routes.about) ? 'page' : undefined}>
				<span class="nav__icon icon-wheel" aria-hidden="true"></span>
				<span class="nav__label">{translations.nav.about}</span>
			</a>
			<a href={resolve(routes.news)} class="nav__link" class:nav__link--active={isActive(routes.news)} aria-current={isActive(routes.news) ? 'page' : undefined}>
				<span class="nav__icon icon-sailor" aria-hidden="true"></span>
				<span class="nav__label">{translations.nav.news}</span>
			</a>
			<a href={resolve(routes.region)} class="nav__link" class:nav__link--active={isActive(routes.region)} aria-current={isActive(routes.region) ? 'page' : undefined}>
				<span class="nav__icon icon-earth" aria-hidden="true"></span>
				<span class="nav__label">{translations.nav.region}</span>
			</a>
			<a href={resolve(routes.ports)} class="nav__link" class:nav__link--active={isActive(routes.ports)} aria-current={isActive(routes.ports) ? 'page' : undefined}>
				<span class="nav__icon icon-anchor" aria-hidden="true"></span>
				<span class="nav__label">{translations.nav.ports}</span>
			</a>
			<a href={resolve(routes.botel)} class="nav__link" class:nav__link--active={isActive(routes.botel)} aria-current={isActive(routes.botel) ? 'page' : undefined}>
				<span class="nav__icon icon-life-wheel" aria-hidden="true"></span>
				<span class="nav__label">Botel<br />Kormorán</span>
			</a>
			<a href={resolve(routes.boatTrips)} class="nav__link" class:nav__link--active={isActive(routes.boatTrips)} aria-current={isActive(routes.boatTrips) ? 'page' : undefined}>
				<span class="nav__icon icon-ship" aria-hidden="true"></span>
				<span class="nav__label">{boatTripsLabel[0]}<br />{boatTripsLabel[1]}</span>
			</a>
			<a href={resolve(routes.contact)} class="nav__link" class:nav__link--active={isActive(routes.contact)} aria-current={isActive(routes.contact) ? 'page' : undefined}>
				<span class="nav__icon icon-mail" aria-hidden="true"></span>
				<span class="nav__label">{translations.nav.contact}</span>
			</a>
		</div>
	</div>
</nav>

<MobileMenu {lang} bind:isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-white);
		border-bottom: 1px solid var(--color-border-light);
		transition:
			background-color 0.3s var(--ease-out-expo),
			box-shadow 0.3s var(--ease-out-expo);
	}

	.nav--scrolled {
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border-bottom-color: transparent;
	}

	.nav__container {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: var(--container-max-width);
		margin: 0 auto;
		padding: 0 var(--space-5);
		position: relative;
	}

	/* Navigation group - all items in row */
	.nav__group {
		display: flex;
		align-items: stretch;
	}

	/* Logo - first on left */
	.nav__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: var(--space-2) 0;
		margin-right: var(--space-3);
	}

	.nav__logo img {
		width: 80px;
		height: 80px;
		transition: transform 0.3s var(--ease-out-expo);
	}

	.nav__logo:hover img {
		transform: scale(1.05);
	}

	/* Navigation links */
	.nav__link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		padding: var(--space-4) var(--space-5);
		color: var(--color-text-secondary);
		text-transform: uppercase;
		text-decoration: none;
		position: relative;
		transition: color 0.2s var(--ease-out-expo);
	}

	/* Dividers between links */
	.nav__link {
		border-left: 1px solid var(--color-border-light);
	}

	.nav__link:last-child {
		border-right: 1px solid var(--color-border-light);
	}

	/* Active indicator - bottom line */
	.nav__link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 70%;
		height: 3px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
		border-radius: 3px 3px 0 0;
		transition: transform 0.3s var(--ease-out-expo);
	}

	.nav__link:hover::after,
	.nav__link--active::after {
		transform: translateX(-50%) scaleX(1);
	}

	.nav__link:hover {
		color: var(--color-text-dark);
	}

	.nav__link--active {
		color: var(--color-text-dark);
	}

	/* Icons */
	.nav__icon {
		font-size: 20px;
		transition: transform 0.2s var(--ease-out-expo);
	}

	.nav__link:hover .nav__icon {
		transform: translateY(-3px);
	}

	/* Labels */
	.nav__label {
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.5px;
		line-height: 1.3;
		text-align: center;
		white-space: nowrap;
	}

	/* Mobile toggle button */
	.nav__toggle {
		display: none;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		z-index: 101;
		border-radius: var(--radius-md);
		transition: background-color 0.2s ease;
	}

	.nav__toggle:hover {
		background-color: var(--color-border-light);
	}

	.nav__toggle span {
		display: block;
		width: 22px;
		height: 2px;
		background-color: var(--color-text-dark);
		position: relative;
		transition: background-color 0.15s ease;
	}

	.nav__toggle span::before,
	.nav__toggle span::after {
		content: '';
		position: absolute;
		width: 22px;
		height: 2px;
		background-color: var(--color-text-dark);
		left: 0;
		transition: transform 0.2s var(--ease-out-expo);
	}

	.nav__toggle span::before {
		top: -7px;
	}

	.nav__toggle span::after {
		top: 7px;
	}

	/* Hamburger to X animation */
	.nav__toggle--active span {
		background-color: transparent;
	}

	.nav__toggle--active span::before {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.nav__toggle--active span::after {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	/* ===== Responsive - Tablet ===== */
	@media (max-width: 1024px) {
		.nav__link {
			padding: var(--space-3) var(--space-3);
		}

		.nav__label {
			font-size: 10px;
		}

		.nav__icon {
			font-size: 18px;
		}

		.nav__logo img {
			width: 70px;
			height: 70px;
		}
	}

	/* ===== Responsive - Intermediate (smoother transition) ===== */
	@media (max-width: 900px) and (min-width: 769px) {
		.nav__link {
			padding: var(--space-2) var(--space-2);
		}

		.nav__label {
			font-size: 9px;
			letter-spacing: 0.3px;
		}

		.nav__icon {
			font-size: 16px;
		}

		.nav__logo {
			margin-right: var(--space-2);
		}

		.nav__logo img {
			width: 60px;
			height: 60px;
		}
	}

	/* ===== Responsive - Mobile ===== */
	@media (max-width: 768px) {
		.nav__group {
			display: none;
		}

		.nav__container {
			justify-content: center;
			padding: var(--space-2) var(--space-4);
		}

		.nav__logo {
			margin: 0;
			padding: var(--space-1) 0;
		}

		.nav__logo img {
			width: 56px;
			height: 56px;
		}

		.nav__toggle {
			display: flex;
			left: 12px;
			width: 40px;
			height: 40px;
		}
	}
</style>
