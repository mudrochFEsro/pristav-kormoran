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
<h1 class="static-title">Kormoran Port I.</h1>
<Divider />
<div class="static-text">
	<p>
		Located at r.k. 31.2 - 31.4 on the left bank of the Gabčíkovo water works reservoir on
		the Danube river, it is the official and last port before the supply channel. It is
		equipped with water, electricity, waste disposal service, and food and drinks supply
		upon request. The port is located near Hotel Kormorán, about 3 minutes walk through a
		beautiful park. More at <a href="http://www.hotelkormoran.sk/" target="_blank"
			>www.hotelkormoran.sk</a
		>.
	</p>
	<p><img src="/images/ki.png" alt="Kormoran I" /></p>
</div>

<img class="main-img" src="/images/kormoran-ii2.jpg" alt="" />
<h1 class="static-title">Kormoran Port II.</h1>
<Divider />
<div class="static-text">
	<p>
		Primarily intended for parking small vessels with a capacity of up to 35 vessels. Part
		of the port is Botel Kormorán with a capacity of 49 beds. The Botel includes a
		restaurant with a capacity of 32 seats and a bar with a terrace with a capacity of 60
		seats.
	</p>
</div>

<img class="main-img" src="/images/kormoran-iii1.jpg" alt="" />
<h1 class="static-title">Kormoran Port III.</h1>
<Divider />
<div class="static-text">
	<p>
		Located in Bratislava at r.k. 1868, 400 - 1868, 290 on the right side of the Danube.
		Length is 74.60 m and width 9.84 m with the possibility of mooring several ships with a
		maximum width of 26 m.
	</p>
	<p><img src="/images/kiii.png" alt="Kormoran III" /></p>
</div>

<img class="main-img" src="/images/kormoran-iv.jpg" alt="" />
<h1 class="static-title">Kormoran Port IV.</h1>
<Divider />
<div class="static-text">
	<p>
		Located in Bratislava at r.k. 1869, 620 - 1869, 500 on the left side of the Danube below
		Bratislava Castle. Length is 16 m and width 8 m.
	</p>
	<p><img src="/images/kiv.png" alt="Kormoran IV" /></p>
</div>

<img class="main-img" src="/images/kormoran-v1.jpg" alt="" />
<h1 class="static-title">Kormoran Port V.</h1>
<Divider />
<div class="static-text">
	<p>
		Located in Bratislava at r.k. 1870,200 - 1870,250 on the left side of the Danube near
		River Park. Length is 20 m and width 7 m.
	</p>
	<p><img src="/images/kv.png" alt="Kormoran V" /></p>
</div>

<img class="main-img" src="/images/sturovo-pristav.png" alt="" />
<h1 class="static-title">Kormoran Port VI.</h1>
<Divider />
<div class="static-text">
	<p>
		Located in Štúrovo at 1 718, 615 - 1 718, 495 r.k. on the left side of the Danube.
		Length is 64.20 m and width 9 m.
	</p>
	<p><img src="/images/kvi.png" alt="Kormoran VI" /></p>
</div>
