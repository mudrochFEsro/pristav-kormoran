/**
 * SEO & Local Business Configuration
 * Centralized configuration for all SEO and GEO data
 */

export const siteConfig = {
	// Basic site info
	name: 'Prístav Kormorán',
	legalName: 'BROSS for PARTNERS, a.s.',
	url: 'http://pristavkormoran.sk',

	// Contact info
	email: 'pristav@brossforpartners.sk',
	phone: '+421903727168',
	phoneFormatted: '+421 903 727 168',

	// Social media
	social: {
		facebook: 'https://www.facebook.com/pristavkormoran',
		instagram: 'https://www.instagram.com/pristavkormoran'
	},

	// Business registration (Slovakia)
	ico: '35 853 603',
	dic: '2021727004',
	icdph: 'SK2021727004',

	// Default OG image (1200x630 recommended for social sharing)
	defaultImage: '/images/static-main.jpg',
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
			question: 'Ako si môžem rezervovať výlet loďou?',
			answer: 'Výlet loďou si môžete rezervovať telefonicky na čísle +421 903 727 168 alebo emailom na pristav@brossforpartners.sk. Ponúkame súkromné plavby aj skupinové výlety po Dunaji.'
		},
		{
			question: 'Koľko stojí kotvenie v prístave Kormorán?',
			answer: 'Ceny kotvenia závisia od veľkosti plavidla a dĺžky pobytu. Pre aktuálny cenník kontaktujte port managera na +421 903 614 663 alebo emailom info@pristavkormoran.sk.'
		},
		{
			question: 'Môžem usporiadať svadbu na lodi?',
			answer: 'Áno, ponúkame organizáciu svadieb na lodi Ondava aj v Prístave Kormorán v Čilistove. Zabezpečíme catering, výzdobu, ozvučenie a kompletný svadobný servis. Kapacita lode je ideálna pre intimate svadby.'
		},
		{
			question: 'Aká je kapacita Botela Kormorán?',
			answer: 'Botel Kormorán má kapacitu 49 lôžok. Súčasťou je reštaurácia s 32 miestami, bar s terasou pre 60 hostí a kongresová sála pre 20 osôb.'
		},
		{
			question: 'Je možné navštíviť vodné dielo Gabčíkovo loďou?',
			answer: 'Áno, z Prístavu Kormorán v Čilistove organizujeme výlety loďou na vodné dielo Gabčíkovo. Plavba trvá približne 2-3 hodiny a zahŕňa prechod cez plavebné komory.'
		},
		{
			question: 'Aké sú otváracie hodiny prístavov?',
			answer: 'Prístavy sú otvorené pondelok až piatok od 8:00 do 18:00, v sobotu od 9:00 do 17:00 a v nedeľu od 10:00 do 16:00. Pre príchod mimo otváracích hodín nás kontaktujte vopred.'
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
			question: 'How can I book a boat trip?',
			answer: 'You can book a boat trip by phone at +421 903 727 168 or by email at pristav@brossforpartners.sk. We offer private cruises and group trips on the Danube.'
		},
		{
			question: 'How much does mooring at Kormoran Port cost?',
			answer: 'Mooring prices depend on vessel size and length of stay. For current prices, contact the port manager at +421 903 614 663 or email info@pristavkormoran.sk.'
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
			question: 'Is it possible to visit Gabčíkovo Dam by boat?',
			answer: 'Yes, from Kormoran Port in Čilistov we organize boat trips to Gabčíkovo Dam. The cruise takes approximately 2-3 hours and includes passage through the locks.'
		},
		{
			question: 'What are the port opening hours?',
			answer: 'Ports are open Monday to Friday from 8:00 to 18:00, Saturday from 9:00 to 17:00, and Sunday from 10:00 to 16:00. For arrival outside opening hours, please contact us in advance.'
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
			question: 'Как забронировать прогулку на лодке?',
			answer: 'Вы можете забронировать прогулку по телефону +421 903 727 168 или по электронной почте pristav@brossforpartners.sk. Мы предлагаем частные круизы и групповые туры по Дунаю.'
		},
		{
			question: 'Сколько стоит швартовка в порту Корморан?',
			answer: 'Цены на швартовку зависят от размера судна и продолжительности пребывания. Для актуальных цен свяжитесь с портовым менеджером по телефону +421 903 614 663 или по почте info@pristavkormoran.sk.'
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
			question: 'Можно ли посетить ГЭС Габчиково на лодке?',
			answer: 'Да, из порта Корморан в Чилистове мы организуем экскурсии на лодке к ГЭС Габчиково. Круиз длится примерно 2-3 часа и включает проход через шлюзы.'
		},
		{
			question: 'Какие часы работы портов?',
			answer: 'Порты открыты с понедельника по пятницу с 8:00 до 18:00, в субботу с 9:00 до 17:00 и в воскресенье с 10:00 до 16:00. Для прибытия в нерабочее время свяжитесь с нами заранее.'
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
			{ name: 'Kontaktujte nás', text: 'Zavolajte na +421 903 727 168 alebo napíšte email na pristav@brossforpartners.sk.' },
			{ name: 'Dohodnite termín', text: 'Vyberte si dátum a čas plavby podľa dostupnosti.' },
			{ name: 'Potvrďte rezerváciu', text: 'Po potvrdení dostanete všetky potrebné informácie o mieste stretnutia a programe.' }
		]
	},
	en: {
		name: 'How to book a boat trip on the Danube',
		description: 'Simple guide to booking a boat trip from Kormoran Ports',
		steps: [
			{ name: 'Choose your cruise type', text: 'Decide if you want a private cruise, group trip, or corporate event.' },
			{ name: 'Contact us', text: 'Call +421 903 727 168 or email pristav@brossforpartners.sk.' },
			{ name: 'Agree on a date', text: 'Choose your preferred date and time based on availability.' },
			{ name: 'Confirm booking', text: 'After confirmation, you will receive all necessary information about the meeting point and program.' }
		]
	},
	ru: {
		name: 'Как забронировать прогулку на лодке по Дунаю',
		description: 'Простое руководство по бронированию прогулки на лодке из портов Корморан',
		steps: [
			{ name: 'Выберите тип круиза', text: 'Решите, хотите ли вы частный круиз, групповую экскурсию или корпоративное мероприятие.' },
			{ name: 'Свяжитесь с нами', text: 'Позвоните по номеру +421 903 727 168 или напишите на pristav@brossforpartners.sk.' },
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
			description: 'Plávajúci hotel na Dunaji v Bratislave s 49 lôžkami, reštauráciou a kongresovou sálou.',
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
