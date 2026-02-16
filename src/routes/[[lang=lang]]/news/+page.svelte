<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import Divider from '$lib/components/ui/Divider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.news.title}
	description={translations.seo.news}
	lang={data.lang}
	type="article"
	article={{ publishedTime: '2020-11-03' }}
/>

<h1 class="static-title static-title-no-img">{translations.news.articleTitle}</h1>
<Divider />
<div class="static-date">3.11.2020</div>
<div class="static-text">
	<p>{translations.news.articleText}</p>
	<p>{translations.news.contactOrders}: <a href="tel:+421903614663">+421 903 614 663</a></p>
	<p><img src="/images/ondava-2.jpg" alt="Ondava" /></p>
</div>
