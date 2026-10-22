<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import NewsContent from '$lib/components/news/NewsContent.svelte';

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
	image="/images/botel-ubytovanie-restauracia1.webp"
	article={{ publishedTime: '2026-10-22' }}
/>

<NewsContent lang={data.lang} />
