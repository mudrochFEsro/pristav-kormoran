/**
 * SEO & Local Business Configuration
 * Centralized configuration for all SEO and GEO data
 */

import type { PageKey } from '$lib/i18n';

export const siteConfig = {
	// Basic site info
	name: 'Prístav Kormorán',
	legalName: 'BROSS for PARTNERS, a.s.',
	url: 'https://www.pristavkormoran.sk',

	// Contact info
	email: 'robertj@seidner.sk',
	phone: '+421902199480',
	phoneFormatted: '+421 902 199 480',

	// Social media
	social: {
		facebook: 'https://www.facebook.com/pristavkormoran',
		instagram: 'https://www.instagram.com/pristavkormoran'
	},

	// Registered office of the operator (as on the Kontakt page and in the footer)
	address: {
		streetAddress: 'Hollého 1',
		addressLocality: 'Bratislava',
		postalCode: '811 08',
		addressCountry: 'SK'
	},

	// Business registration (Slovakia)
	ico: '35 853 603',
	dic: '2021727004',
	icdph: 'SK2021727004',

	// Default OG image (1200x630 recommended for social sharing)
	defaultImage: '/images/static-main.webp',
	logo: '/images/logo-pristav.svg',

	// Founding date
	foundingDate: '2012',

	// Price range
	priceRange: '€€'
};

// Pages temporarily hidden from navigation - also left out of sitemap.xml and llms.txt
export const hiddenPages: PageKey[] = ['boatTrips'];

// Geographic locations for each port (numbers match the Prístavy page)
const cilistovAddress = {
	streetAddress: 'Čilistov',
	addressLocality: 'Šamorín',
	addressRegion: 'Trnavský kraj',
	postalCode: '931 01',
	addressCountry: 'SK'
};

export const locations = {
	// Main location - Čilistov (Port I)
	main: {
		number: 1,
		name: 'Prístav Kormorán I. - Čilistov',
		regionCode: 'SK-TA',
		address: cilistovAddress,
		geo: {
			latitude: 48.009144,
			longitude: 17.304332
		}
	},

	// Čilistov - Port II (small boats, Botel Kormorán)
	cilistov2: {
		number: 2,
		name: 'Prístav Kormorán II. - Čilistov',
		address: cilistovAddress
	},

	// Bratislava - Port III (Danube right bank)
	bratislava1: {
		number: 3,
		name: 'Prístav Kormorán III. - Bratislava',
		address: {
			addressLocality: 'Bratislava - Petržalka',
			addressRegion: 'Bratislavský kraj',
			postalCode: '851 01',
			addressCountry: 'SK'
		}
	},

	// Bratislava - Port IV (under the castle)
	bratislava2: {
		number: 4,
		name: 'Prístav Kormorán IV. - Bratislava (Hrad)',
		address: {
			streetAddress: 'Pod Bratislavským hradom',
			addressLocality: 'Bratislava',
			addressRegion: 'Bratislavský kraj',
			postalCode: '811 01',
			addressCountry: 'SK'
		}
	},

	// Bratislava - Port V (River Park)
	bratislava3: {
		number: 5,
		name: 'Prístav Kormorán V. - River Park',
		address: {
			streetAddress: 'Dvořákovo nábrežie',
			addressLocality: 'Bratislava',
			addressRegion: 'Bratislavský kraj',
			postalCode: '811 02',
			addressCountry: 'SK'
		}
	},

	// Štúrovo - Port VI
	sturovo: {
		number: 6,
		name: 'Prístav Kormorán VI. - Štúrovo',
		address: {
			addressLocality: 'Štúrovo',
			addressRegion: 'Nitriansky kraj',
			postalCode: '943 01',
			addressCountry: 'SK'
		}
	}
} as const;

/** First sentence of a text - ignores abbreviations like "r.k. 31,2" (sentence ends before a capital letter). */
export function firstSentence(text: string): string {
	const end = text.search(/\.\s(?=[A-ZÁÄČĎÉÍĽĹŇÓÔŔŠŤÚÝŽА-ЯЁ])/);
	return end === -1 ? text : text.slice(0, end + 1);
}

