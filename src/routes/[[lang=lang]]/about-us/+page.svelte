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

<br />
<PageTitle title={translations.about.title} hasImage={false} />
<Divider />
<div class="static-text">
	<p>
		Ports Kormorán are situated in a wonderful location, which offers many possibilities to
		learn about its culture, nature, leisure, traditions and sport according to your wishes.
		More and more in Slovakia and abroad boat cruises are preferred by tourists and a
		combination of boat trips and trying new things is an unforgettable experience for all
		ages.
	</p>
	<p><img style="max-width: 670px;" src="/images/lod-pristav-5-pano.jpg" alt="Port view" /></p>
</div>
