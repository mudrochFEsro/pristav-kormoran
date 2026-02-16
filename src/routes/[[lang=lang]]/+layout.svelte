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


<div id="layout">
	<Header lang={data.lang} />
	<MainNav lang={data.lang} />
	<div class="content">
		<div class="content-border"></div>
		<div class="wrapper">
			{@render children()}
		</div>
		<div id="layout-footer"></div>
	</div>
</div>
<Footer lang={data.lang} />
