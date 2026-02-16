<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.region.title}
	description={translations.seo.region}
	lang={data.lang}
/>

<PageTitle title={translations.region.title} hasImage={false} />
<Divider />
<div class="static-text">
	<p><strong>{translations.region.zitnyOstrov}</strong></p>
	<p>{translations.region.zitnyOstrovText}</p>
	<p>
		<img src="/images/kormoran-cilistov-i-a-ii-kopia.jpg" alt="Kormorán Čilistov" />
	</p>
	<p><strong>{translations.region.cyclePath}</strong></p>
	<p><img src="/images/cyklotrasa.png" alt={translations.region.cyclePath} /></p>
</div>
