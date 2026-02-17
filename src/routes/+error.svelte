<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { type LanguageCode } from '$lib/i18n';

	// Extract language from URL
	function getLang(): LanguageCode {
		const pathname = $page.url.pathname;
		if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
		if (pathname.startsWith('/ru/') || pathname === '/ru') return 'ru';
		return 'sk';
	}

	const lang = $derived(getLang());
	const homeUrl = $derived(lang === 'sk' ? '/' : `/${lang}/`);

	// Redirect to homepage on any error (including 404)
	$effect(() => {
		goto(homeUrl, { replaceState: true });
	});
</script>
