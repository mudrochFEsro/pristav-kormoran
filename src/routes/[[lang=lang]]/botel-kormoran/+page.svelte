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
	title={translations.botel.title}
	description={translations.seo.botel}
	lang={data.lang}
/>

<!-- Hero Section - Classic Style -->
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src="/images/botel-ubytovanie-restauracia1.jpg"
			alt="Botel Kormorán"
			class="h-full w-full object-cover opacity-40"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-life-wheel"></span>
			<span>{translations.nav.botel}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{translations.botel.title}
		</h1>
	</div>
</section>

<!-- Content -->
<section class="bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
		<!-- Description Card -->
		<div class="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mb-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-ship" style="font-size: 22px;"></span>
			</div>
			<p class="text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.botel.description}
			</p>
			<p class="mt-4 text-gray-600">
				{translations.botel.contactInfo}
			</p>
		</div>

		<!-- Gallery -->
		<div class="grid gap-5 sm:grid-cols-2 md:gap-6">
			<div class="overflow-hidden rounded-xl shadow-xl">
				<img
					src="/images/botel-ubytovanie-restauracia1.jpg"
					alt="Botel Restaurant"
					class="w-full"
					loading="lazy"
				/>
			</div>
			<div class="overflow-hidden rounded-xl shadow-xl">
				<img
					src="/images/sundeck-chillout-zona.jpg"
					alt="Sundeck"
					class="w-full"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Room Types Card -->
		<div class="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mt-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-anchor" style="font-size: 22px;"></span>
			</div>
			<p class="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.botel.roomTypes}
			</p>
			<div class="grid gap-5 sm:grid-cols-2 md:gap-6">
				<div class="overflow-hidden rounded-xl shadow-lg">
					<img
						src="/images/img3409.jpg"
						alt="Room"
						class="w-full"
						loading="lazy"
					/>
				</div>
				<div class="overflow-hidden rounded-xl shadow-lg">
					<img
						src="/images/img3416-1.jpg"
						alt="Room interior"
						class="w-full"
						loading="lazy"
					/>
				</div>
			</div>
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
