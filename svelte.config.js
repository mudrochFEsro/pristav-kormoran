import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Enable ISR (Incremental Static Regeneration) for prerendered pages
			runtime: 'nodejs22.x',
			regions: ['fra1'], // Frankfurt - closest to Slovakia
			split: false
		}),
		// Inline small CSS files into HTML - removes render-blocking stylesheet requests
		inlineStyleThreshold: 25 * 1024,
		// Prerender all pages by default (SSG)
		prerender: {
			// No '*': it would render every [[lang]] route without its prefix (e.g. SK /about-us/).
			// Pages come from each +page.ts entries(), the rest from links.
			entries: ['/sitemap.xml', '/llms.txt'],
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
