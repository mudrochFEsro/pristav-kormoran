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

<footer class="footer">
	<div class="footer__content">
		<div class="wrapper">
			<div class="footer__grid">
				<nav class="footer__nav" aria-label="Footer navigation">
					<ul>
						<li><a href={routes.about}>{translations.nav.about}</a></li>
						<li><a href={routes.news}>{translations.nav.news}</a></li>
						<li><a href={routes.region}>{translations.nav.region}</a></li>
						<li><a href={routes.ports}>{translations.nav.ports}</a></li>
						<li><a href={routes.boatTrips}>{translations.nav.boatTrips}</a></li>
						<li><a href={routes.contact}>{translations.nav.contact}</a></li>
					</ul>
				</nav>
				<div class="footer__info">
					<strong>BROSS for PARTNERS, a.s.</strong>
					<span>Hollého 1, 81108 Bratislava</span>
				</div>
				<div class="footer__social">
					<a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
						<span class="icon-facebook-with-circle"></span>
					</a>
					<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
						<span class="icon-instagram-with-circle"></span>
					</a>
				</div>
			</div>
			<div class="footer__bottom">
				{translations.footer.copyright}
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		font-size: 13px;
		background: var(--color-bg-footer);
		color: rgba(255, 255, 255, 0.7);
	}

	.footer__content :global(.wrapper) {
		padding: 25px 40px 15px;
	}

	.footer__grid {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding-bottom: 15px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer__nav ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 18px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer__nav li {
		text-transform: uppercase;
		font-size: 11px;
		letter-spacing: 0.5px;
	}

	.footer__nav li a {
		display: inline-block;
		padding: 4px 0;
		color: rgba(255, 255, 255, 0.7);
		transition: color 0.2s ease;
	}

	.footer__nav li a:hover {
		color: var(--color-primary);
	}

	.footer__info {
		display: flex;
		align-items: center;
		gap: 15px;
		font-size: 12px;
	}

	.footer__info strong {
		color: var(--color-white);
		font-weight: 500;
	}

	.footer__info span {
		opacity: 0.7;
	}

	.footer__social {
		display: flex;
		gap: 12px;
	}

	.footer__social a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		color: var(--color-white);
		transition: all 0.2s ease;
	}

	.footer__social a:hover {
		background: var(--color-primary);
		transform: translateY(-2px);
	}

	.footer__social :global([class^='icon-']) {
		font-size: 18px;
	}

	.footer__bottom {
		text-align: center;
		padding-top: 15px;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		opacity: 0.5;
	}

	/* Tablet */
	@media (max-width: 768px) {
		.footer__content :global(.wrapper) {
			padding: 20px;
		}

		.footer__grid {
			flex-direction: column;
			text-align: center;
			gap: 20px;
		}

		.footer__nav ul {
			justify-content: center;
		}

		.footer__info {
			flex-direction: column;
			gap: 5px;
		}
	}

	/* Mobile */
	@media (max-width: 480px) {
		.footer__nav ul {
			gap: 5px 12px;
		}

		.footer__nav li {
			font-size: 10px;
		}
	}
</style>
