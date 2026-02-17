<script lang="ts">
	import type { PageData } from './$types';
	import { t, getNavRoutes } from '$lib/i18n';
	import { SEO } from '$lib/seo';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
	const routes = $derived(getNavRoutes(data.lang));
</script>

<SEO
	title={translations.about.title}
	description={translations.seo.about}
	lang={data.lang}
/>

<!-- Hero Section - Classic Style with Image -->
<section class="relative min-h-[50vh] overflow-hidden bg-slate-800 md:min-h-[60vh]">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src="/images/teambuild.png"
			alt="Prístav Kormorán"
			class="h-full w-full object-cover opacity-40"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-5 py-24 text-center sm:px-6 md:min-h-[60vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-wheel"></span>
			<span>{translations.nav.about}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
			{translations.about.title}
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
			{translations.about.introText?.slice(0, 150)}...
		</p>
	</div>
</section>

<!-- Content Sections -->
<section class="bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
		<!-- Intro -->
		<div class="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mb-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-anchor" style="font-size: 22px;"></span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.intro}
			</h2>
			<p class="text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.about.introText}
			</p>
		</div>

		<!-- Events -->
		<div class="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mb-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-beach" style="font-size: 22px;"></span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.events}
			</h2>
			<p class="text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.about.eventsText}
			</p>
		</div>

		<!-- Corporate Events -->
		<div class="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mb-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-sailor" style="font-size: 22px;"></span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.corporateEvents}
			</h2>
			<p class="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.about.corporateEventsText}
			</p>
			<p class="text-gray-600">
				{translations.common.moreInfo}
				<a
					href="mailto:pristav@brossforpartners.sk"
					class="font-semibold text-orange-500 transition-colors hover:text-orange-600"
				>
					pristav@brossforpartners.sk
				</a>
			</p>
		</div>

		<!-- Image -->
		<div class="overflow-hidden rounded-xl shadow-xl lg:rounded-2xl">
			<img
				src="/images/teambuild.png"
				alt="Teambuilding"
				class="w-full"
			/>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-white py-12 md:py-16 lg:py-20">
	<div class="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-5">
			{translations.home.ctaTitle}
		</h2>
		<p class="mx-auto mb-8 max-w-2xl text-base text-gray-600 md:text-lg">
			{translations.home.ctaSubtitle}
		</p>
		<a
			href={routes.contact}
			class="inline-flex items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
		>
			<span>{translations.home.contactUs}</span>
			<span class="icon-mail"></span>
		</a>
	</div>
</section>
