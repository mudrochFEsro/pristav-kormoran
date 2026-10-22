<script lang="ts">
	import { t, type LanguageCode } from '$lib/i18n';
	import { responsive } from '$lib/images';
	import Divider from '$lib/components/ui/Divider.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const news = $derived(t(lang).news);
</script>

<h1 class="static-title static-title-no-img" use:scrollReveal={{ variant: 'fade' }}>{news.title}</h1>
<Divider />

<article class="news" aria-labelledby="news-title">
	<div class="news__body" use:scrollReveal={{ variant: 'fade', delay: 50 }}>
		<time class="news__date" datetime="2026-10-22">{news.date}</time>
		<h2 id="news-title" class="news__title">{news.articleTitle}</h2>
		<p class="news__text">{news.articleText}</p>
		<p class="news__hours"><strong>{news.openingHoursLabel}:</strong> {news.openingHours}</p>
	</div>

	<div class="feature">
		<img
			class="feature__img feature__img--main"
			{...responsive('/images/botel-ubytovanie-restauracia1.webp')}
			sizes="(max-width: 900px) 100vw, (max-width: 1100px) 64vw, 700px"
			alt={news.imageAltBar}
			fetchpriority="high"
			decoding="async"
		/>
		<img
			class="feature__img feature__img--sunset"
			{...responsive('/images/sunset-zapad-slnka.jpg')}
			sizes="(max-width: 900px) 50vw, 360px"
			alt={news.imageAltSunset}
			loading="lazy"
			decoding="async"
		/>
		<img
			class="feature__img feature__img--boat"
			{...responsive('/images/sunset-lod-vecer.jpg')}
			sizes="(max-width: 900px) 50vw, 360px"
			alt={news.imageAltBoat}
			loading="lazy"
			decoding="async"
		/>

		<div class="card">
			<p class="card__eyebrow"><span class="card__bar" aria-hidden="true"></span>{news.eyebrow}</p>
			<p class="card__headline">{news.headline}</p>
			<p class="card__lead">{news.lead}</p>
			<p class="card__highlights">{news.highlights}</p>
			<div class="card__footer">
				<p class="card__hours">{news.hours}</p>
				<p class="card__location">{news.location}</p>
			</div>
		</div>
	</div>
</article>

<style>
	.news {
		--news-gap: var(--space-2);
		--news-card-bg: var(--color-bg-light);

		max-width: var(--container-max-width);
		margin: var(--space-7) auto var(--space-10);
		font-family: var(--font-primary);
	}

	/* Desktop: collage 792 : 400 at 4:3, card overlaid bottom-left (as in design) */
	.feature {
		position: relative;
		display: grid;
		grid-template-columns: 792fr 400fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'main sunset'
			'main boat';
		gap: var(--news-gap);
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--news-card-bg);
	}

	.feature__img {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;
		object-fit: cover;
	}

	.feature__img--main {
		grid-area: main;
		object-position: 38% 50%;
	}

	.feature__img--sunset {
		grid-area: sunset;
		object-position: 50% 60%;
	}

	.feature__img--boat {
		grid-area: boat;
		object-position: 35% 70%;
	}

	.card {
		position: absolute;
		left: clamp(var(--space-5), 3.7%, 44px);
		bottom: clamp(var(--space-5), 4.9%, 44px);
		width: min(480px, 50%);
		box-sizing: border-box;
		padding: var(--space-7) var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		background: var(--news-card-bg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.card p {
		margin: 0;
	}

	.card__eyebrow {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--size-small);
		font-weight: var(--font-weight-medium);
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--color-text-primary);
	}

	.card__bar {
		flex: 0 0 36px;
		height: 4px;
		background: var(--color-primary);
	}

	.card__headline {
		font-size: var(--size-heading-xl);
		font-weight: var(--font-weight-light);
		line-height: 1.2;
		color: var(--color-text-dark);
		text-wrap: balance;
	}

	.card__lead,
	.card__highlights,
	.card__hours {
		font-size: var(--size-body);
		line-height: 1.6;
	}

	.card__lead,
	.card__highlights {
		font-weight: var(--font-weight-light);
		color: var(--color-text-primary);
	}

	.card__footer {
		margin-top: var(--space-1);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-light);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-1) var(--space-4);
	}

	.card__hours {
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.card__location {
		font-size: var(--size-small);
		color: var(--color-text-primary);
	}

	.news__body {
		max-width: 760px;
		padding: var(--space-2) 0 var(--space-7);
		text-align: left;
	}

	.news__date {
		display: block;
		margin-bottom: var(--space-3);
		font-size: var(--size-small);
		color: var(--color-text-primary);
	}

	.news__title {
		margin: 0 0 var(--space-4);
		font-size: var(--size-heading-lg);
		font-weight: var(--font-weight-medium);
		line-height: 1.3;
		/* primary-dark at ≥ 24px meets the 3:1 large-text contrast on white */
		color: var(--color-primary-dark);
		text-wrap: balance;
	}

	.news__text,
	.news__hours {
		margin: 0 0 var(--space-3);
		font-size: var(--size-body);
		font-weight: var(--font-weight-light);
		line-height: 1.875;
		color: var(--color-text-primary);
	}

	.news__hours strong {
		font-weight: var(--font-weight-medium);
	}

	/* Tablet & mobile: main photo, card overlapping its bottom edge, two photos side by side */
	@media (max-width: 900px) {
		.feature {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'main main'
				'card card'
				'sunset boat';
			aspect-ratio: auto;
			border-radius: 0;
			overflow: visible;
			background: none;
		}

		.feature__img {
			border-radius: var(--radius-lg);
		}

		.feature__img--main {
			aspect-ratio: 3 / 2;
			height: auto;
		}

		.feature__img--sunset,
		.feature__img--boat {
			aspect-ratio: 4 / 5;
			height: auto;
		}

		.card {
			grid-area: card;
			position: relative;
			left: auto;
			bottom: auto;
			width: auto;
			margin: calc(var(--space-10) * -1) var(--space-4) var(--space-2);
			padding: var(--space-6);
		}
	}

	@media (max-width: 768px) {
		.card__headline {
			font-size: var(--size-heading-lg);
		}

		.news__title {
			font-size: 24px;
		}
	}

	@media (max-width: 480px) {
		.card {
			margin-inline: var(--space-3);
			padding: var(--space-5);
		}

		.card__headline {
			font-size: 24px;
		}

		.news__text,
		.news__hours {
			font-size: 15px;
			line-height: 1.7;
		}
	}
</style>
