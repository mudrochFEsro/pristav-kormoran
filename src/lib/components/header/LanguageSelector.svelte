<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { LANGUAGES, type LanguageCode } from '$lib/i18n';

	interface Props {
		currentLang: LanguageCode;
	}

	let { currentLang }: Props = $props();

	// Build href for each language based on current path
	function getLanguageHref(langCode: LanguageCode, currentPath: string): string {
		// Remove current language prefix from path
		let pathWithoutLang = currentPath;
		for (const lang of LANGUAGES) {
			if (currentPath.startsWith(`/${lang.code}/`)) {
				pathWithoutLang = currentPath.slice(lang.code.length + 1);
				break;
			} else if (currentPath === `/${lang.code}`) {
				pathWithoutLang = '/';
				break;
			}
		}

		if (langCode === 'sk') {
			return pathWithoutLang || '/';
		}
		return `/${langCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
	}

	// Short labels for display
	const shortLabels: Record<LanguageCode, string> = {
		sk: 'SK',
		en: 'EN',
		ru: 'RU'
	};
</script>

<nav class="lang-switcher" aria-label="Jazyk">
	<ul class="lang-switcher__list">
		{#each LANGUAGES as langConfig (langConfig.code)}
			<li>
				<a
					href={resolve(getLanguageHref(langConfig.code, $page.url.pathname))}
					class="lang-switcher__link"
					class:lang-switcher__link--active={currentLang === langConfig.code}
					aria-current={currentLang === langConfig.code ? 'page' : undefined}
					aria-label={langConfig.label}
					data-sveltekit-noscroll
				>
					{shortLabels[langConfig.code]}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.lang-switcher__list {
		display: flex;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 3px;
		background: rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.lang-switcher__link {
		display: block;
		padding: 4px 10px;
		color: rgba(255, 255, 255, 0.75);
		font-size: 12px;
		font-weight: 500;
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 6px;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.lang-switcher__link:hover {
		color: var(--color-white);
		background: rgba(255, 255, 255, 0.15);
	}

	.lang-switcher__link--active {
		color: var(--color-white);
		background: var(--color-primary-dark);
		font-weight: 600;
	}

	.lang-switcher__link--active:hover {
		background: var(--color-primary-dark);
		color: var(--color-white);
	}
</style>
