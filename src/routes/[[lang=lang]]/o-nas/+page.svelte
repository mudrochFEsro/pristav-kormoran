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

<br />
<PageTitle title={translations.about.title} hasImage={false} />
<Divider />
<div class="static-text">
	{#if data.lang === 'ru'}
		<p><strong>ВВЕДЕНИЕ</strong></p>
		<p>
			Порты Корморан расположены в Братиславе, Чилистове и Штурово. Порты для каютных
			судов, экскурсионных лодок и малых судов предлагают множество мероприятий и
			привлекательную среду для приятного времяпрепровождения с семьёй, друзьями или
			деловыми партнёрами.
		</p>
		<p><strong>МЕРОПРИЯТИЯ</strong></p>
		<p>
			Наш корабль Ondava может стать частью вашего праздника, тимбилдинга, свадьбы,
			конференции или другого запланированного мероприятия.
		</p>
		<p><strong>Корпоративные мероприятия</strong></p>
		<p>
			Превратите ваш корпоративный тимбилдинг, вечеринку, фуршет, деловую встречу или
			другое корпоративное событие в незабываемый опыт. На нашем корабле или в порту
			Корморан в Чилистове мы будем рады помочь с организацией запланированного
			мероприятия. По вашим требованиям мы подготовим ценовое предложение и обеспечим
			кейтеринг, оформление, реализацию, звукооборудование, программу и многие другие
			услуги, включая проживание.
		</p>
	{:else}
		<p><strong>ÚVOD</strong></p>
		<p>
			Prístavy Kormorán sa nachádzajú v Bratislave, Čilistove aj Štúrove. Prístavy pre
			kajutové plavidlá, výletné lode a malé plavidlá ponúkajú množstvo aktivít a atraktívne
			prostredie na príjemné strávenie voľných chvíľ s rodinou, priateľmi alebo so svojimi
			obchodnými partnermi.
		</p>
		<p><strong>EVENTY</strong></p>
		<p>
			Naša loď Ondava môže byť súčasťou Vašej oslavy, teambuildingu, svadby, konferencie
			alebo iného plánovaného podujatia.
		</p>
		<p><strong>Firemné eventy</strong></p>
		<p>
			Premeňte Váš firemný teambuilding, večierok, raut, business stretnutie alebo inú
			firemnú udalosť na zážitok. Na našej lodi alebo v Prístave Kormorán v Čilistove Vám s
			radosťou pomôžeme s realizáciou plánovaného eventu. Podľa Vašich požiadaviek
			vypracujeme cenovú ponuku a zabezpečíme catering, výzdobu, realizáciu, ozvučenie,
			sprievodný program a mnoho ďalších služieb vrátane ubytovania. Viac info na
			pristav@brossforpartners.sk.
		</p>
	{/if}
	<p><img style="max-width: 670px;" src="/images/teambuild.png" alt="Teambuilding" /></p>
</div>
