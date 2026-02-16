<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import Divider from '$lib/components/ui/Divider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<svelte:head>
	<title>{translations.ports.title} - {translations.site.title}</title>
</svelte:head>

<img class="main-img" src="/images/kormoran-i2.jpg" alt="" />
<h1 class="static-title">{translations.ports.port1Title}</h1>
<Divider />
<div class="static-text">
	<p>
		{translations.ports.port1Text} {translations.ports.moreInfo} <a
			href="http://www.hotelkormoran.sk/"
			target="_blank">www.hotelkormoran.sk</a
		>.
	</p>
	<p><img src="/images/ki.png" alt={translations.ports.port1Title} /></p>
</div>

<img class="main-img" src="/images/kormoran-ii2.jpg" alt="" />
<h1 class="static-title">{translations.ports.port2Title}</h1>
<Divider />
<div class="static-text">
	<p>{translations.ports.port2Text}</p>
</div>

<img class="main-img" src="/images/kormoran-iii1.jpg" alt="" />
<h1 class="static-title">{translations.ports.port3Title}</h1>
<Divider />
<div class="static-text">
	<p>{translations.ports.port3Text}</p>
	<p><img src="/images/kiii.png" alt={translations.ports.port3Title} /></p>
</div>

<img class="main-img" src="/images/kormoran-iv.jpg" alt="" />
<h1 class="static-title">{translations.ports.port4Title}</h1>
<Divider />
<div class="static-text">
	<p>{translations.ports.port4Text}</p>
	<p><img src="/images/kiv.png" alt={translations.ports.port4Title} /></p>
</div>

<img class="main-img" src="/images/kormoran-v1.jpg" alt="" />
<h1 class="static-title">{translations.ports.port5Title}</h1>
<Divider />
<div class="static-text">
	<p>{translations.ports.port5Text}</p>
	<p><img src="/images/kv.png" alt={translations.ports.port5Title} /></p>
</div>

<img class="main-img" src="/images/sturovo-pristav.png" alt="" />
<h1 class="static-title">{translations.ports.port6Title}</h1>
<Divider />
<div class="static-text">
	<p>{translations.ports.port6Text}</p>
	<p><img src="/images/kvi.png" alt={translations.ports.port6Title} /></p>
</div>
