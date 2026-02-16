/**
 * SEO & Local Business Configuration
 * Centralized configuration for all SEO and GEO data
 */

export const siteConfig = {
	// Basic site info
	name: 'Prístav Kormorán',
	legalName: 'Prístav Kormorán s.r.o.',
	url: 'https://pristavkormoran.sk',

	// Contact info
	email: 'info@pristavkormoran.sk',
	phone: '+421903614663',
	phoneFormatted: '+421 903 614 663',

	// Social media
	social: {
		facebook: 'https://www.facebook.com/pristavkormoran',
		instagram: 'https://www.instagram.com/pristavkormoran'
	},

	// Business registration (Slovakia)
	ico: '46 141 103',
	dic: '2023259314',
	icdph: 'SK2023259314',

	// Default OG image
	defaultImage: '/images/og-image.jpg',
	logo: '/images/logo-pristav.svg',

	// Founding date
	foundingDate: '2012',

	// Price range
	priceRange: '€€'
};

// Geographic locations for each port
export const locations = {
	// Main location - Čilistov (Port I)
	main: {
		name: 'Prístav Kormorán I. - Čilistov',
		address: {
			streetAddress: 'Čilistov',
			addressLocality: 'Šamorín',
			addressRegion: 'Trnavský kraj',
			postalCode: '931 01',
			addressCountry: 'SK'
		},
		geo: {
			latitude: 48.0167,
			longitude: 17.3167
		},
		googleMapsUrl: 'https://goo.gl/maps/pristavkormoran'
	},

	// Bratislava - Port III (Danube right bank)
	bratislava1: {
		name: 'Prístav Kormorán III. - Bratislava',
		address: {
			streetAddress: 'Dunajská nábrežie',
			addressLocality: 'Bratislava',
			addressRegion: 'Bratislavský kraj',
			postalCode: '811 02',
			addressCountry: 'SK'
		},
		geo: {
			latitude: 48.1417,
			longitude: 17.1167
		}
	},

	// Bratislava - Port IV (Under castle)
	bratislava2: {
		name: 'Prístav Kormorán IV. - Bratislava (Hrad)',
		address: {
			streetAddress: 'Pod Bratislavským hradom',
			addressLocality: 'Bratislava',
			addressRegion: 'Bratislavský kraj',
			postalCode: '811 01',
			addressCountry: 'SK'
		},
		geo: {
			latitude: 48.1420,
			longitude: 17.1000
		}
	},

	// Bratislava - Port V (River Park)
	bratislava3: {
		name: 'Prístav Kormorán V. - River Park',
		address: {
			streetAddress: 'River Park, Dvořákovo nábrežie',
			addressLocality: 'Bratislava',
			addressRegion: 'Bratislavský kraj',
			postalCode: '811 02',
			addressCountry: 'SK'
		},
		geo: {
			latitude: 48.1450,
			longitude: 17.1050
		}
	},

	// Štúrovo - Port VI
	sturovo: {
		name: 'Prístav Kormorán VI. - Štúrovo',
		address: {
			streetAddress: 'Pri Dunaji',
			addressLocality: 'Štúrovo',
			addressRegion: 'Nitriansky kraj',
			postalCode: '943 01',
			addressCountry: 'SK'
		},
		geo: {
			latitude: 47.7978,
			longitude: 18.7181
		}
	}
};

// Service area (GeoCircle around main locations)
export const serviceArea = {
	// Covers Slovakia and nearby areas
	geoRadius: '100000', // 100km radius
	centerLatitude: 48.1,
	centerLongitude: 17.2
};

// Business hours
export const openingHours = [
	'Mo-Fr 08:00-18:00',
	'Sa 09:00-17:00',
	'Su 10:00-16:00'
];

// Services offered
export const services = {
	sk: [
		'Prístavné služby pre kajutové plavidlá',
		'Prístavisko pre výletné lode',
		'Parkovanie malých plavidiel',
		'Výlety loďou po Dunaji',
		'Ubytovanie na Boteli Kormorán',
		'Firemné eventy a teambuildingy',
		'Svadby a oslavy na lodi',
		'Catering a stravovanie'
	],
	en: [
		'Port services for cabin vessels',
		'Docking for cruise ships',
		'Small boat parking',
		'Boat trips on the Danube',
		'Accommodation at Botel Kormorán',
		'Corporate events and team buildings',
		'Weddings and celebrations on boat',
		'Catering services'
	],
	ru: [
		'Портовые услуги для каютных судов',
		'Причал для круизных судов',
		'Парковка малых судов',
		'Прогулки на лодке по Дунаю',
		'Проживание на Ботеле Корморан',
		'Корпоративные мероприятия',
		'Свадьбы и торжества на корабле',
		'Кейтеринг услуги'
	]
};

// Keywords per language
export const keywords = {
	sk: [
		'prístav Dunaj',
		'prístavisko Bratislava',
		'výlety loďou Slovensko',
		'botel Kormorán',
		'hotel pri Dunaji',
		'lodná doprava Dunaj',
		'prístavy Čilistov',
		'Žitný ostrov',
		'firemné eventy loď',
		'svadba na lodi',
		'teambuilding Bratislava',
		'vodné dielo Gabčíkovo'
	],
	en: [
		'Danube port Slovakia',
		'boat trips Bratislava',
		'river cruise Slovakia',
		'botel accommodation Danube',
		'marina Slovakia',
		'Danube river tours',
		'corporate events boat',
		'wedding on boat Slovakia',
		'Gabčíkovo dam tours'
	],
	ru: [
		'порт Дунай Словакия',
		'прогулки на лодке Братислава',
		'речные круизы Словакия',
		'ботель Дунай',
		'марина Словакия',
		'туры по Дунаю',
		'мероприятия на корабле',
		'свадьба на корабле Словакия'
	]
};
