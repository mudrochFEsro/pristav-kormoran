<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import Divider from '$lib/components/ui/Divider.svelte';
	import CategoryCard from '$lib/components/ui/CategoryCard.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const translations = $derived(t(data.lang));
</script>

<svelte:head>
	<title>{translations.site.title}</title>
	<meta name="description" content={translations.site.description} />
</svelte:head>

<img class="main-img" src="/images/static-main.jpg" alt="" />
<h1 class="main-title" use:scrollReveal={{ variant: 'fade' }}>
	{translations.home.title}
</h1>
<div class="main-text" use:scrollReveal={{ variant: 'fade', delay: 100 }}>
	<p>
		{translations.home.description}
	</p>
</div>
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
