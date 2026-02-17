export interface Translations {
	// Site
	site: {
		title: string;
		description: string;
	};

	// SEO meta descriptions for each page
	seo: {
		home: string;
		about: string;
		news: string;
		region: string;
		ports: string;
		botel: string;
		boatTrips: string;
		contact: string;
	};

	// Navigation
	nav: {
		home: string;
		about: string;
		news: string;
		region: string;
		ports: string;
		botel: string;
		boatTrips: string;
		contact: string;
	};

	// Weather
	weather: {
		bratislava: string;
		samarin: string;
		cilistov: string;
		loading: string;
		error: string;
		humidity: string;
		windSpeed: string;
	};

	// Homepage
	home: {
		title: string;
		description: string;
		intro: string;
		introText: string;
		services: string;
		servicesText: string;
		location: string;
		locationText: string;
		// Landing page specific
		badge: string;
		brandName: string;
		explorePorts: string;
		scroll: string;
		aboutUs: string;
		yearsExperience: string;
		years: string;
		ports: string;
		mooringSpots: string;
		spots: string;
		largestMarina: string;
		ourServices: string;
		ourPorts: string;
		showAllPorts: string;
		locality: string;
		fromBratislava: string;
		onDanube: string;
		freeParking: string;
		// Amenities section
		amenities: string;
		amenitiesSubtitle: string;
		electricity: string;
		electricityDesc: string;
		water: string;
		waterDesc: string;
		wifi: string;
		wifiDesc: string;
		service: string;
		serviceDesc: string;
		parking: string;
		parkingDesc: string;
		security: string;
		securityDesc: string;
		restaurant: string;
		restaurantDesc: string;
		// CTA section
		ctaTitle: string;
		ctaSubtitle: string;
		contactUs: string;
		// Partner banner
		partner: string;
		partnerTitle: string;
		partnerSubtitle: string;
		learnMore: string;
	};

	// Categories
	categories: {
		entertainment: string;
		sport: string;
		relax: string;
		traditions: string;
	};

	// Contact page
	contact: {
		title: string;
		portManager: string;
		operator: string;
		address: string;
		ico: string;
		dic: string;
		icdph: string;
	};

	// About page
	about: {
		title: string;
		intro: string;
		introText: string;
		events: string;
		eventsText: string;
		corporateEvents: string;
		corporateEventsText: string;
	};

	// News page
	news: {
		title: string;
		articleTitle: string;
		articleText: string;
		contactOrders: string;
	};

	// Region page
	region: {
		title: string;
		zitnyOstrov: string;
		zitnyOstrovText: string;
		cyclePath: string;
	};

	// Ports page
	ports: {
		title: string;
		port1Title: string;
		port1Text: string;
		port2Title: string;
		port2Text: string;
		port3Title: string;
		port3Text: string;
		port4Title: string;
		port4Text: string;
		port5Title: string;
		port5Text: string;
		port6Title: string;
		port6Text: string;
		moreInfo: string;
	};

	// Botel page
	botel: {
		title: string;
		description: string;
		contactInfo: string;
		roomTypes: string;
	};

	// Boat trips page
	boatTrips: {
		title: string;
		description: string;
		contactLabel: string;
	};

	// Error page
	error: {
		title: string;
		message: string;
		backHome: string;
	};

	// Footer
	footer: {
		copyright: string;
	};

	// Common
	common: {
		moreInfo: string;
		contact: string;
		phone: string;
		email: string;
	};
}
