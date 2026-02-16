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
<h1 class="static-title">Prístav Kormorán I.</h1>
<Divider />
<div class="static-text">
	<p>
		sa nachádza na r.k. 31,2 – 31,4 na ľavom brehu zdrže vodného diela Gabčíkovo na rieke
		Dunaj a je oficiálnym a zároveň posledným prístaviskom pred prívodným kanálom. Je
		vybavený vodou, elektrinou, zabezpečením odvozu odpadu, na požiadanie doplnením potravín
		a nápojov. Prístav sa nachádza v blízkosti Hotela Kormorán, cca 3 minúty chôdze cez
		nádherný park. Okolie Hotela Kormorán ponúka veľa možností využitia voľného času na
		šport, relax, kultúru aj zábavu. Ubytovacia kapacita hotela je 172 lôžok, možnosť
		využitia welness, fitness, športovísk, organizovanie konferencií, svadieb, rodinných
		osláv, firemných a iných spoločenských udalostí. Viac na <a
			href="http://www.hotelkormoran.sk/"
			target="_blank">www.hotelkormoran.sk</a
		>.
	</p>
	<p><img src="/images/ki.png" alt="Kormorán I" /></p>
</div>

<img class="main-img" src="/images/kormoran-ii2.jpg" alt="" />
<h1 class="static-title">Prístav Kormorán II.</h1>
<Divider />
<div class="static-text">
	<p>
		je určený prevažne na parkovanie malých plavidiel s kapacitou vyviazania do 35 plavidiel.
		Súčasťou prístavu je Botel Kormorán s kapacitou 49 lôžok. Súčasťou Botela je aj
		reštaurácia s kapacitou 32 miest a bar s terasou s kapacitou 60 miest. Okrem týchto
		priestorov je na Boteli k dispozícii aj kongresová sála s kapacitou 20 miest. Botel
		ponúka možnosť organizovania firemných akcií, školení, rodinných osláv a iných
		spoločenských udalostí.
	</p>
</div>

<img class="main-img" src="/images/kormoran-iii1.jpg" alt="" />
<h1 class="static-title">Prístav Kormorán III.</h1>
<Divider />
<div class="static-text">
	<p>
		sa nachádza v Bratislave na r.k. 1868, 400 – 1868, 290 na pravej strane Dunaja. Dĺžka je
		74,60 m a širka 9,84 m s možnosťou prikotvenia viacerých lodí s maximálnou šírkou do 26
		m. Je vybavený vodou, elektrinou, zabezpečením odvozu odpadu, na požiadanie doplnením
		potravín a nápojov. Z prístavu je možné realizovať výlety po Bratislave a okolí, ktoré
		ponúka široké možnosti kultúrneho, spoločenského aj športového charakteru.
	</p>
	<p><img src="/images/kiii.png" alt="Kormorán III" /></p>
</div>

<img class="main-img" src="/images/kormoran-iv.jpg" alt="" />
<h1 class="static-title">Prístav Kormorán IV.</h1>
<Divider />
<div class="static-text">
	<p>
		sa nachádza v Bratislave na r.k. 1869, 620 – 1869, 500 na ľavej strane Dunaja pod
		Bratislavským hradom. Dĺžka je 16 m a šírka 8 m s možnosťou prikotvenia viacerých lodí.
		Je vybavený vodou, elektrinou, zabezpečením odvozu odpadu, na požiadanie doplnením
		potravín a nápojov. Z prístavu je možná prehliadka Bratislavského hradu, výlet na
		neďaleký Hrad Devín a iné kultúrne a športové aktivity, ktoré okolie ponúka, napríklad
		vínna cesta, prehliadka Starého mesta, nákupné centrá, pravidelné kultúrne a športové
		podujatia, nočný život.
	</p>
	<p><img src="/images/kiv.png" alt="Kormorán IV" /></p>
</div>

<img class="main-img" src="/images/kormoran-v1.jpg" alt="" />
<h1 class="static-title">Prístav Kormorán V.</h1>
<Divider />
<div class="static-text">
	<p>
		sa nachádza v Bratislave na r.k. 1870,200 – 1870,250 na ľavej strane Dunaja pri River
		Parku. Dĺžka je 20 m a šírka 7 m s možnosťou prikotvenia malého plavidla do 30 m s
		ponorom 1,5 m. Hlavné mesto je zaujímavé svojou architektúrou Starého mesta, ktorú je
		možné prejsť vláčikom spolu so sprievodcom, pravidelnými kultúrnymi podujatiami,
		prípadne romantickými prechádzkami popri Dunaji. Bratislava žije nočným životom najmä
		cez víkendy, ponuka barov, pubov a diskoték je určite lákavá.
	</p>
	<p><img src="/images/kv.png" alt="Kormorán V" /></p>
</div>

<img class="main-img" src="/images/sturovo-pristav.png" alt="" />
<h1 class="static-title">Prístav Kormorán VI.</h1>
<Divider />
<div class="static-text">
	<p>
		sa nachádza v Štúrove na 1 718, 615 – 1 718, 495 r.k. na ľavej strane Dunaja. Jeho dĺžka
		je 64,20 m a šírka 9 m s možnosťou prikotvenia viacerých lodí s maximálnou šírkou do 35
		m. Je vybavený vodou, elektrinou, zabezpečením odvozu odpadu, na požiadanie doplnením
		potravín a nápojov. Štúrovo je miesto, kde je čo obdivovať. Množstvo kultúrnych pamiatok,
		termálne kúpalisko, vínne cesty, prehliadka mesta, výlet do Ostrihomu a okolia Vám
		zaručia, že Vaša plavba bude plná zážitkov a radi sa sem znova vrátite. Výlety vieme
		zabezpečiť priamo u nás. Stačí len prikotviť!
	</p>
	<p><img src="/images/kvi.png" alt="Kormorán VI" /></p>
</div>