// Seasonal venues with known opening hours (keep in sync with the news section)
export const venues = {
	sunsetBar: {
		name: 'SUNSET',
		openingHours: {
			dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
			opens: '11:00',
			closes: '19:00',
			validFrom: '2026-11-06'
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

// FAQ for AEO (Answer Engine Optimization) - Featured Snippets & Voice Search
export const faq = {
	sk: [
		{
			question: 'Kde sa nachádzajú prístavy Kormorán?',
			answer: 'Prístavy Kormorán sa nachádzajú na 6 lokalitách: v Bratislave (3 prístavy - pod hradom, pri River Parku a na pravom brehu Dunaja), v Čilistove pri Šamoríne (2 prístavy pri Hoteli Kormorán) a v Štúrove.'
		},
		{
			question: 'Aké služby ponúka Prístav Kormorán?',
			answer: 'Ponúkame prístavné služby pre kajutové plavidlá a výletné lode, parkovanie malých plavidiel, výlety loďou po Dunaji, ubytovanie na Boteli Kormorán, organizáciu firemných eventov, teambuildingov, svadieb a osláv na lodi.'
		},
		{
			question: 'Koľko stojí kotvenie v prístave Kormorán?',
			answer: 'Ceny kotvenia závisia od veľkosti plavidla a dĺžky pobytu. Pre aktuálny cenník kontaktujte port managera na +421 902 199 480 alebo emailom robertj@seidner.sk.'
		},
		{
			question: 'Môžem usporiadať svadbu na lodi?',
			answer: 'Áno, ponúkame organizáciu svadieb na lodi Ondava aj v Prístave Kormorán v Čilistove. Zabezpečíme catering, výzdobu, ozvučenie a kompletný svadobný servis. Kapacita lode je ideálna pre komorné svadby.'
		},
		{
			question: 'Aká je kapacita Botela Kormorán?',
			answer: 'Botel Kormorán má kapacitu 49 lôžok. Súčasťou je reštaurácia s 32 miestami, bar s terasou pre 60 hostí a kongresová sála pre 20 osôb.'
		},
		{
			question: 'Kedy je otvorený zimný lodný bar SUNSET?',
			answer: 'Zimný lodný bar SUNSET v Prístave Kormorán v Čilistove je otvorený od 6. novembra, piatok – nedeľa od 11:00 do 19:00. Ponúka varené víno, punč aj nealko punč, horúcu čokoládu, niečo malé pod zub a stolné hry.'
		},
		{
			question: 'Ako sa dostanem do prístavu Kormorán v Čilistove?',
			answer: 'Z Bratislavy smerom na Šamorín, pred Šamorínom odbočte doprava na Čilistov. Prístav sa nachádza pri Hoteli Kormorán. GPS súradnice: 48.009144, 17.304332. Parkovanie je k dispozícii priamo v areáli.'
		},
		{
			question: 'Aké typy lodí môžu kotviť v prístave?',
			answer: 'V prístavoch Kormorán môžu kotviť kajutové lode, motorové člny, jachty aj výletné lode. Maximálna dĺžka plavidla závisí od konkrétneho prístavu - v Čilistove až do 25 metrov.'
		},
		{
			question: 'Ponúkate teambuilding na lodi?',
			answer: 'Áno, organizujeme firemné teambuildingy na lodi Ondava aj v areáli prístavu. Ponúkame plavby po Dunaji s cateringom, outdoor aktivity, súťaže a kompletný eventový servis pre skupiny 10-60 osôb.'
		},
		{
			question: 'Aké atrakcie sú v okolí prístavu?',
			answer: 'V okolí nájdete Žitný ostrov s cyklotrasami, termálne kúpaliská v Dunajskej Strede, Vodné dielo Gabčíkovo, historické centrum Bratislavy, hrad Devín a vinice Malých Karpát.'
		}
	],
	en: [
		{
			question: 'Where are Kormoran Ports located?',
			answer: 'Kormoran Ports are located at 6 locations: in Bratislava (3 ports - under the castle, at River Park, and on the right bank of the Danube), in Čilistov near Šamorín (2 ports near Hotel Kormoran), and in Štúrovo.'
		},
		{
			question: 'What services does Kormoran Port offer?',
			answer: 'We offer port services for cabin vessels and cruise ships, small boat parking, boat trips on the Danube, accommodation at Botel Kormoran, corporate events, team buildings, weddings and celebrations on board.'
		},
		{
			question: 'How much does mooring at Kormoran Port cost?',
			answer: 'Mooring prices depend on vessel size and length of stay. For current prices, contact the port manager at +421 902 199 480 or email robertj@seidner.sk.'
		},
		{
			question: 'Can I organize a wedding on a boat?',
			answer: 'Yes, we organize weddings on the Ondava boat and at Kormoran Port in Čilistov. We provide catering, decoration, sound system, and complete wedding service. The boat capacity is ideal for intimate weddings.'
		},
		{
			question: 'What is the capacity of Botel Kormoran?',
			answer: 'Botel Kormoran has a capacity of 49 beds. It includes a restaurant with 32 seats, a bar with terrace for 60 guests, and a conference hall for 20 people.'
		},
		{
			question: 'When is the SUNSET winter boat bar open?',
			answer: 'The SUNSET winter boat bar at Kormoran Port in Čilistov is open from 6 November, Friday – Sunday, 11:00 – 19:00. It serves mulled wine, punch and alcohol-free punch, hot chocolate, small snacks and board games.'
		},
		{
			question: 'How do I get to Kormoran Port in Čilistov?',
			answer: 'From Bratislava, head towards Šamorín and turn right to Čilistov before reaching the town. The port is located at Hotel Kormoran. GPS coordinates: 48.009144, 17.304332. Free parking is available on site.'
		},
		{
			question: 'What types of boats can moor at the port?',
			answer: 'Kormoran Ports accommodate cabin boats, motorboats, yachts, and cruise ships. Maximum vessel length depends on the specific port - up to 25 meters in Čilistov.'
		},
		{
			question: 'Do you offer corporate team building on boats?',
			answer: 'Yes, we organize corporate team buildings on the Ondava boat and at the port premises. We offer Danube cruises with catering, outdoor activities, competitions, and complete event services for groups of 10-60 people.'
		},
		{
			question: 'What attractions are near the port?',
			answer: 'Nearby attractions include Žitný ostrov with cycling trails, thermal spas in Dunajská Streda, Gabčíkovo Dam, historic Bratislava city center, Devín Castle, and the Small Carpathian wine region.'
		}
	],
	ru: [
		{
			question: 'Где находятся порты Корморан?',
			answer: 'Порты Корморан расположены в 6 местах: в Братиславе (3 порта - под замком, у River Park и на правом берегу Дуная), в Чилистове у Шаморина (2 порта у отеля Корморан) и в Штурово.'
		},
		{
			question: 'Какие услуги предлагает порт Корморан?',
			answer: 'Мы предлагаем портовые услуги для каютных судов и круизных лайнеров, парковку малых судов, прогулки на лодке по Дунаю, проживание на ботеле Корморан, корпоративные мероприятия, тимбилдинги, свадьбы и праздники на корабле.'
		},
		{
			question: 'Сколько стоит швартовка в порту Корморан?',
			answer: 'Цены на швартовку зависят от размера судна и продолжительности пребывания. Для актуальных цен свяжитесь с портовым менеджером по телефону +421 902 199 480 или по почте robertj@seidner.sk.'
		},
		{
			question: 'Можно ли организовать свадьбу на корабле?',
			answer: 'Да, мы организуем свадьбы на корабле Ондава и в порту Корморан в Чилистове. Мы обеспечиваем кейтеринг, декор, звуковое оборудование и полный свадебный сервис.'
		},
		{
			question: 'Какова вместимость ботеля Корморан?',
			answer: 'Ботель Корморан вмещает 49 спальных мест. В нем есть ресторан на 32 места, бар с террасой на 60 гостей и конференц-зал на 20 человек.'
		},
		{
			question: 'Когда открыт зимний бар SUNSET на корабле?',
			answer: 'Зимний бар SUNSET на корабле в порту Корморан в Чилистове открыт с 6 ноября, пятница – воскресенье, с 11:00 до 19:00. Глинтвейн, пунш и безалкогольный пунш, горячий шоколад, лёгкие закуски и настольные игры.'
		},
		{
			question: 'Как добраться до порта Корморан в Чилистове?',
			answer: 'Из Братиславы направляйтесь в сторону Шаморина, перед городом поверните направо на Чилистов. Порт находится у отеля Корморан. GPS-координаты: 48.009144, 17.304332. Бесплатная парковка на территории.'
		},
		{
			question: 'Какие типы лодок могут швартоваться в порту?',
			answer: 'Порты Корморан принимают каютные лодки, моторные катера, яхты и круизные суда. Максимальная длина судна зависит от конкретного порта - до 25 метров в Чилистове.'
		},
		{
			question: 'Вы организуете корпоративные тимбилдинги на лодке?',
			answer: 'Да, мы организуем корпоративные тимбилдинги на корабле Ондава и на территории порта. Предлагаем круизы по Дунаю с кейтерингом, активности на свежем воздухе, конкурсы и полный эвент-сервис для групп 10-60 человек.'
		},
		{
			question: 'Какие достопримечательности есть рядом с портом?',
			answer: 'Поблизости находятся Житный остров с велодорожками, термальные курорты в Дунайской Среде, ГЭС Габчиково, исторический центр Братиславы, замок Девин и винодельческий регион Малых Карпат.'
		}
	]
};

// HowTo Schema for boat booking (AEO)
export const howToBookBoatTrip = {
	sk: {
		name: 'Ako si rezervovať výlet loďou na Dunaji',
		description: 'Jednoduchý návod ako si rezervovať výlet loďou z prístavov Kormorán',
		steps: [
			{ name: 'Vyberte si typ plavby', text: 'Rozhodnite sa či chcete súkromnú plavbu, skupinový výlet, alebo firemný event.' },
			{ name: 'Kontaktujte nás', text: 'Zavolajte na +421 902 199 480 alebo napíšte email na robertj@seidner.sk.' },
			{ name: 'Dohodnite termín', text: 'Vyberte si dátum a čas plavby podľa dostupnosti.' },
			{ name: 'Potvrďte rezerváciu', text: 'Po potvrdení dostanete všetky potrebné informácie o mieste stretnutia a programe.' }
		]
	},
	en: {
		name: 'How to book a boat trip on the Danube',
		description: 'Simple guide to booking a boat trip from Kormoran Ports',
		steps: [
			{ name: 'Choose your cruise type', text: 'Decide if you want a private cruise, group trip, or corporate event.' },
			{ name: 'Contact us', text: 'Call +421 902 199 480 or email robertj@seidner.sk.' },
			{ name: 'Agree on a date', text: 'Choose your preferred date and time based on availability.' },
			{ name: 'Confirm booking', text: 'After confirmation, you will receive all necessary information about the meeting point and program.' }
		]
	},
	ru: {
		name: 'Как забронировать прогулку на лодке по Дунаю',
		description: 'Простое руководство по бронированию прогулки на лодке из портов Корморан',
		steps: [
			{ name: 'Выберите тип круиза', text: 'Решите, хотите ли вы частный круиз, групповую экскурсию или корпоративное мероприятие.' },
			{ name: 'Свяжитесь с нами', text: 'Позвоните по номеру +421 902 199 480 или напишите на robertj@seidner.sk.' },
			{ name: 'Согласуйте дату', text: 'Выберите предпочтительную дату и время в зависимости от наличия.' },
			{ name: 'Подтвердите бронирование', text: 'После подтверждения вы получите всю необходимую информацию о месте встречи и программе.' }
		]
	}
};

// Entity definitions for GEO (Generative Engine Optimization)
export const entities = {
	organization: {
		type: 'Corporation',
		name: 'BROSS for PARTNERS, a.s.',
		description: 'Slovenská spoločnosť prevádzkujúca sieť prístavov na Dunaji pod značkou Prístav Kormorán. Poskytuje prístavné služby, výlety loďou a organizáciu eventov.',
		foundedYear: 2012,
		industry: 'Maritime Services, Tourism, Hospitality',
		numberOfEmployees: '10-50',
		parentOrganization: null
	},
	product: {
		botel: {
			name: 'Botel Kormorán',
			type: 'Accommodation',
			description: 'Plávajúci hotel na Dunaji v Čilistove pri Šamoríne s 49 lôžkami, reštauráciou a kongresovou sálou.',
			capacity: 49
		},
		ondava: {
			name: 'Loď Ondava',
			type: 'Cruise Ship',
			description: 'Výletná loď pre organizáciu plavby, svadieb, firemných eventov a súkromných osláv na Dunaji.',
			services: ['Weddings', 'Corporate Events', 'Private Parties', 'Danube Cruises']
		}
	},
	places: {
		zitnyOstrov: {
			name: 'Žitný ostrov',
			type: 'GeographicFeature',
			description: 'Najväčší riečny ostrov v Európe, nachádza sa na juhozápade Slovenska medzi Dunajom a Malým Dunajom.',
			area: '1885 km²'
		},
		gabcikovo: {
			name: 'Vodné dielo Gabčíkovo',
			type: 'Dam',
			description: 'Vodná elektráreň a plavebné komory na Dunaji, súčasť slovensko-maďarského vodného diela.',
			builtYear: 1992
		}
	}
};

// Speakable content selectors for voice assistants (AEO)
export const speakableSelectors = [
	'.main-title',
	'.static-title',
	'.main-text p:first-of-type',
	'.static-text p:first-of-type'
];

// Keywords per language (includes common misspellings for better search coverage)
export const keywords = {
	sk: [
		// Hlavné kľúčové slová
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
		'vodné dielo Gabčíkovo',
		// Skomoleniny a varianty názvu (s/bez diakritiky, preklepy)
		'Prístav Kormorán',
		'pristav kormoran',
		'pristavkormoran',
		'prístav kormorán',
		'pristav kormorán',
		'prístav kormoran',
		'Pristav Kormoran',
		'kormoran pristav',
		'kormorán prístav',
		'pristav komorán',
		'pristav kormoram',
		'pristaw kormoran',
		'pristan kormoran',
		'prístavkormorán',
		'pristav kormoran cilistov',
		'pristav kormoran bratislava',
		'pristav kormoran sturovo',
		'pristav kormoran šamorín',
		'pristav kormoran samarin',
		'marina kormoran',
		'port kormoran'
	],
	en: [
		// Main keywords
		'Danube port Slovakia',
		'boat trips Bratislava',
		'river cruise Slovakia',
		'botel accommodation Danube',
		'marina Slovakia',
		'Danube river tours',
		'corporate events boat',
		'wedding on boat Slovakia',
		'Gabčíkovo dam tours',
		// Name variants and misspellings
		'Kormoran Port',
		'kormoran port',
		'port kormoran',
		'kormoran marina',
		'marina kormoran',
		'kormoran harbour',
		'harbour kormoran',
		'kormoran dock',
		'pristav kormoran',
		'pristav kormoran slovakia',
		'kormoran port bratislava',
		'kormoran port danube',
		'cormorant port',
		'kormorant port'
	],
	ru: [
		// Основные ключевые слова
		'порт Дунай Словакия',
		'прогулки на лодке Братислава',
		'речные круизы Словакия',
		'ботель Дунай',
		'марина Словакия',
		'туры по Дунаю',
		'мероприятия на корабле',
		'свадьба на корабле Словакия',
		// Варианты названия и транслитерации
		'Порт Корморан',
		'порт корморан',
		'пристань корморан',
		'корморан порт',
		'марина корморан',
		'пристав корморан',
		'pristav kormoran',
		'port kormoran',
		'корморан братислава',
		'корморан дунай',
		'баклан порт',
		'порт баклан'
	]
};
