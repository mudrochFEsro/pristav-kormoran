<script lang="ts">
	import type { PageData } from './$types';
	import { t, getNavRoutes } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import {
		WaveEffect,
		InfiniteMovingCards
	} from '$lib/components/ui';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
	const routes = $derived(getNavRoutes(data.lang));

	// Services data
	const services = $derived([
		{
			title: translations.categories.entertainment,
			description: translations.home.introText?.slice(0, 100) + '...',
			image: '/images/fun-thumb.png',
			icon: 'icon-beach'
		},
		{
			title: translations.categories.sport,
			description: translations.home.servicesText?.slice(0, 100) + '...',
			image: '/images/sports-thumb.png',
			icon: 'icon-tennis'
		},
		{
			title: translations.categories.relax,
			description: translations.home.locationText?.slice(0, 100) + '...',
			image: '/images/relax-thumb.png',
			icon: 'icon-anchor'
		},
		{
			title: translations.categories.traditions,
			description: translations.home.description?.slice(0, 100) + '...',
			image: '/images/tradition-thumb.png',
			icon: 'icon-ship'
		}
	]);

	// Ports for infinite carousel
	const ports = $derived([
		{
			title: 'Kormorán I',
			image: '/images/kormoran-i2.jpg',
			description: 'Čilistov',
			link: routes.ports
		},
		{
			title: 'Kormorán II',
			image: '/images/kormoran-ii2.jpg',
			description: 'Čilistov',
			link: routes.ports
		},
		{
			title: 'Kormorán III',
			image: '/images/kormoran-iii1.jpg',
			description: 'Čilistov',
			link: routes.ports
		},
		{
			title: 'Kormorán IV',
			image: '/images/kormoran-iv.jpg',
			description: 'Dobrohošť',
			link: routes.ports
		}
	]);

	// Amenities list
	const amenities = $derived([
		{ icon: 'icon-anchor', title: translations.home.electricity, desc: translations.home.electricityDesc },
		{ icon: 'icon-life-wheel', title: translations.home.water, desc: translations.home.waterDesc },
		{ icon: 'icon-earth', title: translations.home.wifi, desc: translations.home.wifiDesc },
		{ icon: 'icon-ship', title: translations.home.service, desc: translations.home.serviceDesc },
		{ icon: 'icon-wheel', title: translations.home.parking, desc: translations.home.parkingDesc },
		{ icon: 'icon-sailor', title: translations.home.security, desc: translations.home.securityDesc }
	]);
</script>

<SEO
	title={translations.site.title}
	description={translations.seo.home}
	lang={data.lang}
	includeFaq={true}
/>

<!-- Hero Section - Classic Maritime Style -->
<section class="relative min-h-[85vh] overflow-hidden bg-white md:min-h-screen">
	<!-- Hero Image Background -->
	<div class="absolute inset-0">
		<img
			src="/images/static-main.jpg"
			alt="Prístav Kormorán"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[85vh] flex-col items-start justify-center px-5 py-24 sm:px-6 md:min-h-screen md:py-32 lg:px-8">
		<div class="mx-auto w-full max-w-7xl">
			<!-- Badge -->
			<div class="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm md:mb-6">
				<span class="icon-anchor text-orange-400"></span>
				<span class="text-sm font-medium text-white">{translations.home.badge}</span>
			</div>

			<!-- Main title -->
			<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
				{translations.home.brandName}
			</h1>

			<!-- Subtitle -->
			<p class="mb-6 max-w-xl text-lg text-white/80 md:mb-8 md:text-xl lg:text-2xl">
				{translations.home.intro}
			</p>

			<!-- Description - hidden on small mobile -->
			<p class="mb-8 hidden max-w-2xl text-base leading-relaxed text-white/70 sm:block md:mb-10 md:text-lg">
				{translations.home.introText?.slice(0, 180)}...
			</p>

			<!-- CTA Buttons -->
			<div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
				<a
					href={routes.ports}
					class="inline-flex items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl sm:px-8 sm:py-4"
				>
					<span>{translations.home.explorePorts}</span>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href={routes.botel}
					class="inline-flex items-center justify-center gap-2.5 rounded-lg border-2 border-white/40 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 sm:px-8 sm:py-4"
				>
					<span>{translations.nav.botel}</span>
					<span class="icon-life-wheel text-orange-400"></span>
				</a>
			</div>

			<!-- Stats Row - Desktop -->
			<div class="mt-12 hidden gap-8 border-t border-white/20 pt-8 md:flex lg:mt-16 lg:gap-12 lg:pt-10">
				<div>
					<div class="text-3xl font-bold text-orange-400 lg:text-4xl">30+</div>
					<div class="text-sm text-white/70">{translations.home.years}</div>
				</div>
				<div>
					<div class="text-3xl font-bold text-orange-400 lg:text-4xl">4</div>
					<div class="text-sm text-white/70">{translations.home.ports}</div>
				</div>
				<div>
					<div class="text-3xl font-bold text-orange-400 lg:text-4xl">200+</div>
					<div class="text-sm text-white/70">{translations.home.spots}</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce md:bottom-10 md:block">
		<div class="flex flex-col items-center gap-2 text-white/60">
			<span class="text-xs uppercase tracking-widest">{translations.home.scroll}</span>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</div>
	</div>
