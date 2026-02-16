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

<br />
<img class="main-img" src="/images/kormoran-i2.jpg" alt="" />
<h1 class="static-title">Порт Корморан I.</h1>
<Divider />
<div class="static-text">
	<p>
		расположен на р.к. 31,2 – 31,4 на левом берегу водохранилища Габчиково на реке Дунай и
		является официальным и последним портом перед подводящим каналом. Оборудован водой,
		электричеством, вывозом мусора, по запросу — пополнением продуктов и напитков. Порт
		находится рядом с отелем Корморан, примерно в 3 минутах ходьбы через красивый парк.
		Подробнее на <a href="http://www.hotelkormoran.sk/" target="_blank"
			>www.hotelkormoran.sk</a
		>.
	</p>
	<p><img style="max-width: 670px;" src="/images/ki.png" alt="Корморан I" /></p>
</div>

<img class="main-img" src="/images/kormoran-ii2.jpg" alt="" />
<h1 class="static-title">Порт Корморан II.</h1>
<Divider />
<div class="static-text">
	<p>
		предназначен преимущественно для стоянки малых судов вместимостью до 35 судов. Частью
		порта является ботель Корморан вместимостью 49 мест. Ботель включает ресторан на 32
		места и бар с террасой на 60 мест.
	</p>
</div>

<img class="main-img" src="/images/kormoran-iii1.jpg" alt="" />
<h1 class="static-title">Порт Корморан III.</h1>
<Divider />
<div class="static-text">
	<p>
		расположен в Братиславе на р.к. 1868, 400 – 1868, 290 на правой стороне Дуная. Длина
		74,60 м, ширина 9,84 м с возможностью швартовки нескольких судов максимальной шириной
		до 26 м.
	</p>
	<p><img style="max-width: 670px;" src="/images/kiii.png" alt="Корморан III" /></p>
</div>

<img class="main-img" src="/images/kormoran-iv.jpg" alt="" />
<h1 class="static-title">Порт Корморан IV.</h1>
<Divider />
<div class="static-text">
	<p>
		расположен в Братиславе на р.к. 1869, 620 – 1869, 500 на левой стороне Дуная под
		Братиславским замком. Длина 16 м, ширина 8 м.
	</p>
	<p><img style="max-width: 670px;" src="/images/kiv.png" alt="Корморан IV" /></p>
</div>

<img class="main-img" src="/images/kormoran-v1.jpg" alt="" />
<h1 class="static-title">Порт Корморан V.</h1>
<Divider />
<div class="static-text">
	<p>
		расположен в Братиславе на р.к. 1870,200 – 1870,250 на левой стороне Дуная у River
		Park. Длина 20 м, ширина 7 м.
	</p>
	<p><img style="max-width: 670px;" src="/images/kv.png" alt="Корморан V" /></p>
</div>

<img class="main-img" src="/images/sturovo-pristav.png" alt="" />
<h1 class="static-title">Порт Корморан VI.</h1>
<Divider />
<div class="static-text">
	<p>
		расположен в Штурово на р.к. 1 718, 615 – 1 718, 495 на левой стороне Дуная. Длина
		64,20 м, ширина 9 м.
	</p>
	<p><img style="max-width: 670px;" src="/images/kvi.png" alt="Корморан VI" /></p>
</div>
