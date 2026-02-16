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

<div id="header">
	<div class="social-language-header">
		<div class="wrapper">
			<SocialLinks />
			<LanguageSelector currentLang={lang} />
		</div>
	</div>
	<WeatherWidget {lang} />
</div>
