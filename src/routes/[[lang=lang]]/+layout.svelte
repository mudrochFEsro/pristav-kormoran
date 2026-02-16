<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Header from '$lib/components/layout/Header.svelte';
	import MainNav from '$lib/components/layout/MainNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	// Use View Transitions API for smooth page transitions
	onNavigate((navigation) => {
		if (!browser) return;

		// Skip if navigating to the same route
		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;
		if (fromPath === toPath) return;

		// Check if View Transitions API is supported
		if (!document.startViewTransition) {
			navigation.complete.then(() => {
				window.scrollTo({ top: 0, behavior: 'instant' });
			});
			return;
		}

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.finished.then(() => {
				window.scrollTo({ top: 0, behavior: 'instant' });
			});
		});
	});
</script>

<a href="#main-content" class="skip-link">
	{data.lang === 'sk' ? 'Preskočiť na obsah' : data.lang === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
</a>
<div class="site-wrapper">
	<Header lang={data.lang} />
	<MainNav lang={data.lang} />
	<main id="main-content" class="main-content" tabindex="-1">
		<div class="container page-content">
			{@render children()}
		</div>
	</main>
	<Footer lang={data.lang} />
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

	/* View Transition - only content fades, not header/nav/footer */
	.page-content {
		view-transition-name: page-content;
	}

	@media (max-width: 768px) {
		.container {
			padding: var(--space-5) var(--space-4) 0;
		}
	}
</style>
