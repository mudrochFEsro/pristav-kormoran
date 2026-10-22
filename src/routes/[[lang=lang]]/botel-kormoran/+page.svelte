<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import { responsive } from '$lib/images';
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
		<img {...responsive('/images/botel-ubytovanie-restauracia1.webp')} sizes="(max-width: 900px) 100vw, 820px" alt="Botel Restaurant" loading="lazy" decoding="async" />
	</p>
	<p><img {...responsive('/images/sundeck-chillout-zona.webp')} sizes="(max-width: 900px) 100vw, 820px" alt="Sundeck" loading="lazy" decoding="async" /></p>
	<p>{translations.botel.roomTypes}</p>
	<p><img {...responsive('/images/img3409.webp')} sizes="(max-width: 900px) 100vw, 820px" alt="Room" loading="lazy" decoding="async" /></p>
	<p><img {...responsive('/images/img3416-1.webp')} sizes="(max-width: 900px) 100vw, 820px" alt="Room interior" loading="lazy" decoding="async" /></p>
</div>
