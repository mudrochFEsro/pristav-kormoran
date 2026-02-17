import { sk } from './translations/sk';
import { en } from './translations/en';
import { ru } from './translations/ru';
import type { Translations } from './types';
import { DEFAULT_LANGUAGE, type LanguageCode } from './config';

export { LANGUAGES, DEFAULT_LANGUAGE, isValidLanguage, getLanguageConfig } from './config';
export type { LanguageCode } from './config';
export type { Translations } from './types';

const translations: Record<LanguageCode, Translations> = {
	sk,
	en,
	ru
};

export function t(lang: LanguageCode | undefined): Translations {
	if (!lang || !translations[lang]) {
		return translations[DEFAULT_LANGUAGE];
	}
	return translations[lang];
}

// Route slugs per language
const routeSlugs: Record<LanguageCode, {
	about: string;
	news: string;
	ports: string;
	boatTrips: string;
	contact: string;
}> = {
	sk: {
		about: 'o-nas',
		news: 'novinky',
		ports: 'pristavy',
		boatTrips: 'vylety-lodou',
		contact: 'kontakt'
	},
	en: {
		about: 'about-us',
		news: 'news',
		ports: 'ports',
		boatTrips: 'boat-trips',
		contact: 'contact'
	},
	ru: {
		about: 'o-nas',
		news: 'novosti',
		ports: 'porty',
		boatTrips: 'progulki-na-lodke',
		contact: 'kontakt'
	}
};

export interface NavRoutes {
	home: string;
	about: string;
	news: string;
	region: string;
	ports: string;
	botel: string;
	boatTrips: string;
	contact: string;
}

export function getNavRoutes(lang: LanguageCode): NavRoutes {
	const isDefault = lang === DEFAULT_LANGUAGE;
	const prefix = isDefault ? '' : `/${lang}`;
	const slugs = routeSlugs[lang];

	return {
		home: prefix || '/',
		about: `${prefix}/${slugs.about}`,
		news: `${prefix}/${slugs.news}`,
		region: `${prefix}/region`,
		ports: `${prefix}/${slugs.ports}`,
		botel: `${prefix}/botel-kormoran`,
		boatTrips: `${prefix}/${slugs.boatTrips}`,
		contact: `${prefix}/${slugs.contact}`
	};
}
