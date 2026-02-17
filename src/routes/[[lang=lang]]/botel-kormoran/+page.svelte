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
	title={translations.botel.title}
	description={translations.seo.botel}
	lang={data.lang}
/>

<div use:scrollReveal={{ variant: 'fade' }}>
	<PageTitle title={translations.botel.title} hasImage={false} />
</div>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
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
