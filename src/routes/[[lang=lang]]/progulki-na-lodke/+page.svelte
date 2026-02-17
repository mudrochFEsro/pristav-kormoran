<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.boatTrips.title}
	description={translations.seo.boatTrips}
	lang={data.lang}
	includeHowTo={true}
/>

<img class="main-img" src="/images/plavby-lodou-ondava-neng.png" alt="" use:scrollReveal={{ variant: 'fade' }} />
<div use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<PageTitle title={translations.boatTrips.title} hasImage={true} />
</div>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 150 }}>
	<p>{translations.boatTrips.description}</p>
	<p>{translations.boatTrips.contactLabel}: <a href="tel:+421903727168">+421 903 727 168</a></p>
</div>
