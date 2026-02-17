<script lang="ts">
	import { resolve } from '$app/paths';
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));

	const FACEBOOK_URL = 'https://www.facebook.com/pristavkormoran';
	const INSTAGRAM_URL = 'https://www.instagram.com/kormoran_ports/';

	// External link text for screen readers
	const externalLinkText = $derived(
		lang === 'sk' ? 'otvorí sa v novom okne' :
		lang === 'ru' ? 'откроется в новом окне' :
		'opens in new window'
	);
</script>

<footer class="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
	<div class="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-16">
		<div class="grid gap-8 md:grid-cols-3 md:items-center lg:gap-12">
			<!-- Navigation -->
			<nav aria-label="Footer navigation">
				<ul class="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
					<li>
						<a href={resolve(routes.about)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.about}
						</a>
					</li>
					<li>
						<a href={resolve(routes.news)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.news}
						</a>
					</li>
					<li>
						<a href={resolve(routes.region)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.region}
						</a>
					</li>
					<li>
						<a href={resolve(routes.ports)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.ports}
						</a>
					</li>
					<li>
						<a href={resolve(routes.boatTrips)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.boatTrips}
						</a>
					</li>
					<li>
						<a href={resolve(routes.contact)} class="text-sm text-gray-500 transition-colors hover:text-orange-500">
							{translations.nav.contact}
						</a>
					</li>
				</ul>
			</nav>

			<!-- Company Info -->
			<div class="text-center">
				<p class="font-medium text-gray-900">BROSS for PARTNERS, a.s.</p>
				<p class="text-sm text-gray-500">Hollého 1, 81108 Bratislava</p>
			</div>

			<!-- Social Links -->
			<div class="flex justify-center gap-3 md:justify-end">
				<a
					href={FACEBOOK_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook ({externalLinkText})"
					class="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:text-white hover:shadow-lg"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
				</a>
				<a
					href={INSTAGRAM_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram ({externalLinkText})"
					class="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-orange-500 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
					</svg>
				</a>
			</div>
		</div>

		<!-- Bottom -->
		<div class="mt-10 border-t border-gray-100 pt-8 text-center lg:mt-12">
			<p class="text-sm text-gray-400">
				{translations.footer.copyright}
			</p>
		</div>
	</div>
</footer>
