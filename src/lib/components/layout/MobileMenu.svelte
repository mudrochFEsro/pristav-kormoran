<script lang="ts">
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	interface Props {
		lang: LanguageCode;
		isOpen: boolean;
		onClose: () => void;
	}

	let { lang, isOpen = $bindable(), onClose }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));
	const currentPath = $derived($page.url.pathname);

	let menuNav: HTMLElement | undefined = $state();

	function normalizePath(path: string): string {
		return path.endsWith('/') ? path.slice(0, -1) : path;
	}

	const normalizedCurrentPath = $derived(normalizePath(currentPath));

	function isActive(route: string): boolean {
		return normalizePath(route) === normalizedCurrentPath;
	}

	function handleLinkClick() {
		isOpen = false;
		onClose();
	}

	// Focus trap and keyboard handling
	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		if (event.key === 'Escape') {
			isOpen = false;
			onClose();
			return;
		}

		// Focus trap - trap Tab within menu
		if (event.key === 'Tab' && menuNav) {
			const focusableElements = menuNav.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement?.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement?.focus();
			}
		}
	}

	// Auto-focus first link when menu opens
	$effect(() => {
		if (isOpen && menuNav) {
			const firstLink = menuNav.querySelector<HTMLElement>('a[href]');
			// Small delay to ensure animation started
			setTimeout(() => firstLink?.focus(), 50);
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
		<div class="mobile-menu__backdrop" onclick={handleLinkClick} role="presentation"></div>
		<nav class="mobile-menu__content" bind:this={menuNav}>
			<a
				href={resolve(routes.home)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.home)}
				onclick={handleLinkClick}
			>
				<span class="icon-anchor" aria-hidden="true"></span>
				{translations.home.title}
			</a>
			<a
				href={resolve(routes.about)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.about)}
				onclick={handleLinkClick}
			>
				<span class="icon-wheel" aria-hidden="true"></span>
				{translations.nav.about}
			</a>
			<a
				href={resolve(routes.news)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.news)}
				onclick={handleLinkClick}
			>
				<span class="icon-sailor" aria-hidden="true"></span>
				{translations.nav.news}
			</a>
			<a
				href={resolve(routes.region)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.region)}
				onclick={handleLinkClick}
			>
				<span class="icon-earth" aria-hidden="true"></span>
				{translations.nav.region}
			</a>
			<a
				href={resolve(routes.ports)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.ports)}
				onclick={handleLinkClick}
			>
				<span class="icon-anchor" aria-hidden="true"></span>
				{translations.nav.ports}
			</a>
			<a
				href={resolve(routes.botel)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.botel)}
				onclick={handleLinkClick}
			>
				<span class="icon-life-wheel" aria-hidden="true"></span>
				{translations.nav.botel}
			</a>
			<a
				href={resolve(routes.boatTrips)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.boatTrips)}
				onclick={handleLinkClick}
			>
				<span class="icon-ship" aria-hidden="true"></span>
				{translations.nav.boatTrips}
			</a>
			<a
				href={resolve(routes.contact)}
				class="mobile-menu__link"
				class:mobile-menu__link--active={isActive(routes.contact)}
				onclick={handleLinkClick}
			>
				<span class="icon-mail" aria-hidden="true"></span>
				{translations.nav.contact}
			</a>
		</nav>
	</div>
{/if}

<style>
	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		display: flex;
		flex-direction: column;
	}

	.mobile-menu__backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.mobile-menu__content {
		position: relative;
		margin-top: 120px;
		margin-left: 20px;
		margin-right: 20px;
		background: var(--color-white);
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		max-height: calc(100dvh - 160px);
		overflow-y: auto;
		animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Fallback for browsers without dvh support */
	@supports not (max-height: 100dvh) {
		.mobile-menu__content {
			max-height: calc(100vh - 160px);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-menu__link {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 15px 10px;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		font-size: 14px;
		border-bottom: 1px solid var(--color-border-light);
		transition: color 0.15s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.mobile-menu__link:last-child {
		border-bottom: none;
	}

	.mobile-menu__link:hover,
	.mobile-menu__link--active {
		color: var(--color-primary);
	}

	.mobile-menu__link :global([class^='icon-']),
	.mobile-menu__link :global([class*=' icon-']) {
		font-size: 20px;
		width: 24px;
		text-align: center;
	}
</style>
