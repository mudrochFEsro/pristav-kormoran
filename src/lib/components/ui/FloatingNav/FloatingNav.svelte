<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	interface NavItem {
		name: string;
		link: string;
		icon?: Snippet;
	}

	interface LanguageOption {
		code: string;
		label: string;
		href: string;
		active: boolean;
	}

	interface Props {
		navItems: NavItem[];
		className?: string;
		logo?: Snippet;
		languages?: LanguageOption[];
	}

	let { navItems, className, logo, languages }: Props = $props();

	let visible = $state(true);
	let lastScrollY = $state(0);
	let mobileMenuOpen = $state(false);

	// Current path for active state
	const currentPath = $derived($page.url.pathname);

	// Normalize path for comparison
	function normalizePath(path: string): string {
		const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
		return normalized || '/';
	}

	const normalizedCurrentPath = $derived(normalizePath(currentPath));

	function isActive(route: string): boolean {
		const normalizedRoute = normalizePath(route);
		if (normalizedRoute === normalizedCurrentPath) return true;
		const resolvedRoute = normalizePath(resolve(route));
		return resolvedRoute === normalizedCurrentPath;
	}

	// Close mobile menu on navigation
	$effect(() => {
		// Subscribe to page changes
		const _currentPath = $page.url.pathname;
		mobileMenuOpen = false;
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		function handleScroll() {
			const currentScrollY = window.scrollY;

			if (currentScrollY < 50) {
				visible = true;
			} else if (currentScrollY < lastScrollY) {
				visible = true;
			} else {
				visible = false;
			}

			lastScrollY = currentScrollY;
		}

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Lock body scroll when mobile menu is open
	$effect(() => {
		if (typeof document === 'undefined') return;

		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Desktop Navigation -->
<nav
	class={cn(
		'fixed inset-x-0 top-4 z-50 mx-auto hidden max-w-fit items-center justify-center space-x-6 rounded-xl border border-gray-200 bg-white px-8 py-3 shadow-lg transition-all duration-300 md:flex',
		visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0',
		className
	)}
>
	{#if logo}
		<div class="mr-6">
			{@render logo()}
		</div>
	{/if}

	{#each navItems as item (item.link)}
		<a
			href={item.link}
			class={cn(
				'relative flex items-center text-sm font-medium transition-colors',
				isActive(item.link) ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
			)}
			aria-current={isActive(item.link) ? 'page' : undefined}
		>
			<span>{item.name}</span>
			{#if isActive(item.link)}
				<span class="absolute -bottom-3 left-0 right-0 h-0.5 bg-orange-500"></span>
			{/if}
		</a>
	{/each}
</nav>

<!-- Mobile Navigation Bar -->
<nav
	class={cn(
		'fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg transition-all duration-300 md:hidden',
		visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0',
		className
	)}
>
	{#if logo}
		<div>
			{@render logo()}
		</div>
	{/if}

	<button
		onclick={() => mobileMenuOpen = !mobileMenuOpen}
		class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-orange-400 hover:text-orange-500"
		aria-label={mobileMenuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
		aria-expanded={mobileMenuOpen}
	>
		{#if mobileMenuOpen}
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{:else}
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		{/if}
	</button>
</nav>

<!-- Mobile Menu Overlay -->
<div
	class="mobile-overlay"
	class:mobile-overlay--open={mobileMenuOpen}
	role="dialog"
	aria-modal="true"
	aria-label="Navigation menu"
	aria-hidden={!mobileMenuOpen}
	inert={!mobileMenuOpen}
>
	<!-- Backdrop -->
	<button
		class="mobile-overlay__backdrop"
		onclick={() => mobileMenuOpen = false}
		aria-label="Zavrieť menu"
	></button>

	<!-- Menu Panel -->
	<div class="mobile-overlay__panel">
		<div class="flex flex-col">
			{#each navItems as item (item.link)}
				<a
					href={item.link}
					class={cn(
						'flex items-center border-b border-gray-100 px-4 py-4 text-base font-medium transition-all last:border-b-0',
						isActive(item.link)
							? 'text-orange-500'
							: 'text-gray-700 hover:text-orange-500'
					)}
					onclick={() => mobileMenuOpen = false}
					aria-current={isActive(item.link) ? 'page' : undefined}
				>
					{item.name}
				</a>
			{/each}
		</div>

		{#if languages && languages.length > 0}
			<div class="mt-4 border-t border-gray-200 pt-4">
				<div class="flex items-center justify-center gap-3">
					{#each languages as lang (lang.code)}
						<a
							href={lang.href}
							class="flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all"
							class:active-lang={lang.active}
							class:inactive-lang={!lang.active}
							onclick={() => mobileMenuOpen = false}
						>
							{lang.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Mobile overlay - fullscreen */
	.mobile-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		visibility: hidden;
		pointer-events: none;
		transition: visibility 0s linear 0.25s;
	}

	.mobile-overlay--open {
		visibility: visible;
		pointer-events: auto;
		transition: visibility 0s linear 0s;
	}

	/* Backdrop */
	.mobile-overlay__backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border: none;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s ease-out;
	}

	.mobile-overlay--open .mobile-overlay__backdrop {
		opacity: 1;
		transition: opacity 0.25s ease-out;
	}

	/* Menu panel */
	.mobile-overlay__panel {
		position: absolute;
		top: 80px;
		left: 16px;
		right: 16px;
		max-height: calc(100dvh - 100px);
		overflow-y: auto;
		background: white;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		padding: 8px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		transform-origin: top center;
		opacity: 0;
		transform: scale(0.95) translateY(-10px);
		transition: opacity 0.2s ease-out, transform 0.2s ease-out;
	}

	.mobile-overlay--open .mobile-overlay__panel {
		opacity: 1;
		transform: scale(1) translateY(0);
		transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
		            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* Hide on desktop */
	@media (min-width: 768px) {
		.mobile-overlay {
			display: none;
		}
	}

	/* Fallback for browsers without dvh support */
	@supports not (max-height: 100dvh) {
		.mobile-overlay__panel {
			max-height: calc(100vh - 100px);
		}
	}

	.active-lang {
		background-color: rgb(255 237 213);
		border-color: rgb(249 115 22);
		color: rgb(249 115 22);
	}

	.inactive-lang {
		border-color: rgb(229 231 235);
		color: rgb(107 114 128);
	}

	.inactive-lang:hover {
		border-color: rgb(249 115 22);
		color: rgb(249 115 22);
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.mobile-overlay__backdrop,
		.mobile-overlay__panel {
			transition: none;
		}
	}
</style>
