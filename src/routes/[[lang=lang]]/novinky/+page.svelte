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
	<title>{translations.news.title} - {translations.site.title}</title>
</svelte:head>

<h1 class="static-title static-title-no-img">Sladké pokušenie počas prechádzky</h1>
<Divider />
<div class="static-date">3.11.2020</div>
<div class="static-text">
	<p>
		Aj keď už plavby loďou v tejto sezóne skončili, prechádzky popri Prístave Kormorán v
		Čilistove sú vždy pekným zážitkom. Počas prechádzky si môžete objednať v Hoteli Kormorán
		úžasné domáce pečivo.
	</p>
	<p>Kontakt pre objednávky sladkých koláčikov: +421 903 614 663</p>
	<p><img src="/images/ondava-2.jpg" alt="Ondava" /></p>
</div>
