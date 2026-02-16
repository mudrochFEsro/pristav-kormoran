<script lang="ts">
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));

	const FACEBOOK_URL = 'http://www.facebook.com/pristavkormoran';
	const INSTAGRAM_URL = 'https://www.instagram.com/kormoran_ports/';
	const BROSS_URL = 'http://www.brossforpartners.sk/';
</script>

<div id="footer">
	<div class="footer-main">
		<div class="wrapper">
			<div class="footer-nav">
				<ul>
					<li><a href={routes.about}>{translations.nav.about}</a></li>
					<li><a href={routes.news}>{translations.nav.news}</a></li>
					<li><a href={routes.region}>{translations.nav.region}</a></li>
					<li><a href={routes.ports}>{translations.nav.ports}</a></li>
					<li><a href={routes.boatTrips}>{translations.nav.boatTrips}</a></li>
					<li><a href={routes.contact}>{translations.nav.contact}</a></li>
				</ul>
			</div>
			<div class="footer-info">
				<address>
					<div><strong>BROSS for PARTNERS, a.s.</strong></div>
					<div>Hollého 1, 81108 Bratislava</div>
					<div>
						IČO: 35 853 603<br />
						DIČ: 2021727004<br />
						IČ DPH: SK2021727004<br />
					</div>
					<div>
						<a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
							<span class="icon-facebook-with-circle"></span>
						</a>
						<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
							<span class="icon-instagram-with-circle"></span>
						</a>
					</div>
				</address>
				<a href={BROSS_URL} target="_blank" rel="noopener noreferrer">
					<img src="/images/logo-bross.svg" alt="BROSS for PARTNERS, a.s." />
				</a>
			</div>
		</div>
	</div>
	<div class="footer-cred">
		<div class="wrapper">
			{translations.footer.copyright}
		</div>
	</div>
</div>
