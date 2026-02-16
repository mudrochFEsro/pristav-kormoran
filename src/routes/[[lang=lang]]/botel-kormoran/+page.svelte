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

<PageTitle title={translations.botel.title} hasImage={false} />
<Divider />
<div class="static-text">
	<p>{translations.botel.description}</p>
	<p>
		{translations.botel.contactInfo}
	</p>
	<p>
		<img src="/images/botel-ubytovanie-restauracia1.jpg" alt="Botel Restaurant" />
	</p>
	<p><img src="/images/sundeck-chillout-zona.jpg" alt="Sundeck" /></p>
	<p>{translations.botel.roomTypes}</p>
	<p><img src="/images/img3409.jpg" alt="Room" /></p>
	<p><img src="/images/img3416-1.jpg" alt="Room interior" /></p>
</div>
