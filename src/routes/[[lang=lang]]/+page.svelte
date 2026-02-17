<script lang="ts">
	import type { PageData } from './$types';
	import { t, getNavRoutes } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import {
		TextGenerateEffect,
		Sparkles,
		CardSpotlight,
		WaveEffect,
		InfiniteMovingCards,
		TypewriterEffect,
		BentoGrid,
		BentoGridItem,
		GlowingText,
		BackgroundBeams,
		LampEffect,
		MovingBorder
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
			description: translations.home.introText?.slice(0, 120) + '...',
			image: '/images/fun-thumb.png',
			icon: '⚓'
		},
		{
			title: translations.categories.sport,
			description: translations.home.servicesText?.slice(0, 100) + '...',
			image: '/images/sports-thumb.png',
			icon: '🚤'
		},
		{
			title: translations.categories.relax,
			description: translations.home.locationText?.slice(0, 100) + '...',
			image: '/images/relax-thumb.png',
			icon: '🌊'
		},
		{
			title: translations.categories.traditions,
			description: translations.home.description?.slice(0, 120) + '...',
			image: '/images/tradition-thumb.png',
			icon: '🎣'
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

	// Typewriter words - uses translated badge text as base
	const typewriterWords = $derived([
		translations.home.title || translations.home.brandName,
		translations.home.intro,
		translations.home.services,
		translations.home.badge
	]);
</script>

<SEO
	title={translations.site.title}
	description={translations.seo.home}
	lang={data.lang}
	includeFaq={true}
/>

<!-- Hero Section -->
<section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
	<!-- Animated grid background - smaller on mobile -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem]"></div>

	<!-- Gradient orbs - smaller and fewer on mobile -->
	<div class="absolute -left-20 top-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl md:-left-40 md:top-20 md:h-96 md:w-96"></div>
	<div class="absolute -right-20 bottom-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl md:-right-40 md:bottom-20 md:h-96 md:w-96"></div>
	<div class="absolute left-1/3 top-1/2 hidden h-64 w-64 rounded-full bg-orange-600/5 blur-3xl md:block"></div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center md:pt-0">
		<!-- Badge -->
		<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 md:mb-6 md:px-4 md:py-2">
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 md:h-2 md:w-2"></span>
			<span class="text-xs font-medium text-orange-300 md:text-sm">{translations.home.badge}</span>
		</div>

		<!-- Main title -->
		<h1 class="mb-3 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:mb-4 md:text-7xl lg:text-8xl">
			{translations.home.brandName}
		</h1>

		<!-- Typewriter subtitle -->
		<div class="mb-6 h-10 text-base text-gray-400 sm:text-lg md:mb-8 md:h-12 md:text-2xl">
			<TypewriterEffect
				words={typewriterWords}
				typingSpeed={80}
				deletingSpeed={40}
				pauseDuration={2500}
				className="text-orange-400/80"
			/>
		</div>

		<!-- Description - hidden on very small screens, visible from sm up -->
		<div class="mx-auto mb-8 hidden max-w-2xl sm:block md:mb-10">
			<TextGenerateEffect
				words={translations.home.introText?.slice(0, 150) + '...' || 'Moderné prístavy na Dunaji s kompletnými službami.'}
				className="text-gray-400 text-base md:text-lg leading-relaxed"
				duration={0.08}
			/>
		</div>

		<!-- CTA Buttons - stacked on mobile -->
		<div class="flex w-full max-w-md flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0">
			<a
				href={routes.ports}
				class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 sm:px-8 sm:py-4"
			>
				<span class="relative z-10">{translations.home.explorePorts}</span>
				<svg class="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
				<div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
			</a>
			<a
				href={routes.botel}
				class="inline-flex items-center justify-center gap-2 rounded-full border border-orange-500/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 sm:px-8 sm:py-4"
			>
				<span>{translations.nav.botel}</span>
				<span class="text-orange-400">→</span>
			</a>
		</div>

		<!-- Sparkles decoration - hidden on mobile for performance -->
		<div class="mt-10 hidden h-8 w-full max-w-md sm:mt-16 sm:block">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full opacity-60" />
		</div>
	</div>

	<!-- Wave effect at bottom - smaller on mobile -->
	<div class="absolute inset-x-0 bottom-0">
		<WaveEffect waveColor="#f97316" waveOpacity={0.15} className="h-24 md:h-48" />
	</div>

	<!-- Scroll indicator - hidden on mobile -->
	<div class="absolute bottom-16 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce sm:bottom-24 sm:block">
		<div class="flex flex-col items-center gap-2 text-orange-400/60">
			<span class="text-xs uppercase tracking-widest">{translations.home.scroll}</span>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="relative overflow-hidden bg-white py-12 md:py-24">
	<!-- Subtle background pattern -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.05)_0%,transparent_50%)]"></div>

	<div class="relative mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 md:gap-16 lg:grid-cols-2">
			<!-- Text content -->
			<div>
				<span class="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-600 md:mb-4 md:px-4 md:py-2">
					<span>⚓</span>
					<span>{translations.home.aboutUs}</span>
				</span>
				<h2 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-6 md:text-5xl">
					{translations.home.intro}
				</h2>
				<p class="mb-4 text-base leading-relaxed text-gray-600 md:mb-6 md:text-lg">
					{translations.home.introText}
				</p>
				<div class="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-6">
					<div class="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 sm:h-12 sm:w-12">
							<span class="text-lg sm:text-xl">🏆</span>
						</div>
						<div class="text-center sm:text-left">
							<div class="text-lg font-bold text-gray-900 sm:text-2xl">30+</div>
							<div class="text-xs text-gray-500 sm:text-sm">{translations.home.years}</div>
						</div>
					</div>
					<div class="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 sm:h-12 sm:w-12">
							<span class="text-lg sm:text-xl">⛵</span>
						</div>
						<div class="text-center sm:text-left">
							<div class="text-lg font-bold text-gray-900 sm:text-2xl">4</div>
							<div class="text-xs text-gray-500 sm:text-sm">{translations.home.ports}</div>
						</div>
					</div>
					<div class="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 sm:h-12 sm:w-12">
							<span class="text-lg sm:text-xl">🛥️</span>
						</div>
						<div class="text-center sm:text-left">
							<div class="text-lg font-bold text-gray-900 sm:text-2xl">200+</div>
							<div class="text-xs text-gray-500 sm:text-sm">{translations.home.spots}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Image -->
			<div class="group relative">
				<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
				<div class="relative overflow-hidden rounded-xl shadow-xl md:rounded-2xl md:shadow-2xl">
					<img
						src="/images/static-main.jpg"
						alt="Prístav Kormorán"
						class="w-full transition-transform duration-700 group-hover:scale-105"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
					<!-- Floating card -->
					<div class="absolute bottom-3 left-3 right-3 rounded-lg border border-white/20 bg-white/90 p-3 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-xl sm:p-4">
						<div class="flex items-center justify-between gap-2">
							<div class="min-w-0">
								<div class="truncate text-sm font-semibold text-gray-900 sm:text-base">{translations.home.largestMarina}</div>
								<div class="text-xs text-gray-500 sm:text-sm">Čilistov, {data.lang === 'en' ? 'Slovakia' : data.lang === 'ru' ? 'Словакия' : 'Slovensko'}</div>
							</div>
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white sm:h-10 sm:w-10">
								→
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="relative bg-gradient-to-b from-gray-50 to-white py-12 md:py-24">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-8 text-center md:mb-16">
			<span class="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-600 md:mb-4 md:px-4 md:py-2">
				<span>🌊</span>
				<span>{translations.home.ourServices}</span>
			</span>
			<h2 class="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-4 md:text-5xl">
				{translations.home.services}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
				{translations.home.servicesText}
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
			{#each services as service, i (i)}
				<CardSpotlight className="h-full">
					<!-- Image -->
					<div class="relative mb-4 h-32 w-full overflow-hidden rounded-lg sm:mb-6 sm:h-40 sm:rounded-xl">
						<img
							src={service.image}
							alt={service.title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
						<div class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-lg sm:right-3 sm:top-3 sm:h-10 sm:w-10 sm:text-xl">
							{service.icon}
						</div>
					</div>

					<!-- Content -->
					<h3 class="mb-2 text-base font-bold text-gray-900 sm:mb-3 sm:text-xl">
						{service.title}
					</h3>
					<p class="text-sm leading-relaxed text-gray-500">
						{service.description}
					</p>
				</CardSpotlight>
			{/each}
		</div>
	</div>
</section>

<!-- Ports Carousel Section -->
<section class="relative overflow-hidden bg-white py-12 md:py-24">
	<div class="mb-8 px-4 text-center md:mb-12">
		<span class="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-600 md:mb-4 md:px-4 md:py-2">
			<span>⛵</span>
			<span>{translations.home.ourPorts}</span>
		</span>
		<h2 class="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-4 md:text-5xl">
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

	<div class="mt-8 px-4 text-center md:mt-12">
		<a
			href={routes.ports}
			class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
		>
			<span>{translations.home.showAllPorts}</span>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>

<!-- Location Section with Wave -->
<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 md:py-24">
	<!-- Grid pattern - smaller on mobile -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem]"></div>

	<!-- Gradient orb - smaller and hidden on mobile -->
	<div class="absolute right-0 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl md:block"></div>

	<div class="relative mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<div class="relative">
					<div class="absolute -inset-2 rounded-2xl bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-xl md:-inset-4 md:rounded-3xl md:blur-2xl"></div>
					<img
						src="/images/kormoran-cilistov-i-a-ii-kopia.jpg"
						alt="Kormorán Čilistov"
						class="relative rounded-xl shadow-xl md:rounded-2xl md:shadow-2xl"
					/>
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<span class="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-300 md:mb-4 md:px-4 md:py-2">
					<span>📍</span>
					<span>{translations.home.locality}</span>
				</span>
				<h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-5xl">
					{translations.home.location}
				</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-400 md:mb-8 md:text-lg">
					{translations.home.locationText}
				</p>

				<!-- Features list -->
				<ul class="mb-6 space-y-3 md:mb-8 md:space-y-4">
					<li class="flex items-center gap-2 md:gap-3">
						<div class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-sm text-orange-400 md:h-8 md:w-8 md:text-base">✓</div>
						<span class="text-sm text-gray-300 md:text-base">{translations.home.fromBratislava}</span>
					</li>
					<li class="flex items-center gap-2 md:gap-3">
						<div class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-sm text-orange-400 md:h-8 md:w-8 md:text-base">✓</div>
						<span class="text-sm text-gray-300 md:text-base">{translations.home.onDanube}</span>
					</li>
					<li class="flex items-center gap-2 md:gap-3">
						<div class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-sm text-orange-400 md:h-8 md:w-8 md:text-base">✓</div>
						<span class="text-sm text-gray-300 md:text-base">{translations.home.freeParking}</span>
					</li>
				</ul>

				<a
					href={routes.contact}
					class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
				>
					<span>{translations.nav.contact}</span>
					<span>→</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Wave at bottom -->
	<div class="absolute inset-x-0 bottom-0 rotate-180">
		<WaveEffect waveColor="#ffffff" waveOpacity={0.05} className="h-32" />
	</div>
</section>

<!-- Amenities BentoGrid Section -->
<section class="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-16 md:py-24">
	<!-- Grid pattern -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

	<div class="relative mx-auto max-w-7xl px-4">
		<div class="mb-10 text-center md:mb-16">
			<span class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
				<span>🛠️</span>
				<span>{translations.home.amenities}</span>
			</span>
			<h2 class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
				{translations.home.amenitiesSubtitle}
			</h2>
		</div>

		<BentoGrid className="mx-auto max-w-5xl">
			<BentoGridItem
				title={translations.home.electricity}
				description={translations.home.electricityDesc}
				className="md:col-span-2"
				iconEmoji="⚡"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100">
					<span class="text-6xl">⚡</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.water}
				description={translations.home.waterDesc}
				iconEmoji="💧"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
					<span class="text-5xl">💧</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.wifi}
				description={translations.home.wifiDesc}
				iconEmoji="📶"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
					<span class="text-5xl">📶</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.service}
				description={translations.home.serviceDesc}
				className="md:col-span-2"
				iconEmoji="🔧"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-slate-200">
					<span class="text-6xl">🔧</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.parking}
				description={translations.home.parkingDesc}
				iconEmoji="🅿️"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-100">
					<span class="text-5xl">🅿️</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.security}
				description={translations.home.securityDesc}
				iconEmoji="🛡️"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-rose-100">
					<span class="text-5xl">🛡️</span>
				</div>
			</BentoGridItem>

			<BentoGridItem
				title={translations.home.restaurant}
				description={translations.home.restaurantDesc}
				className="md:col-span-2"
				iconEmoji="🍽️"
			>
				<div class="flex h-full min-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
					<span class="text-6xl">🍽️</span>
				</div>
			</BentoGridItem>
		</BentoGrid>
	</div>
