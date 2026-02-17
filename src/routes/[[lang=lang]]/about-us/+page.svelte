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
	title={translations.about.title}
	description={translations.seo.about}
	lang={data.lang}
/>

<div use:scrollReveal={{ variant: 'fade' }}>
	<PageTitle title={translations.about.title} hasImage={false} />
</div>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p><strong>{translations.about.intro}</strong></p>
	<p>{translations.about.introText}</p>
	<p><strong>{translations.about.events}</strong></p>
	<p>{translations.about.eventsText}</p>
	<p><strong>{translations.about.corporateEvents}</strong></p>
	<p>
		{translations.about.corporateEventsText} {translations.common.moreInfo}
		<a href="mailto:pristav@brossforpartners.sk">pristav@brossforpartners.sk</a>.
	</p>
	<p><img src="/images/teambuild.png" alt="Teambuilding" loading="lazy" decoding="async" /></p>
</div>
