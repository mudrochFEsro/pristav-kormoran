<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
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

	// Close mobile menu on navigation
	$effect(() => {
		// Subscribe to page changes
		const currentPath = $page.url.pathname;
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
</script>

<!-- Desktop Navigation -->
<nav
	class={cn(
		'fixed inset-x-0 top-4 z-50 mx-auto hidden max-w-fit items-center justify-center space-x-4 rounded-full border border-gray-200/50 bg-white/90 px-8 py-4 shadow-lg backdrop-blur-md transition-all duration-300 md:flex',
		visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0',
		className
	)}
>
	{#if logo}
		<div class="mr-4">
			{@render logo()}
		</div>
	{/if}

	{#each navItems as item (item.link)}
		<a
			href={item.link}
			class="relative flex items-center space-x-1 text-sm text-gray-600 transition-colors hover:text-orange-500"
		>
			<span>{item.name}</span>
		</a>
	{/each}
</nav>

<!-- Mobile Navigation Bar -->
<nav
	class={cn(
		'fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-gray-200/50 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 md:hidden',
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
		class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-colors hover:bg-orange-100"
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
{#if mobileMenuOpen}
	<div class="fixed inset-0 z-40 md:hidden">
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={() => mobileMenuOpen = false}
			aria-label="Zavrieť menu"
		></button>

		<!-- Menu Panel -->
		<div class="absolute inset-x-4 top-20 rounded-2xl border border-gray-200/50 bg-white/95 p-6 shadow-xl backdrop-blur-md">
			<div class="flex flex-col space-y-2">
				{#each navItems as item (item.link)}
					<a
						href={item.link}
						class="flex items-center rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition-all hover:bg-orange-50 hover:text-orange-500"
						onclick={() => mobileMenuOpen = false}
					>
						{item.name}
					</a>
				{/each}
			</div>

			{#if languages && languages.length > 0}
				<div class="mt-6 border-t border-gray-100 pt-4">
					<div class="flex items-center justify-center gap-3">
						{#each languages as lang (lang.code)}
							<a
								href={lang.href}
								class="rounded-full border px-4 py-2 text-sm font-medium transition-all"
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
{/if}

<style>
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
</style>
