<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import { Sparkles } from '$lib/components/ui';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.news.title}
	description={translations.seo.news}
	lang={data.lang}
	type="article"
	article={{ publishedTime: '2020-11-03' }}
/>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
	<!-- Decorative blobs -->
	<div class="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/40 blur-3xl"></div>
	<div class="absolute -right-40 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100/30 to-rose-100/30 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
			{translations.nav.news}
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
			{translations.news.articleTitle}
		</h1>
		<div class="mx-auto h-12 w-64">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full" />
		</div>
	</div>
</section>

<!-- Article Content -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4">
		<!-- Date Badge -->
		<div class="mb-8 flex justify-center">
			<span class="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
				📅 3.11.2020
			</span>
		</div>

		<!-- Article Card -->
		<article class="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-lg md:p-12">
			<p class="mb-6 text-lg leading-relaxed text-gray-600">
				{translations.news.articleText}
			</p>

			<div class="mb-8 flex items-center gap-3 rounded-xl bg-orange-50 p-4">
				<span class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
					📞
				</span>
				<div>
					<span class="text-sm text-gray-500">{translations.news.contactOrders}</span>
					<a
						href="tel:+421903614663"
						class="block font-medium text-orange-600 hover:text-orange-700"
					>
						+421 903 614 663
					</a>
				</div>
			</div>

			<!-- Image -->
			<div class="group relative overflow-hidden rounded-xl">
				<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
				<img
					src="/images/ondava-2.jpg"
					alt="Ondava"
					class="relative w-full transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
		</article>
	</div>
</section>
