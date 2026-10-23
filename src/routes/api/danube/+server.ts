import { json } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';
import type { RequestHandler } from './$types';
import { getDanubeData } from '$lib/server/danube';

// Not prerendered: Vercel ISR serves the cached JSON and refreshes it in the background every 15 min
export const prerender = false;
export const config: Config = {
	isr: { expiration: 15 * 60 }
};

export const GET: RequestHandler = async ({ fetch }) => json(await getDanubeData(fetch));
