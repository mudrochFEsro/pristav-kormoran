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
		humidity: number;
		windSpeed: number;
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
	let error = $state<string | null>(null);

	// Weather icon mapping
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
			error = null;
			const data = await Promise.all(
				CITIES.map(async (city) => {
					const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Europe/Bratislava`;
					const response = await fetch(url, { signal });

					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}

					const json = await response.json();
					return {
						city,
						temp: Math.round(json.current.temperature_2m),
						weatherCode: json.current.weather_code,
						humidity: Math.round(json.current.relative_humidity_2m),
						windSpeed: Math.round(json.current.wind_speed_10m)
					};
				})
			);
			weatherData = data;
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') return;
			console.error('Failed to fetch weather data:', err);
			error = 'Failed to load weather';
		} finally {
			isLoading = false;
		}
	}

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

<div class="weather-bar" role="region" aria-label="Weather information">
	<div class="weather-bar__container">
		{#if isLoading}
			<div class="weather-bar__loading">Loading...</div>
		{:else if error}
			<div class="weather-bar__error">{error}</div>
		{:else}
			{#each weatherData as data (data.city.name)}
				<div class="weather-bar__location">
					<span class="weather-bar__temp">{data.temp}°C</span>
					<div class="weather-bar__details">
						<span
							class="weather-bar__icon {getWeatherIcon(data.weatherCode)}"
							aria-hidden="true"
						></span>
						<span class="weather-bar__city">{getCityName(data.city)}</span>
						<span class="weather-bar__extra">
							💧 {data.humidity}% | 💨 {data.windSpeed} km/h
						</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.weather-bar {
		background: var(--color-border-light);
		padding: var(--space-3) 0;
	}

	.weather-bar__container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		max-width: var(--container-max-width);
		margin: 0 auto;
		padding: 0 var(--space-5);
	}

	.weather-bar__location {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.weather-bar__location:nth-child(1) {
		justify-content: flex-start;
	}

	.weather-bar__location:nth-child(2) {
		justify-content: center;
	}

	.weather-bar__location:nth-child(3) {
		justify-content: flex-end;
	}

	.weather-bar__temp {
		font-size: 24px;
		font-family: var(--font-light);
		font-weight: normal;
		color: var(--color-text-dark);
	}

	.weather-bar__details {
		text-align: center;
	}

	.weather-bar__city {
		font-size: 13px;
		font-family: var(--font-primary);
		display: block;
		color: var(--color-text-dark);
	}

	.weather-bar__extra {
		font-size: 10px;
		color: var(--color-text-secondary);
		display: block;
		margin-top: 2px;
	}

	.weather-bar__icon {
		font-size: 28px;
		color: var(--color-primary);
	}

	.weather-bar__loading,
	.weather-bar__error {
		grid-column: 1 / -1;
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 13px;
	}

	/* Tablet & Mobile - show ALL cities */
	@media (max-width: 768px) {
		.weather-bar__container {
			grid-template-columns: repeat(3, 1fr) !important;
			gap: 8px;
			padding: 0 12px;
		}

		.weather-bar__location {
			display: flex !important;
			flex-direction: column;
			justify-content: center !important;
			text-align: center;
			gap: 4px;
		}

		/* Ensure all locations are visible */
		.weather-bar__location:nth-child(1),
		.weather-bar__location:nth-child(2),
		.weather-bar__location:nth-child(3) {
			display: flex !important;
		}

		.weather-bar__temp {
			font-size: 16px;
		}

		.weather-bar__icon {
			font-size: 18px;
		}

		.weather-bar__city {
			font-size: 10px;
		}

		.weather-bar__extra {
			display: none;
		}

		.weather-bar__details {
			display: block !important;
		}
	}
</style>
