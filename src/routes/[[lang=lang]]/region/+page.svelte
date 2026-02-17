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
	title={translations.region.title}
	description={translations.seo.region}
	lang={data.lang}
/>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
	<!-- Decorative blobs -->
	<div class="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/40 blur-3xl"></div>
	<div class="absolute -right-40 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100/30 to-rose-100/30 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
			{translations.nav.region}
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
			{translations.region.title}
		</h1>
		<div class="mx-auto h-12 w-64">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full" />
		</div>
	</div>
</section>

<!-- Content -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4">
		<!-- Žitný Ostrov Card -->
		<div class="mb-12 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-lg md:p-12">
			<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl">🏝️</span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.region.zitnyOstrov}
			</h2>
			<p class="mb-8 text-lg leading-relaxed text-gray-600">
				{translations.region.zitnyOstrovText}
			</p>

			<!-- Image -->
			<div class="group relative overflow-hidden rounded-xl">
				<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
				<img
					src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
					alt="Kormorán Čilistov"
					class="relative w-full transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Cycle Path Card -->
		<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-12">
			<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl">🚴</span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.region.cyclePath}
			</h2>

			<!-- Map Image -->
			<div class="group relative overflow-hidden rounded-xl border border-gray-100">
				<img
					src="/images/cyklotrasa.png"
					alt={translations.region.cyclePath}
					class="w-full transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</section>