</section>

<!-- Banner Section -->
<section class="relative bg-white py-8 md:py-16">
	<div class="mx-auto max-w-4xl px-4">
		<a
			href="http://cilistovskalaguna.sk/?utm_source=pristavkormoran"
			class="group relative block overflow-hidden rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:rounded-3xl md:shadow-xl"
		>
			<img
				src="/images/banner-laguna.jpg"
				alt="Čilistovská lagúna"
				class="w-full transition-transform duration-500 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40"></div>
			<div class="absolute inset-0 flex items-center p-4 sm:p-6 md:p-8">
				<div>
					<span class="mb-2 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white sm:mb-3 sm:gap-2 sm:px-4 sm:py-1 sm:text-sm">
						<span>🏠</span>
						<span>{translations.home.partner}</span>
					</span>
					<h3 class="text-xl font-bold text-white sm:text-2xl md:text-3xl">{translations.home.partnerTitle}</h3>
					<p class="mt-1 text-sm text-white/80 sm:mt-2 sm:text-base md:text-lg">{translations.home.partnerSubtitle}</p>
					<div class="mt-2 inline-flex items-center gap-2 text-sm text-orange-400 transition-colors group-hover:text-orange-300 sm:mt-4 sm:text-base">
						<span>{translations.home.learnMore}</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</div>
				</div>
			</div>
		</a>
	</div>
