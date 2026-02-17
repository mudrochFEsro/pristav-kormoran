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
	title={translations.boatTrips.title}
	description={translations.seo.boatTrips}
	lang={data.lang}
	includeHowTo={true}
/>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
	<!-- Decorative blobs -->
	<div class="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/40 blur-3xl"></div>
	<div class="absolute -right-40 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100/30 to-rose-100/30 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
			{translations.nav.boatTrips}
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
			{translations.boatTrips.title}
		</h1>
		<div class="mx-auto h-12 w-64">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full" />
		</div>
	</div>
</section>

<!-- Hero Image -->
<section class="bg-white py-12">
	<div class="mx-auto max-w-5xl px-4">
		<div class="group relative">
			<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
			<div class="relative overflow-hidden rounded-2xl shadow-2xl">
				<img
					src="/images/plavby-lodou-ondava-neng.png"
					alt={translations.boatTrips.title}
					class="w-full transition-transform duration-700 group-hover:scale-105"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
			</div>
		</div>
	</div>
</section>

<!-- Content -->
<section class="bg-gradient-to-b from-white to-gray-50 py-20">
	<div class="mx-auto max-w-4xl px-4">
		<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-12">
			<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl">⛵</span>
			</div>
			<p class="mb-6 text-lg leading-relaxed text-gray-600">
				{translations.boatTrips.description}
			</p>
			<div class="flex items-center gap-3 rounded-xl bg-orange-50 p-4">
				<span class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
					📞
				</span>
				<div>
					<span class="text-sm text-gray-500">{translations.boatTrips.contactLabel}</span>
					<a
						href="tel:+421903727168"
						class="block font-medium text-orange-600 hover:text-orange-700"
					>
						+421 903 727 168
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
