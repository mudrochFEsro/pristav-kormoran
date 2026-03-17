<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig, locations, services, keywords, faq, howToBookBoatTrip, speakableSelectors } from './config';
	import type { LanguageCode } from '$lib/i18n';

	interface Props {
		title: string;
		description: string;
		lang: LanguageCode;
		type?: 'website' | 'article' | 'place';
		image?: string;
		noindex?: boolean;
		includeFaq?: boolean;
		includeHowTo?: boolean;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
		};
	}

	let {
		title,
		description,
		lang,
		type = 'website',
		image = siteConfig.defaultImage,
		noindex = false,
		includeFaq = false,
		includeHowTo = false,
		article
	}: Props = $props();

	// Build canonical URL with proper domain
	const canonicalUrl = $derived(() => {
		const path = $page.url.pathname;
		// Ensure trailing slash for all pages
		const normalizedPath = path.endsWith('/') ? path : `${path}/`;
		return `${siteConfig.url}${normalizedPath}`;
	});

	// Full title with site name (avoid duplication if title already contains site name)
	const fullTitle = $derived(
		title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
	);

	// Locale mapping
	const localeMap = {
		sk: 'sk_SK',
		en: 'en_US',
		ru: 'ru_RU'
	};
	const locale = $derived(localeMap[lang]);

	// Alternate language URLs
	const alternateUrls = $derived(() => {
		const path = $page.url.pathname;
		const basePath = path
			.replace(/^\/en\//, '/')
			.replace(/^\/ru\//, '/')
			.replace(/^\/en$/, '/')
			.replace(/^\/ru$/, '/');

		// Map Slovak paths to other languages
		const pathMappings: Record<string, Record<string, string>> = {
			'/': { sk: '/', en: '/en/', ru: '/ru/' },
			'/o-nas/': { sk: '/o-nas/', en: '/en/about-us/', ru: '/ru/o-nas/' },
			'/novinky/': { sk: '/novinky/', en: '/en/news/', ru: '/ru/novosti/' },
			'/region/': { sk: '/region/', en: '/en/region/', ru: '/ru/region/' },
			'/pristavy/': { sk: '/pristavy/', en: '/en/ports/', ru: '/ru/porty/' },
			'/botel-kormoran/': { sk: '/botel-kormoran/', en: '/en/botel-kormoran/', ru: '/ru/botel-kormoran/' },
			'/vylety-lodou/': { sk: '/vylety-lodou/', en: '/en/boat-trips/', ru: '/ru/progulki-na-lodke/' },
			'/kontakt/': { sk: '/kontakt/', en: '/en/contact/', ru: '/ru/kontakt/' }
		};

		// Find the base path key
		let baseKey = '/';
		for (const key of Object.keys(pathMappings)) {
			const mapping = pathMappings[key];
			if (Object.values(mapping).some((p) => path === p || path === p.slice(0, -1))) {
				baseKey = key;
				break;
			}
		}

		const mapping = pathMappings[baseKey] || pathMappings['/'];
		return {
			sk: `${siteConfig.url}${mapping.sk}`,
			en: `${siteConfig.url}${mapping.en}`,
			ru: `${siteConfig.url}${mapping.ru}`
		};
	});

	// JSON-LD: Organization
	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${siteConfig.url}/#organization`,
		name: siteConfig.name,
		legalName: siteConfig.legalName,
		url: siteConfig.url,
		logo: {
			'@type': 'ImageObject',
			url: `${siteConfig.url}${siteConfig.logo}`,
			width: 200,
			height: 200
		},
		image: `${siteConfig.url}${siteConfig.defaultImage}`,
		email: siteConfig.email,
		telephone: siteConfig.phone,
		foundingDate: siteConfig.foundingDate,
		sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
		address: {
			'@type': 'PostalAddress',
			...locations.main.address
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: siteConfig.phone,
			contactType: 'customer service',
			availableLanguage: ['Slovak', 'English', 'Russian']
		}
	});

	// JSON-LD: LocalBusiness (Marina)
	const localBusinessSchema = $derived({
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'Marina', 'TouristAttraction'],
		'@id': `${siteConfig.url}/#localbusiness`,
		name: siteConfig.name,
		alternateName: ['Pristav Kormoran', 'Kormoran Port', 'Marina Kormoran', 'Порт Корморан'],
		description: description,
		url: siteConfig.url,
		telephone: siteConfig.phone,
		email: siteConfig.email,
		priceRange: siteConfig.priceRange,
		currenciesAccepted: 'EUR',
		paymentAccepted: 'Cash, Credit Card, Bank Transfer',
		image: [
			`${siteConfig.url}${siteConfig.defaultImage}`,
			`${siteConfig.url}/images/botel-ubytovanie-restauracia1.webp`,
			`${siteConfig.url}/images/lod-pristav-5-pano.webp`
		],
		logo: `${siteConfig.url}${siteConfig.logo}`,
		address: {
			'@type': 'PostalAddress',
			...locations.main.address
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: locations.main.geo.latitude,
			longitude: locations.main.geo.longitude
		},
		hasMap: 'https://www.google.com/maps?q=48.0167,17.3167',
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '08:00',
				closes: '18:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Saturday',
				opens: '09:00',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Sunday',
				opens: '10:00',
				closes: '16:00'
			}
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services',
			itemListElement: services[lang].map((service, index) => ({
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: service
				},
				position: index + 1
			}))
		},
		potentialAction: [
			{
				'@type': 'ReserveAction',
				target: {
					'@type': 'EntryPoint',
					urlTemplate: `${siteConfig.url}/kontakt/`,
					actionPlatform: [
						'http://schema.org/DesktopWebPlatform',
						'http://schema.org/MobileWebPlatform'
					]
				},
				result: {
					'@type': 'Reservation',
					name: 'Boat Trip Reservation'
				}
			},
			{
				'@type': 'CommunicateAction',
				target: {
					'@type': 'EntryPoint',
					telephone: siteConfig.phone,
					email: siteConfig.email
				}
			}
		],
		amenityFeature: [
			{ '@type': 'LocationFeatureSpecification', name: 'Boat Fueling Station', value: true },
			{ '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
			{ '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
			{ '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
			{ '@type': 'LocationFeatureSpecification', name: 'Accommodation', value: true },
			{ '@type': 'LocationFeatureSpecification', name: 'Event Venue', value: true }
		],
		areaServed: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: 48.1,
				longitude: 17.2
			},
			geoRadius: '100000'
		},
		sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
		knowsAbout: [
			'Danube River',
			'Boat trips',
			'Marina services',
			'Corporate events',
			'Weddings on boats',
			'Gabčíkovo Dam',
			'Žitný ostrov'
		],
		slogan: lang === 'sk' ? 'Vaša brána na Dunaj' : lang === 'en' ? 'Your gateway to the Danube' : 'Ваши ворота на Дунай'
	});

	// JSON-LD: WebSite with SearchAction
	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${siteConfig.url}/#website`,
		url: siteConfig.url,
		name: siteConfig.name,
		alternateName: ['Pristav Kormoran', 'Kormoran Port'],
		description: description,
		publisher: {
			'@id': `${siteConfig.url}/#organization`
		},
		inLanguage: [
			{ '@type': 'Language', name: 'Slovak', alternateName: 'sk' },
			{ '@type': 'Language', name: 'English', alternateName: 'en' },
			{ '@type': 'Language', name: 'Russian', alternateName: 'ru' }
		],
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.url}/?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	});

	// JSON-LD: TouristDestination (GEO optimization)
	const touristDestinationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'TouristDestination',
		'@id': `${siteConfig.url}/#destination`,
		name: lang === 'sk' ? 'Dunaj - Žitný ostrov' : lang === 'en' ? 'Danube - Žitný Island' : 'Дунай - Житный остров',
		description: lang === 'sk'
			? 'Najväčší riečny ostrov v Európe na juhozápade Slovenska. Ideálne miesto pre vodné športy, cykloturistiku a relax pri Dunaji.'
			: lang === 'en'
			? 'The largest river island in Europe in southwestern Slovakia. Ideal destination for water sports, cycling, and relaxation by the Danube.'
			: 'Крупнейший речной остров в Европе на юго-западе Словакии. Идеальное место для водных видов спорта, велотуризма и отдыха у Дуная.',
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 48.0167,
			longitude: 17.3167
		},
		touristType: [
			'Water sports enthusiasts',
			'Cyclists',
			'Nature lovers',
			'Corporate groups',
			'Wedding parties',
			'Boating enthusiasts'
		],
		includesAttraction: [
			{
				'@type': 'TouristAttraction',
				name: 'Gabčíkovo Dam',
				description: 'Hydroelectric dam with boat locks on the Danube River'
			},
			{
				'@type': 'TouristAttraction',
				name: 'Botel Kormorán',
				description: 'Floating hotel on the Danube with restaurant and event facilities'
			}
		]
	});

	// JSON-LD: WebPage
	const webPageSchema = $derived({
		'@context': 'https://schema.org',
		'@type': type === 'article' ? 'Article' : 'WebPage',
		'@id': `${canonicalUrl()}/#webpage`,
		url: canonicalUrl(),
		name: fullTitle,
		description: description,
		inLanguage: lang,
		isPartOf: {
			'@id': `${siteConfig.url}/#website`
		},
		about: {
			'@id': `${siteConfig.url}/#localbusiness`
		},
		...(article && {
			datePublished: article.publishedTime,
			dateModified: article.modifiedTime,
			author: {
				'@type': 'Organization',
				'@id': `${siteConfig.url}/#organization`
			}
		})
	});

	// JSON-LD: FAQ Schema (AEO - Answer Engine Optimization)
	const faqSchema = $derived(includeFaq ? {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${canonicalUrl()}/#faq`,
		mainEntity: faq[lang].map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	} : null);

	// JSON-LD: HowTo Schema (AEO - Featured Snippets)
	const howToSchema = $derived(includeHowTo ? {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		'@id': `${canonicalUrl()}/#howto`,
		name: howToBookBoatTrip[lang].name,
		description: howToBookBoatTrip[lang].description,
		step: howToBookBoatTrip[lang].steps.map((step, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			name: step.name,
			text: step.text
		})),
		totalTime: 'PT10M'
	} : null);

	// JSON-LD: Speakable Schema (AEO - Voice Search)
	const speakableSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: speakableSelectors
		}
	});

	// JSON-LD: BreadcrumbList (GEO - Navigation understanding)
	const breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'@id': `${canonicalUrl()}/#breadcrumb`,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Domov',
				item: `${siteConfig.url}/`
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: title,
				item: canonicalUrl()
			}
		]
	});

	// Combined JSON-LD graph
	const jsonLdGraph = $derived(() => {
		const graph: Record<string, unknown>[] = [organizationSchema, localBusinessSchema, websiteSchema, webPageSchema, breadcrumbSchema, touristDestinationSchema];
		if (faqSchema) graph.push(faqSchema);
		if (howToSchema) graph.push(howToSchema);
		return {
			'@context': 'https://schema.org',
			'@graph': graph
		};
	});

	const keywordString = $derived(keywords[lang].join(', '));
	const alts = $derived(alternateUrls());
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywordString} />
	<meta name="author" content={siteConfig.name} />
	<meta name="generator" content="SvelteKit" />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	{/if}

	<!-- Canonical & Language Alternates -->
	<link rel="canonical" href={canonicalUrl()} />
	<link rel="alternate" hreflang="sk" href={alts.sk} />
	<link rel="alternate" hreflang="en" href={alts.en} />
	<link rel="alternate" hreflang="ru" href={alts.ru} />
	<link rel="alternate" hreflang="x-default" href={alts.sk} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
	<meta property="og:url" content={canonicalUrl()} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{siteConfig.url}{image}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content={locale} />
	<meta property="og:locale:alternate" content="sk_SK" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta property="og:locale:alternate" content="ru_RU" />
	<meta property="og:site_name" content={siteConfig.name} />

	{#if article}
		<meta property="article:published_time" content={article.publishedTime} />
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		<meta property="article:author" content={siteConfig.name} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl()} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{siteConfig.url}{image}" />
	<meta name="twitter:image:alt" content={title} />

	<!-- Geographic Meta Tags -->
	<meta name="geo.region" content="SK-BL" />
	<meta name="geo.placename" content="Bratislava, Slovakia" />
	<meta name="geo.position" content="{locations.main.geo.latitude};{locations.main.geo.longitude}" />
	<meta name="ICBM" content="{locations.main.geo.latitude}, {locations.main.geo.longitude}" />

	<!-- Business/Contact -->
	<meta name="format-detection" content="telephone=yes" />
	<meta name="contact" content={siteConfig.email} />

	<!-- JSON-LD Structured Data (SEO + AEO + GEO) -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdGraph())}</script>`}
	<!-- Speakable Schema for Voice Assistants -->
	{@html `<script type="application/ld+json">${JSON.stringify(speakableSchema)}</script>`}
</svelte:head>
