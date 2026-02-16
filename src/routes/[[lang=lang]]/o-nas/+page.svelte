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

<PageTitle title={translations.about.title} hasImage={false} />
<Divider />
<div class="static-text">
	<p><strong>{translations.about.intro}</strong></p>
	<p>{translations.about.introText}</p>
	<p><strong>{translations.about.events}</strong></p>
	<p>{translations.about.eventsText}</p>
	<p><strong>{translations.about.corporateEvents}</strong></p>
	<p>
		{translations.about.corporateEventsText} {translations.common.moreInfo}
		<a href="mailto:pristav@brossforpartners.sk">pristav@brossforpartners.sk</a>.
	</p>
	<p><img src="/images/teambuild.png" alt="Teambuilding" /></p>
</div>
