<script lang="ts">
	import SocialLinks from '$lib/components/header/SocialLinks.svelte';
	import LanguageSelector from '$lib/components/header/LanguageSelector.svelte';
	import WeatherWidget from '$lib/components/header/WeatherWidget.svelte';
	import type { LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();
</script>

<header id="header" class="header-static">
	<div class="header-top">
		<div class="wrapper">
			<SocialLinks />
			<LanguageSelector currentLang={lang} />
		</div>
	</div>
	<WeatherWidget {lang} />
</header>

<style>
	.header-top {
		color: var(--color-white);
		background: var(--color-primary);
	}

	.header-top :global(.wrapper) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	/* Tablet */
	@media (max-width: 768px) {
		.header-top :global(.wrapper) {
			flex-wrap: wrap;
			gap: 8px;
		}
	}

	/* Mobile */
	@media (max-width: 480px) {
		.header-top :global(.wrapper) {
			flex-direction: column;
			gap: 8px;
			padding: 8px 15px;
		}
	}
</style>
