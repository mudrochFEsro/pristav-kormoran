import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANGUAGE, isValidLanguage } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	// Extract language from URL
	const pathParts = event.url.pathname.split('/').filter(Boolean);
	const langParam = pathParts[0];
	const lang = langParam && isValidLanguage(langParam) ? langParam : DEFAULT_LANGUAGE;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%sveltekit.language%', lang)
	});
};
