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
	<title>{translations.region.title} - {translations.site.title}</title>
</svelte:head>

<br />
<PageTitle title={translations.region.title} hasImage={false} />
<Divider />
<div class="static-text">
	{#if data.lang === 'sk'}
		<p><strong>Žitný ostrov</strong></p>
		<p>
			sa nachádza na juhozápade Slovenska a je najväčší riečny ostrov v Európe. Je
			ohraničený Dunajom, Malým Dunajom a Váhom. Je obrovskou zásobárňou vody a jedným z
			poľnohospodársky najúrodnejším územím Slovenska. Typické pre toto územie je
			pestovanie teplomilných plodín - cukrová repa, kukurica, repka olejná a rôzne druhy
			ovocia a zeleniny. Z hľadiska turistického ruchu sú najnavštevovanejšie Dunajská
			Streda, Veľký Meder, kde je množstvo termálnych kúpalísk. Obľúbeným miestom je aj
			Vodné dielo Gabčíkovo priamo výletnou loďou z čilistovského Prístavu Kormorán
			neďaleko Bratislavy. Popri celom vodnom diele vedie aj cyklistická trasa priamo po
			hrádzi, odkiaľ je nádherný výhľad na celú panorámu. Oddych, relax, športoviská a
			tradičné jedlá ponúka Hotel Kormorán**** v Šamoríne - Čilistov neďaleko prístaviska v
			rámci cykotrasy.
		</p>
		<p>
			<img
				style="max-width: 670px;"
				src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
				alt="Kormorán Čilistov"
			/>
		</p>
		<p><strong>Cyklotrasa pri Hoteli Kormorán****</strong></p>
		<p><img style="max-width: 670px;" src="/images/cyklotrasa.png" alt="Cyklotrasa" /></p>
	{:else if data.lang === 'en'}
		<p><strong>Žitný ostrov (Rye Island)</strong></p>
		<p>
			is located in southwestern Slovakia and is the largest river island in Europe. It is
			bordered by the Danube, Little Danube, and Váh. It is a huge water reservoir and one
			of the most agriculturally fertile areas of Slovakia. The Hotel Kormorán**** in
			Šamorín - Čilistov near the port offers rest, relaxation, sports facilities, and
			traditional dishes.
		</p>
		<p>
			<img
				style="max-width: 670px;"
				src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
				alt="Kormorán Čilistov"
			/>
		</p>
		<p><strong>Cycle path near Hotel Kormorán****</strong></p>
		<p><img style="max-width: 670px;" src="/images/cyklotrasa.png" alt="Cycle path" /></p>
	{:else}
		<p><strong>Житный остров</strong></p>
		<p>
			расположен на юго-западе Словакии и является крупнейшим речным островом в Европе. Он
			ограничен Дунаем, Малым Дунаем и Вагом. Это огромный водный резервуар и одна из самых
			плодородных сельскохозяйственных территорий Словакии. Отель Kormorán**** в Шаморине
			- Чилистове рядом с портом предлагает отдых, релаксацию, спортивные сооружения и
			традиционные блюда.
		</p>
		<p>
			<img
				style="max-width: 670px;"
				src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
				alt="Корморан Чилистов"
			/>
		</p>
		<p><strong>Велосипедный маршрут у отеля Kormorán****</strong></p>
		<p>
			<img style="max-width: 670px;" src="/images/cyklotrasa.png" alt="Велосипедный маршрут" />
		</p>
	{/if}
</div>
