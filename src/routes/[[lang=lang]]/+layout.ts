import type { LayoutLoad } from './$types';
import { DEFAULT_LANGUAGE, isValidLanguage, type LanguageCode } from '$lib/i18n';

export const load: LayoutLoad = ({ params }) => {
	const lang: LanguageCode =
		params.lang && isValidLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE;

	return {
		lang
	};
};

