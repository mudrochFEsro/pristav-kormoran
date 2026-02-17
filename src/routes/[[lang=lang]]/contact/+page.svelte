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
	title={translations.contact.title}
	description={translations.seo.contact}
	lang={data.lang}
/>

<div use:scrollReveal={{ variant: 'fade' }}>
	<PageTitle title={translations.contact.title} />
</div>
<Divider />
<div class="static-text address" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>
		<strong>{translations.contact.portManager}</strong>
		<span>Andrej Barát</span>
	</p>
	<p>
		<span class="icon-phone"></span><a href="tel:+421903727168">+421 903 727 168</a>
		<br />
		<span class="icon-mail"></span><a href="mailto:pristav@brossforpartners.sk"
			>pristav@brossforpartners.sk</a
		>
	</p>
	<p class="section-break">
		<strong>{translations.contact.operator}</strong>
		<span>BROSS for PARTNERS, a.s.</span>
	</p>
	<p>
		<strong>{translations.contact.address}</strong>
		Hollého 1, 81108, Bratislava
	</p>
	<p>
		<strong>{translations.contact.ico}</strong>
		35 853 603
	</p>
	<p>
		<strong>{translations.contact.dic}</strong>
		2021727004
	</p>
	<p>
		<strong>{translations.contact.icdph}</strong>
		SK2021727004
	</p>
</div>
