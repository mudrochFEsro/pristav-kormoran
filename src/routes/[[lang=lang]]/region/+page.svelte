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
	title={translations.region.title}
	description={translations.seo.region}
	lang={data.lang}
/>

<!-- Hero Section - Classic Style -->
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
			alt="Žitný ostrov"
			class="h-full w-full object-cover opacity-40"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-earth"></span>
			<span>{translations.nav.region}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{translations.region.title}
		</h1>
	</div>
</section>

<!-- Content -->
<section class="bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
		<!-- Žitný Ostrov Card -->
		<div class="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:mb-12 md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-earth" style="font-size: 22px;"></span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.region.zitnyOstrov}
			</h2>
			<p class="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.region.zitnyOstrovText}
			</p>

			<!-- Image -->
			<div class="overflow-hidden rounded-xl shadow-lg">
				<img
					src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
					alt="Kormorán Čilistov"
					class="w-full"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Cycle Path Card -->
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8 lg:p-10">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
				<span class="icon-destination" style="font-size: 22px;"></span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.region.cyclePath}
			</h2>

			<!-- Map Image -->
			<div class="overflow-hidden rounded-xl border border-gray-200">
				<img
					src="/images/cyklotrasa.png"
					alt={translations.region.cyclePath}
					class="w-full"
					loading="lazy"
				/>
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
		<a
			href={routes.contact}
			class="inline-flex items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
		>
			<span>{translations.home.contactUs}</span>
			<span class="icon-mail"></span>
		</a>
	</div>
</section>
