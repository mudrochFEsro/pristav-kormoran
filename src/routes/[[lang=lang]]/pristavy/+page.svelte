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

	// All ports data
	const ports = $derived([
		{
			title: translations.ports.port1Title,
			text: translations.ports.port1Text,
			image: '/images/kormoran-i2.jpg',
			mapImage: '/images/ki.png',
			link: 'http://www.hotelkormoran.sk/'
		},
		{
			title: translations.ports.port2Title,
			text: translations.ports.port2Text,
			image: '/images/kormoran-ii2.jpg',
			mapImage: null,
			link: null
		},
		{
			title: translations.ports.port3Title,
			text: translations.ports.port3Text,
			image: '/images/kormoran-iii1.jpg',
			mapImage: '/images/kiii.png',
			link: null
		},
		{
			title: translations.ports.port4Title,
			text: translations.ports.port4Text,
			image: '/images/kormoran-iv.jpg',
			mapImage: '/images/kiv.png',
			link: null
		},
		{
			title: translations.ports.port5Title,
			text: translations.ports.port5Text,
			image: '/images/kormoran-v1.jpg',
			mapImage: '/images/kv.png',
			link: null
		},
		{
			title: translations.ports.port6Title,
			text: translations.ports.port6Text,
			image: '/images/sturovo-pristav.png',
			mapImage: '/images/kvi.png',
			link: null
		}
	]);
</script>

<SEO
	title={translations.ports.title}
	description={translations.seo.ports}
	lang={data.lang}
/>

<!-- Hero Section - Classic Style -->
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
			alt="Prístavy Kormorán"
			class="h-full w-full object-cover opacity-40"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
		<span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-anchor"></span>
			<span>{translations.nav.ports}</span>
		</span>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{translations.ports.title}
		</h1>
	</div>
</section>

<!-- Ports Grid -->
{#each ports as port, i (i)}
	<section class="py-16 md:py-20 {i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
		<div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
			<div class="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
				<!-- Image -->
				<div class="relative {i % 2 === 1 ? 'lg:order-2' : ''}">
					<div class="overflow-hidden rounded-xl shadow-xl lg:rounded-2xl">
						<img
							src={port.image}
							alt={port.title}
							class="w-full"
							loading={i === 0 ? 'eager' : 'lazy'}
						/>
					</div>
					<!-- Accent border -->
					<div class="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border-2 border-orange-500/30 lg:-bottom-4 lg:-right-4 lg:rounded-2xl"></div>
				</div>

				<!-- Content -->
				<div class="{i % 2 === 1 ? 'lg:order-1' : ''}">
					<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
						<span class="icon-anchor"></span>
						<span>Prístav {i + 1}</span>
					</span>
					<h2 class="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-6 md:text-4xl">
						{port.title}
					</h2>
					<p class="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">
						{port.text}
						{#if port.link}
							{translations.ports.moreInfo}
							<a
								href={port.link}
								target="_blank"
								class="font-semibold text-orange-500 transition-colors hover:text-orange-600"
							>
								www.hotelkormoran.sk
							</a>
						{/if}
					</p>

					{#if port.mapImage}
						<div class="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-md">
							<img
								src={port.mapImage}
								alt="{port.title} mapa"
								class="w-full"
								loading="lazy"
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/each}

<!-- CTA Section -->
<section class="bg-slate-800 py-16 md:py-20">
	<div class="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
		<h2 class="mb-5 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl">
			{translations.home.ctaTitle}
		</h2>
		<p class="mx-auto mb-8 max-w-2xl text-base text-gray-300 md:text-lg">
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
