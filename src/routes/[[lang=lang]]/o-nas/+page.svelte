<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import { LampEffect, TextGenerateEffect, Sparkles } from '$lib/components/ui';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.about.title}
	description={translations.seo.about}
	lang={data.lang}
/>

<!-- Hero Section with Lamp Effect -->
<LampEffect className="min-h-[60vh]">
	<div class="text-center">
		<span class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
			<span>⚓</span>
			<span>{translations.nav.about}</span>
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
			{translations.about.title}
		</h1>
		<div class="mx-auto max-w-xl">
			<TextGenerateEffect
				words={translations.about.introText?.slice(0, 120) + '...' || 'Od roku 1994 na Dunaji'}
				className="text-gray-400 text-lg"
				duration={0.06}
			/>
		</div>
		<div class="mx-auto mt-8 h-8 w-48">
			<Sparkles particleColor="#f97316" particleDensity={25} className="h-full w-full opacity-70" />
		</div>
	</div>
</LampEffect>

<!-- Content Sections -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4">
		<!-- Intro -->
		<div class="mb-16 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-lg md:p-12">
			<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl text-orange-500">✦</span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.intro}
			</h2>
			<p class="text-lg leading-relaxed text-gray-600">
				{translations.about.introText}
			</p>
		</div>

		<!-- Events -->
		<div class="mb-16 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-12">
			<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl">🎉</span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.events}
			</h2>
			<p class="text-lg leading-relaxed text-gray-600">
				{translations.about.eventsText}
			</p>
		</div>

		<!-- Corporate Events -->
		<div class="mb-16 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-amber-50/30 p-8 shadow-lg md:p-12">
			<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100">
				<span class="text-2xl">🏢</span>
			</div>
			<h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
				{translations.about.corporateEvents}
			</h2>
			<p class="mb-6 text-lg leading-relaxed text-gray-600">
				{translations.about.corporateEventsText}
			</p>
			<p class="text-gray-600">
				{translations.common.moreInfo}
				<a
					href="mailto:pristav@brossforpartners.sk"
					class="font-medium text-orange-500 underline-offset-4 hover:underline"
				>
					pristav@brossforpartners.sk
				</a>
			</p>
		</div>

		<!-- Teambuilding image -->
		<div class="group relative">
			<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
			<div class="relative overflow-hidden rounded-2xl shadow-2xl">
				<img
					src="/images/teambuild.png"
					alt="Teambuilding"
					class="w-full transition-transform duration-700 group-hover:scale-105"
				/>
			</div>
		</div>
	</div>
</section>
