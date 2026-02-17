<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import Divider from '$lib/components/ui/Divider.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.ports.title}
	description={translations.seo.ports}
	lang={data.lang}
/>

<img class="main-img" src="/images/kormoran-i2.jpg" alt="" fetchpriority="high" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port1Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>
		{translations.ports.port1Text} {translations.ports.moreInfo} <a
			href="http://www.hotelkormoran.sk/"
			target="_blank">www.hotelkormoran.sk</a
		>.
	</p>
	<p><img src="/images/ki.png" alt={translations.ports.port1Title} loading="lazy" decoding="async" /></p>
</div>

<img class="main-img" src="/images/kormoran-ii2.jpg" alt="" loading="lazy" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port2Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>{translations.ports.port2Text}</p>
</div>

<img class="main-img" src="/images/kormoran-iii1.jpg" alt="" loading="lazy" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port3Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>{translations.ports.port3Text}</p>
	<p><img src="/images/kiii.png" alt={translations.ports.port3Title} loading="lazy" decoding="async" /></p>
</div>

<img class="main-img" src="/images/kormoran-iv.jpg" alt="" loading="lazy" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port4Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>{translations.ports.port4Text}</p>
	<p><img src="/images/kiv.png" alt={translations.ports.port4Title} loading="lazy" decoding="async" /></p>
</div>

<img class="main-img" src="/images/kormoran-v1.jpg" alt="" loading="lazy" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port5Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>{translations.ports.port5Text}</p>
	<p><img src="/images/kv.png" alt={translations.ports.port5Title} loading="lazy" decoding="async" /></p>
</div>

<img class="main-img" src="/images/sturovo-pristav.png" alt="" loading="lazy" decoding="async" use:scrollReveal={{ variant: 'fade' }} />
<h1 class="static-title" use:scrollReveal={{ variant: 'fade', delay: 50 }}>{translations.ports.port6Title}</h1>
<Divider />
<div class="static-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>{translations.ports.port6Text}</p>
	<p><img src="/images/kvi.png" alt={translations.ports.port6Title} loading="lazy" decoding="async" /></p>
</div>
