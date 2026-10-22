import { LANGUAGES, getNavRoutes, type PageKey } from '$lib/i18n';
import { siteConfig, hiddenPages } from '$lib/seo';

export const prerender = true;
export const trailingSlash = 'never';

// Built from the same page map as canonical/hreflang tags, so URLs always match
export function GET() {
	const pageKeys = (Object.keys(getNavRoutes('sk')) as PageKey[]).filter((key) => !hiddenPages.includes(key));

	const urls = pageKeys.flatMap((key) => {
		const hrefs = LANGUAGES.map(({ code }) => `${siteConfig.url}${getNavRoutes(code)[key]}`);
		const links = [
			...LANGUAGES.map(({ code }, i) => [code, hrefs[i]]),
			['x-default', hrefs[0]]
		]
			.map(([hreflang, href]) => `\t\t<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
			.join('\n');

		return hrefs.map((href) => `\t<url>\n\t\t<loc>${href}</loc>\n${links}\n\t</url>`);
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
