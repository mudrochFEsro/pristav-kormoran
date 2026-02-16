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
	<title>{translations.boatTrips.title} - {translations.site.title}</title>
</svelte:head>

<img class="main-img" src="/images/plavby-lodou-ondava-neng.png" alt="" />
<PageTitle title={translations.boatTrips.title} hasImage={true} />
<Divider />
<div class="static-text">
	{#if data.lang === 'sk'}
		<p>
			Momentálne vieme výlety loďou zabezpečiť len pre veľké skupiny - firemné teambuildingy,
			rodinné oslavy, svadby.
		</p>
		<p>Kontakt: <a href="tel:+421903727168">+421 903 727 168</a></p>
	{:else if data.lang === 'en'}
		<p>
			Currently we can only provide boat trips for large groups - corporate team buildings,
			family celebrations, weddings.
		</p>
		<p>Contact: <a href="tel:+421903727168">+421 903 727 168</a></p>
	{:else}
		<p>
			В настоящее время мы можем организовать прогулки на лодке только для больших групп -
			корпоративные тимбилдинги, семейные праздники, свадьбы.
		</p>
		<p>Контакт: <a href="tel:+421903727168">+421 903 727 168</a></p>
	{/if}
</div>
