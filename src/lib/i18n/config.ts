export const LANGUAGES = [
	{ code: 'sk', label: 'slovenský', htmlLang: 'sk', ogLocale: 'sk_SK' },
	{ code: 'en', label: 'english', htmlLang: 'en', ogLocale: 'en_GB' },
	{ code: 'ru', label: 'русский', htmlLang: 'ru', ogLocale: 'ru_RU' }
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'sk';

export function isValidLanguage(lang: string): lang is LanguageCode {
	return LANGUAGES.some((l) => l.code === lang);
}

export function getLanguageConfig(code: LanguageCode) {
	return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
