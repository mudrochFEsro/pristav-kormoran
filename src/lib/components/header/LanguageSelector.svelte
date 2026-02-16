<script lang="ts">
	import { LANGUAGES, type LanguageCode } from '$lib/i18n';
	import { goto } from '$app/navigation';

	interface Props {
		currentLang: LanguageCode;
	}

	let { currentLang }: Props = $props();

	// Navigate when language changes
	function handleChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const newLang = select.value as LanguageCode;

		if (newLang === currentLang) return;

		// Use replaceState for language switch to avoid polluting history
		const url = newLang === 'sk' ? '/' : `/${newLang}/`;
		goto(url, { replaceState: true });
	}
</script>

<div class="language-header">
	<div class="custom-select">
		<select
			id="language"
			name="language"
			value={currentLang}
			onchange={handleChange}
			aria-label="Select language"
		>
			{#each LANGUAGES as lang (lang.code)}
				<option value={lang.code}>
					{lang.label}
				</option>
			{/each}
		</select>
	</div>
</div>
