<script lang="ts">
	import { page } from '$app/stores';
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));
	const currentPath = $derived($page.url.pathname);

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
</script>

<nav class="main-nav" aria-label="Main navigation">
	<div class="wrapper">
		<div class="main-nav-left">
			<a href={routes.about} class:main-nav-active={isActive(routes.about)} aria-current={isActive(routes.about) ? 'page' : undefined}>
				<span class="icon-wheel" aria-hidden="true"></span>
				<span class="main-nav-item">{translations.nav.about}</span>
			</a>
			<a href={routes.news} class:main-nav-active={isActive(routes.news)} aria-current={isActive(routes.news) ? 'page' : undefined}>
				<span class="icon-sailor" aria-hidden="true"></span>
				<span class="main-nav-item">{translations.nav.news}</span>
			</a>
			<a href={routes.region} class:main-nav-active={isActive(routes.region)} aria-current={isActive(routes.region) ? 'page' : undefined}>
				<span class="icon-earth" aria-hidden="true"></span>
				<span class="main-nav-item">{translations.nav.region}</span>
			</a>
		</div>
		<div class="main-nav-right">
			<a href={routes.ports} class:main-nav-active={isActive(routes.ports)} aria-current={isActive(routes.ports) ? 'page' : undefined}>
				<span class="icon-anchor" aria-hidden="true"></span>
				<span class="main-nav-item">{translations.nav.ports}</span>
			</a>
			<a href={routes.botel} class:main-nav-active={isActive(routes.botel)} aria-current={isActive(routes.botel) ? 'page' : undefined}>
				<span class="icon-life-wheel" aria-hidden="true"></span>
				<span class="main-nav-item">Botel<br />Kormorán</span>
			</a>
			<a href={routes.boatTrips} class:main-nav-active={isActive(routes.boatTrips)} aria-current={isActive(routes.boatTrips) ? 'page' : undefined}>
				<span class="icon-ship" aria-hidden="true"></span>
				<span class="main-nav-item">{boatTripsLabel[0]}<br />{boatTripsLabel[1]}</span>
			</a>
			<a href={routes.contact} class:main-nav-active={isActive(routes.contact)} aria-current={isActive(routes.contact) ? 'page' : undefined}>
				<span class="icon-mail" aria-hidden="true"></span>
				<span class="main-nav-item">{translations.nav.contact}</span>
			</a>
		</div>
		<a href={routes.home} class="main-logo" aria-label="Homepage">
			<img src="/images/logo-pristav.svg" alt="Prístav Kormorán" width="130" height="130" />
		</a>
	</div>
</nav>