</section>

<!-- CTA Section with BackgroundBeams -->
<section class="relative overflow-hidden bg-slate-950 py-16 md:py-24 lg:py-32">
	<!-- BackgroundBeams - hidden on mobile for performance -->
	<div class="absolute inset-0 hidden md:block">
		<BackgroundBeams className="h-full w-full" />
	</div>

	<!-- Mobile fallback gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 md:hidden"></div>

	<div class="relative z-10 mx-auto max-w-4xl px-4 text-center">
		<GlowingText
			text={translations.home.ctaTitle}
			className="mb-4 text-2xl font-bold sm:text-3xl md:mb-6 md:text-5xl lg:text-6xl"
			glowColor="rgba(249, 115, 22, 0.6)"
		/>

		<p class="mx-auto mb-8 max-w-2xl text-base text-gray-400 md:mb-10 md:text-lg">
			{translations.home.ctaSubtitle}
		</p>

		<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
			<MovingBorder
				borderRadius="9999px"
				containerClassName="h-auto w-full sm:w-auto"
				className="bg-transparent"
				duration={3000}
			>
				<a
					href={routes.contact}
					class="inline-flex w-full items-center justify-center gap-2 px-6 py-3 font-semibold text-white sm:w-auto sm:px-8 sm:py-4"
				>
					<span>{translations.home.contactUs}</span>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</a>
			</MovingBorder>

			<a
				href="tel:+421903123456"
				class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-orange-500/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4"
			>
				<svg class="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
				</svg>
				<span>+421 903 123 456</span>
			</a>
		</div>
	</div>
</section>
