<script lang="ts">
	import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang));
	const routes = $derived(getNavRoutes(lang));

	const FACEBOOK_URL = 'https://www.facebook.com/pristavkormoran';
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
					<a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer__social-link footer__social-link--facebook">
						<svg viewBox="0 0 24 24" fill="currentColor" class="footer__social-icon" aria-hidden="true">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
					</a>
					<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer__social-link footer__social-link--instagram">
						<svg viewBox="0 0 24 24" fill="currentColor" class="footer__social-icon" aria-hidden="true">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
						</svg>
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
		gap: 10px;
	}

	.footer__social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		color: var(--color-white);
		transition: all 0.3s var(--ease-out-expo);
		position: relative;
		overflow: hidden;
	}

	/* Shine effect on hover */
	.footer__social-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.4s ease;
	}

	.footer__social-link:hover::before {
		left: 100%;
	}

	.footer__social-link:hover {
		transform: translateY(-2px) scale(1.1);
	}

	.footer__social-link:active {
		transform: translateY(0) scale(1);
	}

	/* Facebook brand color */
	.footer__social-link--facebook:hover {
		background-color: #1877f2;
		box-shadow: 0 4px 12px rgba(24, 119, 242, 0.5);
	}

	/* Instagram gradient */
	.footer__social-link--instagram:hover {
		background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
		box-shadow: 0 4px 12px rgba(225, 48, 108, 0.5);
	}

	.footer__social-icon {
		width: 16px;
		height: 16px;
		position: relative;
		z-index: 1;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.footer__social-link {
			transition: none;
		}

		.footer__social-link:hover {
			transform: none;
		}

		.footer__social-link::before {
			display: none;
		}
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
