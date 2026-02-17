<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { SEO } from '$lib/seo';
	import Divider from '$lib/components/ui/Divider.svelte';
	import CategoryCard from '$lib/components/ui/CategoryCard.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<SEO
	title={translations.site.title}
	description={translations.seo.home}
	lang={data.lang}
	includeFaq={true}
/>

<img class="main-img" src="/images/static-main.jpg" alt="Prístav Kormorán - prístavy na Dunaji" />
<h1 class="main-title" use:scrollReveal={{ variant: 'fade' }}>
	{translations.home.title}
</h1>
<div class="main-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>
		{translations.home.description}
	</p>
</div>

<section class="home-section" use:scrollReveal={{ variant: 'fade' }}>
	<h2 class="home-section__title">{translations.home.intro}</h2>
	<p class="home-section__text">{translations.home.introText}</p>
</section>

<section class="home-section" use:scrollReveal={{ variant: 'fade', delay: 50 }}>
	<h2 class="home-section__title">{translations.home.services}</h2>
	<p class="home-section__text">{translations.home.servicesText}</p>
</section>

<section class="home-section" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<h2 class="home-section__title">{translations.home.location}</h2>
	<p class="home-section__text">{translations.home.locationText}</p>
</section>

<Divider />
<div class="categories">
	<CategoryCard
		image="/images/fun-thumb.png"
		imageAlt={translations.categories.entertainment}
		icon="icon-camera"
		title={translations.categories.entertainment}
		animationDelay={0}
	/>
	<CategoryCard
		image="/images/sports-thumb.png"
		imageAlt={translations.categories.sport}
		icon="icon-tennis"
		title={translations.categories.sport}
		animationDelay={100}
	/>
	<CategoryCard
		image="/images/relax-thumb.png"
		imageAlt={translations.categories.relax}
		icon="icon-tennis"
		title={translations.categories.relax}
		animationDelay={200}
	/>
	<CategoryCard
		image="/images/tradition-thumb.png"
		imageAlt={translations.categories.traditions}
		icon="icon-award"
		title={translations.categories.traditions}
		animationDelay={300}
	/>
</div>
<div class="banner">
	<a
		href="http://cilistovskalaguna.sk/?utm_source=pristavkormoran"
		title="Čilistovská lagúna - práve skolaudované! K novému bývaniu zdarma kotvenie vášho plavidla v prístave Kormorán"
	>
		<img
			src="/images/banner-laguna.jpg"
			alt="Čilistovská lagúna - práve skolaudované! K novému bývaniu zdarma kotvenie vášho plavidla v prístave Kormorán"
		/>
	</a>
</div>

<style>
	.home-section {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-6) var(--space-8);
		text-align: center;
	}

	.home-section__title {
		font-family: var(--font-primary);
		font-weight: var(--font-weight-medium);
		font-size: var(--size-heading-lg);
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.home-section__text {
		font-family: var(--font-primary);
		font-weight: var(--font-weight-light);
		font-size: var(--size-body);
		line-height: 1.875;
		color: var(--color-text-primary);
		text-align: justify;
	}

	@media (max-width: 768px) {
		.home-section {
			padding: var(--space-5) var(--space-4);
		}

		.home-section__title {
			font-size: 22px;
		}
	}
</style>