</section>

<!-- About Section - Clean White Background -->
<section class="relative bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-10 text-center md:mb-14">
			<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
				<span class="icon-anchor"></span>
				<span>{translations.home.aboutUs}</span>
			</span>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
				{translations.home.intro}
			</h2>
		</div>

		<div class="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Image -->
			<div class="relative order-2 lg:order-1">
				<div class="overflow-hidden rounded-xl shadow-xl lg:rounded-2xl">
					<img
						src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
						alt="Prístav Kormorán"
						class="w-full"
					/>
				</div>
				<!-- Accent border -->
				<div class="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border-2 border-orange-500/30 lg:-bottom-4 lg:-right-4 lg:rounded-2xl"></div>
			</div>

			<!-- Text content -->
			<div class="order-1 lg:order-2">
				<p class="mb-6 text-base leading-relaxed text-gray-600 md:mb-8 md:text-lg">
					{translations.home.introText}
				</p>

				<!-- Features list -->
				<ul class="mb-8 space-y-4">
					<li class="flex items-start gap-3">
						<span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm text-white">✓</span>
						<span class="text-gray-700">{translations.home.fromBratislava}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm text-white">✓</span>
						<span class="text-gray-700">{translations.home.onDanube}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm text-white">✓</span>
						<span class="text-gray-700">{translations.home.freeParking}</span>
					</li>
				</ul>

				<a
					href={routes.about}
					class="inline-flex items-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-600"
				>
					<span>{translations.home.learnMore}</span>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Services Section - Classic Cards -->
