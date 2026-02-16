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
		// Prerender all pages by default (SSG)
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
