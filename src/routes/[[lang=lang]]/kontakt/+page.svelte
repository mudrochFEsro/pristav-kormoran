<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';

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

<!-- Hero Section - Classic Style -->
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-mail"></span>
			<span>{translations.nav.contact}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{translations.contact.title}
		</h1>
	</div>
</section>

<!-- Contact Info -->
<section class="bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
		<div class="grid gap-6 md:grid-cols-2 md:gap-8">
			<!-- Port Manager Card -->
			<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
				<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
					<span class="icon-sailor" style="font-size: 22px;"></span>
				</div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">
					{translations.contact.portManager}
				</h2>
				<p class="mb-5 text-lg font-semibold text-gray-800">Andrej Barát</p>
				<div class="space-y-4">
					<a
						href="tel:+421903727168"
						class="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-500"
					>
						<span class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
							<span class="icon-phone" style="font-size: 18px;"></span>
						</span>
						<span>+421 903 727 168</span>
					</a>
					<a
						href="mailto:pristav@brossforpartners.sk"
						class="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-500"
					>
						<span class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
							<span class="icon-mail" style="font-size: 18px;"></span>
						</span>
						<span>pristav@brossforpartners.sk</span>
					</a>
				</div>
			</div>

			<!-- Company Info Card -->
			<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
				<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
					<span class="icon-anchor" style="font-size: 22px;"></span>
				</div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">
					{translations.contact.operator}
				</h2>
				<p class="mb-5 text-lg font-semibold text-gray-800">BROSS for PARTNERS, a.s.</p>

				<div class="space-y-4 text-gray-600">
					<div>
						<span class="text-sm font-medium uppercase tracking-wide text-gray-400">{translations.contact.address}</span>
						<p class="mt-1">Hollého 1, 81108, Bratislava</p>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<span class="text-sm font-medium uppercase tracking-wide text-gray-400">{translations.contact.ico}</span>
							<p class="mt-1">35 853 603</p>
						</div>
						<div>
							<span class="text-sm font-medium uppercase tracking-wide text-gray-400">{translations.contact.dic}</span>
							<p class="mt-1">2021727004</p>
						</div>
					</div>
					<div>
						<span class="text-sm font-medium uppercase tracking-wide text-gray-400">{translations.contact.icdph}</span>
						<p class="mt-1">SK2021727004</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
