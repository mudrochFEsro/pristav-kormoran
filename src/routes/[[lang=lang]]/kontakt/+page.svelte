<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import { BackgroundBeams, TextGenerateEffect, Sparkles } from '$lib/components/ui';

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

<!-- Hero Section with Background Beams -->
<BackgroundBeams className="min-h-[50vh] py-24">
	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
			<span>📍</span>
			<span>{translations.nav.contact}</span>
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
			{translations.contact.title}
		</h1>
		<div class="mx-auto max-w-lg">
			<TextGenerateEffect
				words="Kontaktujte nás pre viac informácií o našich službách a prístavoch na Dunaji."
				className="text-gray-400 text-lg"
				duration={0.05}
			/>
		</div>
		<div class="mx-auto mt-8 h-8 w-48">
			<Sparkles particleColor="#f97316" particleDensity={25} className="h-full w-full opacity-70" />
		</div>
	</div>
</BackgroundBeams>

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
