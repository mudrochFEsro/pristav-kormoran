<script lang="ts">
	import { browser } from '$app/environment';
	import type { LanguageCode } from '$lib/i18n';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	interface City {
		name: string;
		nameSk: string;
		nameEn: string;
		nameRu: string;
		lat: number;
		lon: number;
	}

	interface WeatherData {
		city: City;
		temp: number;
		weatherCode: number;
	}

	const CITIES: City[] = [
		{
			name: 'Bratislava',
			nameSk: 'Bratislava',
			nameEn: 'Bratislava',
			nameRu: 'Братислава',
			lat: 48.1486,
			lon: 17.1077
		},
		{
			name: 'Šamorín',
			nameSk: 'Šamorín',
			nameEn: 'Šamorín',
			nameRu: 'Шаморин',
			lat: 48.0258,
			lon: 17.3119
		},
		{
			name: 'Čilistov',
			nameSk: 'Čilistov',
			nameEn: 'Čilistov',
			nameRu: 'Чилистов',
			lat: 48.0583,
			lon: 17.275
		}
	];

	let weatherData = $state<WeatherData[]>([]);
	let isLoading = $state(true);

	// Weather icon mapping - optimized with Map for O(1) lookup
	const WEATHER_ICONS: Map<number, string> = new Map([
		[0, 'icon-clear-sky'],
		[1, 'icon-few-clouds'],
		[2, 'icon-few-clouds'],
		[3, 'icon-scattered-clouds']
	]);

	function getWeatherIcon(code: number): string {
		if (WEATHER_ICONS.has(code)) return WEATHER_ICONS.get(code)!;
		if (code >= 45 && code <= 48) return 'icon-mist';
		if (code >= 51 && code <= 57) return 'icon-shower-rain';
		if (code >= 61 && code <= 67) return 'icon-rain';
		if (code >= 71 && code <= 77) return 'icon-snow';
		if (code >= 80 && code <= 82) return 'icon-shower-rain';
		if (code >= 85 && code <= 86) return 'icon-snow';
		if (code >= 95 && code <= 99) return 'icon-thunderstorm';
		return 'icon-broken-clouds';
	}

	// Derived city name based on language - reactive
	function getCityName(city: City): string {
		const names: Record<LanguageCode, string> = {
			sk: city.nameSk,
			en: city.nameEn,
			ru: city.nameRu
		};
		return names[lang];
	}

	async function fetchWeather(signal?: AbortSignal): Promise<void> {
		if (!browser) return;

		try {
			// Batch all cities in parallel with abort support
			const data = await Promise.all(
				CITIES.map(async (city) => {
					const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=Europe/Bratislava`;
					const response = await fetch(url, { signal });

					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}

					const json = await response.json();
					return {
						city,
						temp: Math.round(json.current.temperature_2m * 10) / 10,
						weatherCode: json.current.weather_code
					};
				})
			);
			weatherData = data;
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') return;
			console.error('Failed to fetch weather data:', error);
		} finally {
			isLoading = false;
		}
	}

	// Svelte 5 $effect - runs on mount and cleanup automatically
	$effect(() => {
		const controller = new AbortController();

		fetchWeather(controller.signal);

		// Refresh every 10 minutes
		const interval = setInterval(() => {
			fetchWeather(controller.signal);
		}, 10 * 60 * 1000);

		return () => {
			controller.abort();
			clearInterval(interval);
		};
	});
</script>

<div class="weather-header">
	<div class="wrapper">
		{#each CITIES as city, index (city.name)}
			<div class="weather-location">
				<h1>{weatherData[index]?.temp ?? '--'}°</h1>
				<div class="location-weather-wrapper">
					<span
						class="weather-icon {weatherData[index]
							? getWeatherIcon(weatherData[index].weatherCode)
							: 'icon-broken-clouds'}"
						aria-hidden="true"
					></span>
					<h4>{getCityName(city)}</h4>
				</div>
			</div>
		{/each}
	</div>
</div>
