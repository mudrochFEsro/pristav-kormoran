import { sk } from './translations/sk';
import { en } from './translations/en';
import { ru } from './translations/ru';
import type { Translations } from './types';
import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from './config';

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

export function getNavRoutes(lang: LanguageCode) {
	const isDefault = lang === DEFAULT_LANGUAGE;
	const prefix = isDefault ? '' : `/${lang}`;
	const slugs = routeSlugs[lang];

	// Trailing slashes match `trailingSlash: 'always'` (no redirect on internal links)
	return {
		home: `${prefix}/`,
		about: `${prefix}/${slugs.about}/`,
		news: `${prefix}/${slugs.news}/`,
		region: `${prefix}/region/`,
		ports: `${prefix}/${slugs.ports}/`,
		botel: `${prefix}/botel-kormoran/`,
		boatTrips: `${prefix}/${slugs.boatTrips}/`,
		contact: `${prefix}/${slugs.contact}/`
	};
}

export type PageKey = keyof ReturnType<typeof getNavRoutes>;

function withSlash(path: string): string {
	return path.endsWith('/') ? path : `${path}/`;
}

/** Finds which page (and language version of it) a pathname is. */
export function findPage(pathname: string): { key: PageKey; lang: LanguageCode } | null {
	const path = withSlash(pathname);
	for (const { code } of LANGUAGES) {
		const routes = getNavRoutes(code);
		for (const key of Object.keys(routes) as PageKey[]) {
			if (routes[key] === path) return { key, lang: code };
		}
	}
	return null;
}

/** Localized URL of the same page in every language (falls back to each home page). */
export function getAlternatePaths(pathname: string): Record<LanguageCode, string> {
	const key = findPage(pathname)?.key ?? 'home';
	return Object.fromEntries(LANGUAGES.map(({ code }) => [code, getNavRoutes(code)[key]])) as Record<
		LanguageCode,
		string
	>;
}
