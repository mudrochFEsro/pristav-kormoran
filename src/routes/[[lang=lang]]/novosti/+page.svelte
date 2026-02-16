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

<h1 class="static-title static-title-no-img">Сладкое искушение во время прогулки</h1>
<Divider />
<div class="static-date">3.11.2020</div>
<div class="static-text">
	<p>
		Хотя сезон лодочных прогулок в этом году завершился, прогулки вдоль порта Корморан в
		Чилистове всегда приятны. Во время прогулки вы можете заказать в отеле Корморан
		удивительную домашнюю выпечку.
	</p>
	<p>Контакт для заказа сладкой выпечки: +421 903 614 663</p>
	<p><img src="/images/ondava-2.jpg" alt="Ondava" /></p>
</div>
