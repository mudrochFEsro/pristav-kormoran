<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig, locations, venues, services, keywords, faq, howToBookBoatTrip, speakableSelectors, firstSentence } from './config';
	import { LANGUAGES, findPage, getAlternatePaths, getNavRoutes, t, type LanguageCode } from '$lib/i18n';

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

	// Localized URL of this page in every language (shared page map in $lib/i18n)
	const alternatePaths = $derived(getAlternatePaths($page.url.pathname));

	// Canonical URL - always the page's own language version, with trailing slash
	const canonicalUrl = $derived(`${siteConfig.url}${alternatePaths[lang]}`);

	// Full title with site name (avoid duplication if title already contains site name)
	const fullTitle = $derived(
		title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
	);

	// Open Graph locales (from i18n config)
	const locale = $derived(LANGUAGES.find(({ code }) => code === lang)!.ogLocale);
	const alternateLocales = $derived(
		LANGUAGES.filter(({ code }) => code !== lang).map(({ ogLocale }) => ogLocale)
	);

	// Which page this is - ports and the winter bar are only described where they appear
	const pageKey = $derived(findPage($page.url.pathname)?.key ?? 'home');
	const translations = $derived(t(lang));

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
			...siteConfig.address
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: siteConfig.phone,
			contactType: 'customer service',
			availableLanguage: ['Slovak', 'English', 'Russian']
		}
	});

	// JSON-LD: LocalBusiness (marina network - schema.org has no Marina type, so Wikidata names it)
	const localBusinessSchema = $derived({
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'TouristAttraction'],
		additionalType: 'https://www.wikidata.org/wiki/Q721207',
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
		hasMap: `https://www.google.com/maps?q=${locations.main.geo.latitude},${locations.main.geo.longitude}`,
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
		potentialAction: {
			'@type': 'ReserveAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.url}${getNavRoutes(lang).contact}`,
				actionPlatform: [
					'https://schema.org/DesktopWebPlatform',
					'https://schema.org/MobileWebPlatform'
				]
			},
			result: {
				'@type': 'Reservation',
				name: 'Mooring and Botel Kormorán reservation'
			}
		},
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

	// JSON-LD: WebSite
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
		]
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
			...locations.main.geo
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
		'@id': `${canonicalUrl}#webpage`,
		url: canonicalUrl,
		name: fullTitle,
		description: description,
		inLanguage: lang,
		isPartOf: {
			'@id': `${siteConfig.url}/#website`
		},
		about: {
			'@id': `${siteConfig.url}/#localbusiness`
		},
		// Speakable (AEO - voice assistants)
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: speakableSelectors
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
		'@id': `${canonicalUrl}#faq`,
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
		'@id': `${canonicalUrl}#howto`,
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

	// JSON-LD: BreadcrumbList (GEO - Navigation understanding)
	const homeUrl = $derived(`${siteConfig.url}${getNavRoutes(lang).home}`);
	const breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'@id': `${canonicalUrl}#breadcrumb`,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: siteConfig.name,
				item: homeUrl
			},
			...(canonicalUrl === homeUrl
				? []
				: [{ '@type': 'ListItem', position: 2, name: title, item: canonicalUrl }])
		]
	});

	// JSON-LD: the six ports as separate places (GEO - local queries like "prístav Štúrovo")
	const portsUrl = $derived(`${siteConfig.url}${getNavRoutes(lang).ports}`);
	const portSchemas = $derived(
		Object.values(locations).map((port) => {
			const key = `port${port.number}` as const;
			return {
				'@type': ['LocalBusiness', 'BoatTerminal'],
				'@id': `${siteConfig.url}/#port-${port.number}`,
				name: port.name,
				// First sentence of the port's text on the Prístavy page (river km, bank)
				description: `${translations.ports[`${key}Title`]} ${firstSentence(translations.ports[`${key}Text`])}`,
				url: portsUrl,
				telephone: siteConfig.phone,
				address: { '@type': 'PostalAddress', ...port.address },
				...('geo' in port && {
					geo: { '@type': 'GeoCoordinates', ...port.geo }
				}),
				parentOrganization: { '@id': `${siteConfig.url}/#organization` }
			};
		})
	);

	// JSON-LD: SUNSET winter boat bar (only venue with published opening hours)
	const sunsetSchema = $derived({
		'@type': 'BarOrPub',
		'@id': `${siteConfig.url}/#sunset`,
		name: `${venues.sunsetBar.name} – ${translations.news.eyebrow.split('·')[1].trim()}`,
		description: translations.news.articleText,
		url: `${siteConfig.url}${getNavRoutes(lang).news}`,
		image: `${siteConfig.url}/images/sunset-lod-vecer.jpg`,
		telephone: siteConfig.phone,
		address: { '@type': 'PostalAddress', ...locations.main.address },
		geo: { '@type': 'GeoCoordinates', ...locations.main.geo },
		containedInPlace: { '@id': `${siteConfig.url}/#port-1` },
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			...venues.sunsetBar.openingHours
		},
		parentOrganization: { '@id': `${siteConfig.url}/#organization` }
	});

	// Combined JSON-LD graph
	const jsonLdGraph = $derived(() => {
		const graph: Record<string, unknown>[] = [organizationSchema, localBusinessSchema, websiteSchema, webPageSchema, breadcrumbSchema, touristDestinationSchema];
		if (pageKey === 'home' || pageKey === 'ports') graph.push(...portSchemas);
		if (pageKey === 'home' || pageKey === 'news') graph.push(sunsetSchema);
		if (faqSchema) graph.push(faqSchema);
		if (howToSchema) graph.push(howToSchema);
		return {
			'@context': 'https://schema.org',
			'@graph': graph
		};
	});

	const keywordString = $derived(keywords[lang].join(', '));
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
	<link rel="canonical" href={canonicalUrl} />
	{#each LANGUAGES as { code } (code)}
		<link rel="alternate" hreflang={code} href="{siteConfig.url}{alternatePaths[code]}" />
	{/each}
	<link rel="alternate" hreflang="x-default" href="{siteConfig.url}{alternatePaths.sk}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{siteConfig.url}{image}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content={locale} />
	{#each alternateLocales as alternateLocale (alternateLocale)}
		<meta property="og:locale:alternate" content={alternateLocale} />
	{/each}
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
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{siteConfig.url}{image}" />
	<meta name="twitter:image:alt" content={title} />

	<!-- Geographic Meta Tags -->
	<meta name="geo.region" content={locations.main.regionCode} />
	<meta name="geo.placename" content="{locations.main.address.addressLocality}, Slovakia" />
	<meta name="geo.position" content="{locations.main.geo.latitude};{locations.main.geo.longitude}" />
	<meta name="ICBM" content="{locations.main.geo.latitude}, {locations.main.geo.longitude}" />

	<!-- Business/Contact -->
	<meta name="format-detection" content="telephone=yes" />
	<meta name="contact" content={siteConfig.email} />

	<!-- JSON-LD Structured Data (SEO + AEO + GEO) -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdGraph())}</script>`}
</svelte:head>
