<script lang="ts">
	import SocialLinks from '$lib/components/header/SocialLinks.svelte';
	import LanguageSelector from '$lib/components/header/LanguageSelector.svelte';
	import type { LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();
</script>

<header id="header" class="header-static">
	<div class="header-top">
		<div class="wrapper">
			<SocialLinks {lang} />
			<LanguageSelector currentLang={lang} />
		</div>
	</div>
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
		padding: var(--space-2) var(--space-8);
	}

	/* Mobile - keep social links and language side by side */
	@media (max-width: 768px) {
		.header-top :global(.wrapper) {
			gap: var(--space-3);
			padding: var(--space-2) var(--space-2);
		}
	}
</style>
