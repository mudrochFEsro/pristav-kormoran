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

export function t(lang: LanguageCode): Translations {
	return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}

export function getNavRoutes(lang: LanguageCode) {
	const isDefault = lang === DEFAULT_LANGUAGE;
	const prefix = isDefault ? '' : `/${lang}`;

	return {
		home: prefix || '/',
		about: `${prefix}/${lang === 'en' ? 'about-us' : 'o-nas'}`,
		news: `${prefix}/${lang === 'en' ? 'news' : lang === 'ru' ? 'novosti' : 'novinky'}`,
		region: `${prefix}/region`,
		ports: `${prefix}/${lang === 'en' ? 'ports' : lang === 'ru' ? 'porty' : 'pristavy'}`,
		botel: `${prefix}/botel-kormoran`,
		boatTrips: `${prefix}/${lang === 'en' ? 'boat-trips' : lang === 'ru' ? 'progulki-na-lodke' : 'vylety-lodou'}`,
		contact: `${prefix}/${lang === 'en' ? 'contact' : 'kontakt'}`
	};
}
