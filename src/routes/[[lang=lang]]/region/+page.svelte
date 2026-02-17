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
	title={translations.region.title}
	description={translations.seo.region}
	lang={data.lang}
/>

<div use:scrollReveal={{ variant: 'fade' }}>
	<PageTitle title={translations.region.title} hasImage={false} />
</div>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p><strong>{translations.region.zitnyOstrov}</strong></p>
	<p>{translations.region.zitnyOstrovText}</p>
	<p>
		<img src="/images/kormoran-cilistov-i-a-ii-kopia.jpg" alt="Kormorán Čilistov" loading="lazy" decoding="async" />
	</p>
	<p><strong>{translations.region.cyclePath}</strong></p>
	<p><img src="/images/cyklotrasa.png" alt={translations.region.cyclePath} loading="lazy" decoding="async" /></p>
</div>
