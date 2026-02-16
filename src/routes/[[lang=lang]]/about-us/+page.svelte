<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<svelte:head>
	<title>{translations.about.title} - {translations.site.title}</title>
</svelte:head>

<PageTitle title={translations.about.title} hasImage={false} />
<Divider />
<div class="static-text">
	{#if data.lang === 'sk'}
		<p>
			Prístavy Kormorán sú situované v nádherných lokalitách, ktoré ponúkajú veľa možností
			spoznať ich kultúru, prírodu, relax, tradície, šport presne podľa vašich predstáv.
			Plavba loďou je čoraz viac u turistov preferovaná na Slovensku aj v zahraničí a spojiť
			plavbu so spoznávaním nového je nezabudnuteľný zážitok pre všetky vekové kategórie.
		</p>
	{:else if data.lang === 'en'}
		<p>
			Kormoran Ports are situated in wonderful locations that offer many opportunities to
			discover their culture, nature, relaxation, traditions and sports according to your wishes.
			Boat trips are increasingly preferred by tourists in Slovakia and abroad, and combining
			sailing with exploring new places is an unforgettable experience for all age groups.
		</p>
	{:else}
		<p>
			Порты Корморан расположены в прекрасных местах, которые предлагают множество возможностей
			познакомиться с их культурой, природой, отдыхом, традициями и спортом по вашему желанию.
			Прогулки на лодке становятся все более популярными среди туристов в Словакии и за рубежом,
			а сочетание плавания с изучением нового является незабываемым впечатлением для всех возрастов.
		</p>
	{/if}
	<p><img src="/images/lod-pristav-5-pano.jpg" alt="Port view" /></p>
</div>
