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
	title={translations.news.title}
	description={translations.seo.news}
	lang={data.lang}
	type="article"
	article={{ publishedTime: '2020-11-03' }}
/>

<!-- Hero Section - Classic Style -->
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-sailor"></span>
			<span>{translations.nav.news}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{translations.news.articleTitle}
		</h1>
	</div>
</section>

<!-- Article Content -->
<section class="bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
		<!-- Date Badge -->
		<div class="mb-8 flex justify-center">
			<span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
				<span class="icon-calendar"></span>
				3.11.2020
			</span>
		</div>

		<!-- Article Card -->
		<article class="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8 lg:p-10">
			<p class="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">
				{translations.news.articleText}
			</p>

			<div class="mb-8 flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
				<span class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
					<span class="icon-phone" style="font-size: 18px;"></span>
				</span>
				<div>
					<span class="text-sm text-gray-500">{translations.news.contactOrders}</span>
					<a
						href="tel:+421903614663"
						class="block font-semibold text-orange-500 transition-colors hover:text-orange-600"
					>
						+421 903 614 663
					</a>
				</div>
			</div>

			<!-- Image -->
			<div class="overflow-hidden rounded-xl shadow-lg">
				<img
					src="/images/ondava-2.jpg"
					alt="Ondava"
					class="w-full"
				/>
			</div>
		</article>
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
