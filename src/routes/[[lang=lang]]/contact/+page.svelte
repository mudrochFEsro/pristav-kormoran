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
	title={translations.contact.title}
	description={translations.seo.contact}
	lang={data.lang}
/>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
	<!-- Decorative blobs -->
	<div class="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/40 blur-3xl"></div>
	<div class="absolute -right-40 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100/30 to-rose-100/30 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
			{translations.nav.contact}
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
			{translations.contact.title}
		</h1>
		<div class="mx-auto h-12 w-64">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full" />
		</div>
	</div>
</section>

<!-- Contact Info -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4">
		<div class="grid gap-8 md:grid-cols-2">
			<!-- Port Manager Card -->
			<div class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
				<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
					<span class="text-2xl">👤</span>
				</div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">
					{translations.contact.portManager}
				</h2>
				<p class="mb-4 text-lg font-medium text-gray-700">Andrej Barát</p>
				<div class="space-y-3">
					<a
						href="tel:+421903727168"
						class="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-500"
					>
						<span class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
							📞
						</span>
						+421 903 727 168
					</a>
					<a
						href="mailto:pristav@brossforpartners.sk"
						class="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-500"
					>
						<span class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
							✉️
						</span>
						pristav@brossforpartners.sk
					</a>
				</div>
			</div>

			<!-- Company Info Card -->
			<div class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
				<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
					<span class="text-2xl">🏢</span>
				</div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">
					{translations.contact.operator}
				</h2>
				<p class="mb-6 text-lg font-medium text-gray-700">BROSS for PARTNERS, a.s.</p>

				<div class="space-y-4 text-gray-600">
					<div>
						<span class="text-sm font-medium text-gray-500">{translations.contact.address}</span>
						<p>Hollého 1, 81108, Bratislava</p>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<span class="text-sm font-medium text-gray-500">{translations.contact.ico}</span>
							<p>35 853 603</p>
						</div>
						<div>
							<span class="text-sm font-medium text-gray-500">{translations.contact.dic}</span>
							<p>2021727004</p>
						</div>
					</div>
					<div>
						<span class="text-sm font-medium text-gray-500">{translations.contact.icdph}</span>
						<p>SK2021727004</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
