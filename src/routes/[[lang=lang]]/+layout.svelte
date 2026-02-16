<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import MainNav from '$lib/components/layout/MainNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();
</script>

<div class="site-wrapper">
	<Header lang={data.lang} />
	<MainNav lang={data.lang} />
	<main class="main-content">
		<div class="container">
			{@render children()}
		</div>
	</main>
	<Footer lang={data.lang} />
</div>

<style>
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

	@media (max-width: 768px) {
		.container {
			padding: var(--space-5) var(--space-4) 0;
		}
	}
</style>
