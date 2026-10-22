import { LANGUAGES, getNavRoutes, t, type PageKey } from '$lib/i18n';
import { siteConfig, locations, faq, firstSentence, hiddenPages } from '$lib/seo';

export const prerender = true;
export const trailingSlash = 'never';

// llms.txt (https://llmstxt.org) - concise site summary for AI assistants (GEO).
// Built from the same translations and page map as the site, so it never drifts.
export function GET() {
	const en = t('en');
	const pageKeys = (Object.keys(getNavRoutes('en')) as PageKey[]).filter((key) => !hiddenPages.includes(key));
	const url = (path: string) => `${siteConfig.url}${path}`;

	const ports = Object.values(locations).map((port) => {
		const key = `port${port.number}` as const;
		return `- **${port.name}** – ${en.ports[`${key}Title`]} ${firstSentence(en.ports[`${key}Text`])}`;
	});

	const pages = LANGUAGES.map(({ code, label }) => {
		const tr = t(code);
		const routes = getNavRoutes(code);
		const links = pageKeys.map((key) => {
			const name = key === 'home' ? tr.site.title : tr.nav[key];
			return `- [${name}](${url(routes[key])}): ${tr.seo[key]}`;
		});
		return `## Pages – ${label} (${code})\n\n${links.join('\n')}`;
	});

	const faqLines = faq.en.map(({ question, answer }) => `### ${question}\n\n${answer}`);

	const body = `# ${siteConfig.name}

> ${en.home.introText}

${en.home.servicesText}

## Key facts

- Operator: ${siteConfig.legalName}, ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality} (IČO ${siteConfig.ico})
- Phone: ${siteConfig.phoneFormatted}
- Email: ${siteConfig.email}
- Main location: Čilistov, ${locations.main.address.postalCode} ${locations.main.address.addressLocality}, Slovakia
- Languages: Slovak (default), English, Russian
- Winter boat bar SUNSET (Čilistov): ${en.news.openingHours}, from 6 November

## Ports

${ports.join('\n')}

${pages.join('\n\n')}

## FAQ

${faqLines.join('\n\n')}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
