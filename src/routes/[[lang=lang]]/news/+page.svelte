<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import Divider from '$lib/components/ui/Divider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<svelte:head>
	<title>{translations.news.title} - {translations.site.title}</title>
</svelte:head>

<br />
<h1 class="static-title">Sweet temptation during a walk</h1>
<Divider />
<div class="static-date">3.11.2020</div>
<div class="static-text">
	<p>
		Even though boat trips have ended this season, walks along Kormoran Port in Čilistov are
		always a nice experience. During your walk you can order amazing homemade pastries at
		Hotel Kormorán.
	</p>
	<p>Contact for sweet pastry orders: +421 903 614 663</p>
	<p><img style="max-width: 670px;" src="/images/ondava-2.jpg" alt="Ondava" /></p>
</div>
