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
	<p>
		Currently we can only provide boat trips for large groups - corporate team buildings,
		family celebrations, weddings.
	</p>
	<p>Contact: 0903 727 168</p>
</div>
