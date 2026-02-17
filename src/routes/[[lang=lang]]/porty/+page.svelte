<script lang="ts">
	import type { PageData } from './$types';
	import { t, getNavRoutes } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import { Sparkles } from '$lib/components/ui';

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

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
	<!-- Decorative blobs -->
	<div class="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/40 blur-3xl"></div>
	<div class="absolute -right-40 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100/30 to-rose-100/30 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center">
		<span class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
			{translations.nav.ports}
		</span>
		<h1 class="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
			{translations.ports.title}
		</h1>
		<div class="mx-auto h-12 w-64">
			<Sparkles particleColor="#f97316" particleDensity={30} className="h-full w-full" />
		</div>
	</div>
</section>

<!-- Ports Grid -->
{#each ports as port, i (i)}
	<section class="relative py-20 {i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
		<div class="mx-auto max-w-7xl px-4">
			<div class="grid items-center gap-12 {i % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2 lg:flex-row-reverse'}">
				<!-- Image -->
				<div class="group relative {i % 2 === 1 ? 'lg:order-2' : ''}">
					<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
					<div class="relative overflow-hidden rounded-2xl shadow-2xl">
						<img
							src={port.image}
							alt={port.title}
							class="w-full transition-transform duration-700 group-hover:scale-105"
							loading={i === 0 ? 'eager' : 'lazy'}
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
					</div>
				</div>

				<!-- Content -->
				<div class="{i % 2 === 1 ? 'lg:order-1' : ''}">
					<span class="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
						Порт {i + 1}
					</span>
					<h2 class="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
						{port.title}
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-gray-600">
						{port.text}
						{#if port.link}
							{translations.ports.moreInfo}
							<a
								href={port.link}
								target="_blank"
								class="font-medium text-orange-500 underline-offset-4 hover:underline"
							>
								www.hotelkormoran.sk
							</a>
						{/if}
					</p>

					{#if port.mapImage}
						<div class="mt-6 overflow-hidden rounded-xl border border-gray-100 shadow-lg">
							<img
								src={port.mapImage}
								alt="{port.title} карта"
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
