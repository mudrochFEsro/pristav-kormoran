<script lang="ts">
	import { browser } from '$app/environment';
	import { t, type LanguageCode } from '$lib/i18n';
	import type { CityKey, DanubeData, LevelReading, Trend, WaterTempReading } from '$lib/server/danube';

	interface Props {
		lang: LanguageCode;
	}

	let { lang }: Props = $props();

	const translations = $derived(t(lang).weather);

	interface City {
		key: CityKey;
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
			key: 'bratislava',
			name: 'Bratislava',
			nameSk: 'Bratislava',
			nameEn: 'Bratislava',
			nameRu: 'Братислава',
			lat: 48.1486,
			lon: 17.1077
		},
		{
			key: 'samorin',
			name: 'Šamorín',
			nameSk: 'Šamorín',
			nameEn: 'Šamorín',
			nameRu: 'Шаморин',
			lat: 48.0258,
			lon: 17.3119
		},
		{
			key: 'cilistov',
			name: 'Čilistov',
			nameSk: 'Čilistov',
			nameEn: 'Čilistov',
			nameRu: 'Чилистов',
			lat: 48.0583,
			lon: 17.275
		}
	];

	let weatherData = $state<WeatherData[]>([]);
	let danube = $state<DanubeData | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	const LOCALES: Record<LanguageCode, string> = { sk: 'sk-SK', en: 'en-GB', ru: 'ru-RU' };

	const TREND_ARROWS: Record<Trend, string> = { up: '↑', down: '↓', steady: '→' };

	// One water temperature is shown under every city; the tooltip names where it was measured
	const WATER_TEMP_STATIONS: Record<WaterTempReading['source'], string> = {
		danubehis: 'Bratislava',
		noe: 'Wildungsmauer (AT)'
	};

	const WATER_TEMP_SOURCES: Record<WaterTempReading['source'], string> = {
		danubehis: 'Danube HIS',
		noe: 'Land NÖ'
	};

	function formatTime(time: number): string {
		return new Intl.DateTimeFormat(LOCALES[lang], {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Bratislava'
		}).format(time);
	}

	function formatWaterTemp(value: number): string {
		return new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 1 }).format(value);
	}

	function getTrendLabel(trend: Trend): string {
		const labels: Record<Trend, string> = {
			up: translations.trendUp,
			down: translations.trendDown,
			steady: translations.trendSteady
		};
		return labels[trend];
	}

	// Tooltips also credit the data source
	function getLevelTitle(level: LevelReading): string {
		return `${translations.waterLevel} – ${translations.station} ${level.station}, ${translations.measuredAt} ${formatTime(level.time)}. ${translations.source}: SHMÚ`;
	}

	function getWaterTempTitle(temp: WaterTempReading): string {
		return `${translations.waterTemp} – ${translations.station} ${WATER_TEMP_STATIONS[temp.source]}, ${translations.measuredAt} ${formatTime(temp.time)}. ${translations.source}: ${WATER_TEMP_SOURCES[temp.source]}`;
	}

	// Same-origin ISR endpoint; a failure only hides the Danube values
	async function fetchDanube(signal?: AbortSignal): Promise<DanubeData | null> {
		try {
			const response = await fetch('/api/danube', { signal });
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return await response.json();
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') throw err;
			console.error('Failed to fetch Danube data:', err);
			return null;
		}
	}

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
			// Loaded together so the bar renders once (no extra layout shift)
			const [results, danubeData] = await Promise.all([
				Promise.allSettled(
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
				),
				fetchDanube(signal)
			]);

			danube = danubeData;

			// Filter only successful results
			const successfulData = results
				.filter((result): result is PromiseFulfilledResult<WeatherData> => result.status === 'fulfilled')
				.map((result) => result.value);

			if (successfulData.length > 0) {
				weatherData = successfulData;
				error = null;
			} else {
				error = 'Failed to load weather';
			}
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
	<!-- Live region for screen readers -->
	<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{#if isLoading}
			{lang === 'sk' ? 'Načítava sa počasie...' : lang === 'ru' ? 'Загрузка погоды...' : 'Loading weather...'}
		{:else if error}
			{lang === 'sk' ? 'Nepodarilo sa načítať počasie' : lang === 'ru' ? 'Не удалось загрузить погоду' : 'Failed to load weather'}
		{:else if weatherData.length > 0}
			{lang === 'sk' ? 'Počasie načítané' : lang === 'ru' ? 'Погода загружена' : 'Weather loaded'}
		{/if}
	</div>
	<div class="weather-bar__container" aria-busy={isLoading}>
		{#if isLoading}
			<div class="weather-bar__loading" aria-hidden="true">
				<div class="weather-bar__skeleton">
					{#each [0, 1, 2] as i (i)}
						<div class="weather-bar__skeleton-item">
							<div class="skeleton-temp"></div>
							<div class="skeleton-details">
								<div class="skeleton-icon"></div>
								<div class="skeleton-text"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if error}
			<div class="weather-bar__error" role="alert">{error}</div>
		{:else}
			{#each weatherData as data (data.city.name)}
				{@const level = danube?.levels[data.city.key]}
				{@const waterTemp = danube?.waterTemp}
				<div class="weather-bar__location">
					<span class="weather-bar__temp">{data.temp}°C</span>
					<div class="weather-bar__details">
						<span
							class="weather-bar__icon {getWeatherIcon(data.weatherCode)}"
							aria-hidden="true"
						></span>
						<span class="weather-bar__city">{getCityName(data.city)}</span>
						<span class="weather-bar__extra">
							<span aria-label="Humidity" role="img">💧</span> {data.humidity}% | <span aria-label="Wind speed" role="img">💨</span> {data.windSpeed} km/h
						</span>
						{#if level || waterTemp}
							<span class="weather-bar__water">
								{#if level}
									<span class="weather-bar__level" title={getLevelTitle(level)}>
										<span aria-label={translations.waterLevel} role="img">🌊</span> {level.value} cm
										<span aria-label={getTrendLabel(level.trend)} role="img">{TREND_ARROWS[level.trend]}</span>
									</span>
								{/if}
								{#if waterTemp}
									<span class="weather-bar__water-temp" title={getWaterTempTitle(waterTemp)}>
										<span aria-label={translations.waterTemp} role="img">🌡️</span> {formatWaterTemp(waterTemp.value)}°C
									</span>
								{/if}
							</span>
						{/if}
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
		/* Height of the loaded bar (weather + Danube lines), reserved for the skeleton to avoid layout shift */
		min-height: 77px;
		max-width: var(--container-max-width);
		margin: 0 auto;
		padding: 0 var(--space-8);
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

	.weather-bar__water {
		font-size: 10px;
		color: var(--color-text-secondary);
		display: block;
	}

	.weather-bar__level + .weather-bar__water-temp::before {
		content: '| ';
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

	/* Skeleton loader styles */
	.weather-bar__skeleton {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		width: 100%;
	}

	.weather-bar__skeleton-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.weather-bar__skeleton-item:nth-child(1) {
		justify-content: flex-start;
	}

	.weather-bar__skeleton-item:nth-child(2) {
		justify-content: center;
	}

	.weather-bar__skeleton-item:nth-child(3) {
		justify-content: flex-end;
	}

	.skeleton-temp {
		width: 50px;
		height: 24px;
		background: linear-gradient(90deg, var(--color-border-light) 25%, #e8e8e8 50%, var(--color-border-light) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: var(--radius-sm);
	}

	.skeleton-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.skeleton-icon {
		width: 28px;
		height: 28px;
		background: linear-gradient(90deg, var(--color-border-light) 25%, #e8e8e8 50%, var(--color-border-light) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 50%;
	}

	.skeleton-text {
		width: 60px;
		height: 12px;
		background: linear-gradient(90deg, var(--color-border-light) 25%, #e8e8e8 50%, var(--color-border-light) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: var(--radius-sm);
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	/* Tablet & Mobile - show ALL cities */
	@media (max-width: 768px) {
		.weather-bar__container {
			grid-template-columns: repeat(3, 1fr) !important;
			gap: 8px;
			padding: 0 12px;
			min-height: 86px;
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

		.weather-bar__level,
		.weather-bar__water-temp {
			display: block;
		}

		.weather-bar__level + .weather-bar__water-temp::before {
			content: none;
		}

		.weather-bar__details {
			display: block !important;
		}
	}
</style>