<section class="relative bg-white py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-10 text-center md:mb-14">
			<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
				<span class="icon-ship"></span>
				<span>{translations.home.ourServices}</span>
			</span>
			<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:mb-5 lg:text-5xl">
				{translations.home.services}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
				{translations.home.servicesText}
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
			{#each services as service, i (i)}
				<div class="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
					<!-- Image -->
					<div class="relative h-40 w-full overflow-hidden sm:h-44">
						<img
							src={service.image}
							alt={service.title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
						<!-- Icon -->
						<div class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-white shadow-lg">
							<span class={service.icon} style="font-size: 24px;"></span>
						</div>
					</div>

					<!-- Content -->
					<div class="p-5 text-center md:p-6">
						<h3 class="mb-2 text-base font-bold uppercase tracking-wide text-gray-900 sm:text-lg">
							{service.title}
						</h3>
						<p class="text-sm leading-relaxed text-gray-500">
							{service.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Ports Carousel Section - Light Gray Background -->
<section class="relative overflow-hidden bg-gray-50 py-16 md:py-20 lg:py-24">
	<div class="mb-10 px-5 text-center sm:px-6 md:mb-14 lg:px-8">
		<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
			<span class="icon-anchor"></span>
			<span>{translations.home.ourPorts}</span>
		</span>
		<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:mb-5 lg:text-5xl">
			{translations.nav.ports}
		</h2>
		<p class="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
			{translations.home.location}
		</p>
	</div>

	<!-- Infinite scrolling cards -->
	<InfiniteMovingCards
		items={ports}
		speed="slow"
		direction="left"
		pauseOnHover={true}
		className="mx-auto"
	/>

	<div class="mt-10 px-5 text-center sm:px-6 md:mt-12 lg:px-8">
		<a
			href={routes.ports}
			class="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl sm:w-auto"
		>
			<span>{translations.home.showAllPorts}</span>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>

<!-- Location Section - Navy Blue Accent -->
<section class="relative overflow-hidden bg-slate-800 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="order-2 lg:order-1">
				<div class="overflow-hidden rounded-xl shadow-2xl lg:rounded-2xl">
					<img
						src="/images/kormoran-i2.jpg"
						alt="Kormorán Čilistov"
						class="w-full"
					/>
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
					<span class="icon-place"></span>
					<span>{translations.home.locality}</span>
				</span>
				<h2 class="mb-5 text-3xl font-bold text-white sm:text-4xl md:mb-6 lg:text-5xl">
					{translations.home.location}
				</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-300 md:mb-8 md:text-lg">
					{translations.home.locationText}
				</p>

				<!-- Location highlights -->
				<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mb-10">
					<div class="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
						<div class="text-2xl font-bold text-orange-400">25 km</div>
						<div class="text-sm text-gray-300">{translations.home.fromBratislava}</div>
					</div>
					<div class="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
						<div class="icon-anchor text-2xl text-orange-400"></div>
						<div class="text-sm text-gray-300">{translations.home.onDanube}</div>
					</div>
					<div class="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
						<div class="text-2xl font-bold text-orange-400">P</div>
						<div class="text-sm text-gray-300">{translations.home.freeParking}</div>
					</div>
				</div>

				<a
					href={routes.contact}
					class="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl sm:w-auto"
				>
					<span>{translations.nav.contact}</span>
					<span class="icon-mail"></span>
				</a>
			</div>
		</div>
	</div>

	<!-- Wave at bottom -->
	<div class="absolute inset-x-0 bottom-0">
		<WaveEffect waveColor="#f8fafc" waveOpacity={0.1} className="h-20 md:h-28" />
	</div>
</section>

<!-- Amenities Section - Clean Grid -->
<section class="relative bg-white py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-10 text-center md:mb-14">
			<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
				<span class="icon-wheel"></span>
				<span>{translations.home.amenities}</span>
			</span>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
				{translations.home.amenitiesSubtitle}
			</h2>
		</div>

		<!-- Amenities Grid -->
		<div class="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
			{#each amenities as amenity, i (i)}
				<div class="group flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 md:p-6">
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
						<span class={amenity.icon} style="font-size: 22px;"></span>
					</div>
					<div>
						<h3 class="mb-1 font-bold text-gray-900">{amenity.title}</h3>
						<p class="text-sm leading-relaxed text-gray-500">{amenity.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Banner Section -->
<section class="relative bg-gray-50 py-12 md:py-16 lg:py-20">
	<div class="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
		<a
			href="http://cilistovskalaguna.sk/?utm_source=pristavkormoran"
			class="group relative block overflow-hidden rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:rounded-2xl"
		>
			<img
				src="/images/banner-laguna.jpg"
				alt="Čilistovská lagúna"
				class="w-full transition-transform duration-500 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
			<div class="absolute inset-0 flex items-center p-5 sm:p-8 md:p-10">
				<div>
					<span class="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white sm:mb-3 sm:px-4 sm:py-1.5 sm:text-sm">
						<span class="icon-beach"></span>
						<span>{translations.home.partner}</span>
					</span>
					<h3 class="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">{translations.home.partnerTitle}</h3>
					<p class="mt-1 text-sm text-white/80 sm:mt-2 sm:text-base md:text-lg">{translations.home.partnerSubtitle}</p>
					<div class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition-colors group-hover:text-orange-300 sm:mt-4 sm:text-base">
						<span>{translations.home.learnMore}</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</div>
				</div>
			</div>
		</a>
	</div>
</section>

<!-- CTA Section - Clean Classic Style -->
<section class="relative bg-slate-800 py-16 md:py-20 lg:py-24">
	<div class="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
		<span class="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
			<span class="icon-mail"></span>
			<span>{translations.home.contactUs}</span>
		</span>
		<h2 class="mb-5 text-3xl font-bold text-white sm:text-4xl md:mb-6 lg:text-5xl">
			{translations.home.ctaTitle}
		</h2>
		<p class="mx-auto mb-8 max-w-2xl text-base text-gray-300 md:mb-10 md:text-lg">
			{translations.home.ctaSubtitle}
		</p>

		<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
			<a
				href={routes.contact}
				class="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl sm:w-auto"
			>
				<span>{translations.home.contactUs}</span>
				<span class="icon-mail"></span>
			</a>

			<a
				href="tel:+421903727168"
				class="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:w-auto"
			>
				<span class="icon-phone text-orange-400"></span>
				<span>+421 903 727 168</span>
			</a>
		</div>
	</div>
</section>
