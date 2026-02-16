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
	<title>{translations.botel.title} - {translations.site.title}</title>
</svelte:head>

<br />
<PageTitle title={translations.botel.title} hasImage={false} />
<Divider />
<div class="static-text">
	{#if data.lang === 'sk'}
		<p>
			Botel Kormorán poskytuje ubytovanie s kapacitou 49 osôb. Súčasťou Botela je aj
			reštaurácia s kapacitou 32 miest a bar s terasou s kapacitou 60 miest. Okrem týchto
			priestorov je na Boteli k dispozícii aj kongresová sála s kapacitou 20 miest. Botel
			ponúka možnosť organizovania firemných akcií, školení, rodinných osláv a iných
			spoločenských udalostí.
		</p>
		<p>
			V prípade záujmu o ubytovanie alebo prenájom priestorov Botela kontaktujte prosím
			pristav@brossforpartners.sk. Radi Vám vypracujeme cenovú ponuku podľa Vašich
			požiadaviek.
		</p>
	{:else if data.lang === 'en'}
		<p>
			Botel Kormorán provides accommodation with a capacity of 49 people. The Botel also
			includes a restaurant with a capacity of 32 seats and a bar with a terrace with a
			capacity of 60 seats. In addition to these spaces, a conference room with a capacity
			of 20 seats is available. The Botel offers the possibility of organizing corporate
			events, trainings, family celebrations, and other social events.
		</p>
		<p>
			If you are interested in accommodation or rental of Botel spaces, please contact
			pristav@brossforpartners.sk. We will be happy to prepare a price offer according to
			your requirements.
		</p>
	{:else}
		<p>
			Ботель Корморан предоставляет размещение вместимостью 49 человек. В состав ботеля
			также входит ресторан вместимостью 32 места и бар с террасой вместимостью 60 мест.
			Помимо этих помещений, на ботеле имеется конференц-зал вместимостью 20 мест. Ботель
			предлагает возможность организации корпоративных мероприятий, обучения, семейных
			праздников и других общественных мероприятий.
		</p>
		<p>
			Если вас интересует размещение или аренда помещений ботеля, пожалуйста, свяжитесь с
			нами по адресу pristav@brossforpartners.sk. Мы с радостью подготовим ценовое
			предложение в соответствии с вашими требованиями.
		</p>
	{/if}
	<p>
		<img
			style="max-width: 670px;"
			src="/images/botel-ubytovanie-restauracia1.jpg"
			alt="Botel Restaurant"
		/>
	</p>
	<p><img style="max-width: 670px;" src="/images/sundeck-chillout-zona.jpg" alt="Sundeck" /></p>
	{#if data.lang === 'sk'}
		<p>
			Ubytovanie v izbách s rôznymi kapacitami - 2-lôžkové, 3-lôžkové, 4-lôžkové, 6-lôžkové
		</p>
	{:else if data.lang === 'en'}
		<p>Accommodation in rooms with various capacities - 2-bed, 3-bed, 4-bed, 6-bed</p>
	{:else}
		<p>Размещение в номерах различной вместимости - 2-местные, 3-местные, 4-местные, 6-местные</p>
	{/if}
	<p><img style="max-width: 670px;" src="/images/img3409.jpg" alt="Room" /></p>
	<p><img style="max-width: 670px;" src="/images/img3416-1.jpg" alt="Room interior" /></p>
</div>
