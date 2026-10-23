/**
 * Danube water level (SHMÚ) and Bratislava water temperature (Danube HIS, fallback Land NÖ).
 * None of the sources has a public API or CORS, so the data is fetched server-side
 * by the ISR route /api/danube and the parsers read the values embedded in their pages.
 */

export type Trend = 'up' | 'down' | 'steady';

export interface Reading {
	value: number;
	/** Measurement time, ms since epoch (UTC) */
	time: number;
}

export interface LevelReading extends Reading {
	trend: Trend;
	station: string;
}

export interface WaterTempReading extends Reading {
	source: 'danubehis' | 'noe';
}

export type CityKey = 'bratislava' | 'samorin' | 'cilistov';

export interface DanubeData {
	levels: Record<CityKey, LevelReading | null>;
	waterTemp: WaterTempReading | null;
}

const HOUR = 60 * 60 * 1000;
const MAX_AGE = 3 * HOUR;
const TREND_WINDOW = 3 * HOUR;
const TREND_THRESHOLD_CM = 2;
const WATER_TEMP_RANGE = { min: 0, max: 30 };

// SHMÚ gauge IDs (https://www.shmu.sk/sk/?page=765). Šamorín and Čilistov have no gauge of their own.
const STATIONS: Record<CityKey, { id: number; name: string }> = {
	bratislava: { id: 5140, name: 'Bratislava' },
	samorin: { id: 5149, name: 'Hamuliakovo' },
	cilistov: { id: 5153, name: 'Dobrohošť' }
};

const DANUBE_HIS_STATION = 'SK5140_HYDRO'; // Bratislava
const NOE_STATION = '207373'; // Wildungsmauer (AT), ~30 km upstream of Bratislava

const USER_AGENT = 'PristavKormoran/1.0 (+https://www.pristavkormoran.sk)';
const TIMEOUT_MS = 8000;

// Highcharts data array: [[timestamp, value], ...], values may be null
const POINTS = String.raw`(\[\[(?:[\d.,\-\[\]\s]|null)*?\]\])`;

function parsePoints(raw: string | undefined): Reading[] {
	if (!raw) return [];
	try {
		const points: [number, number | null][] = JSON.parse(raw);
		return points
			.filter(([time, value]) => Number.isFinite(time) && Number.isFinite(value))
			.map(([time, value]) => ({ value: value as number, time }));
	} catch {
		return [];
	}
}

/** Measured levels from the SHMÚ station tooltip (the forecast series is ignored). */
export function parseShmuSeries(html: string): Reading[] {
	const match = html.match(new RegExp(String.raw`base_serie\s*=\s*\{[^;]*?data:\s*` + POINTS));
	return parsePoints(match?.[1]);
}

/** Water temperature series from a Danube HIS results page (chart JSON in an HTML attribute). */
export function parseDanubeHisSeries(html: string): Reading[] {
	const decoded = html.replaceAll('&quot;', '"');
	const match = decoded.match(new RegExp(String.raw`"series":\[\{.*?"data":` + POINTS, 's'));
	return parsePoints(match?.[1]);
}

/** Water temperature of one station from the Land NÖ MapList.json. */
export function parseNoeTemperature(rows: unknown, stationNumber: string): Reading | null {
	if (!Array.isArray(rows)) return null;
	const row = rows.find(
		(r) => r?.Stationnumber === stationNumber && r?.Parameter === 'Wassertemperatur'
	);
	if (!row) return null;

	const value = Number.parseFloat(row.Value);
	const time = Date.parse(row.Timestamp);
	return Number.isFinite(value) && Number.isFinite(time) ? { value, time } : null;
}

/** Latest fresh level with its trend over the last 3 hours. */
export function toLevel(series: Reading[], now: number): Omit<LevelReading, 'station'> | null {
	const last = series.at(-1);
	if (!last || now - last.time > MAX_AGE) return null;

	const reference = series.findLast((r) => r.time <= last.time - TREND_WINDOW) ?? series[0];
	const delta = last.value - reference.value;
	const trend: Trend =
		delta > TREND_THRESHOLD_CM ? 'up' : delta < -TREND_THRESHOLD_CM ? 'down' : 'steady';

	return { value: last.value, time: last.time, trend };
}

/** Latest fresh and plausible water temperature (guards against sensor glitches). */
export function toWaterTemp(series: Reading[], now: number): Reading | null {
	const last = series.at(-1);
	if (!last || now - last.time > MAX_AGE) return null;
	if (last.value < WATER_TEMP_RANGE.min || last.value > WATER_TEMP_RANGE.max) return null;
	return { value: last.value, time: last.time };
}

async function fetchText(fetchFn: typeof fetch, url: string): Promise<string> {
	const response = await fetchFn(url, {
		headers: { 'User-Agent': USER_AGENT },
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});
	if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`);
	return response.text();
}

/** dd.mm.yyyy in Vienna time, the format Danube HIS expects */
function hisDate(time: number): string {
	return new Intl.DateTimeFormat('de-AT', {
		timeZone: 'Europe/Vienna',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(time);
}

async function fetchLevel(
	fetchFn: typeof fetch,
	city: CityKey,
	now: number
): Promise<LevelReading | null> {
	const { id, name } = STATIONS[city];
	try {
		const html = await fetchText(
			fetchFn,
			`https://www.shmu.sk/popups/hydro/vodne_toky/tooltip.php?id=${id}`
		);
		const level = toLevel(parseShmuSeries(html), now);
		if (!level) console.warn(`[danube] no fresh SHMÚ level for ${name}`);
		return level && { ...level, station: name };
	} catch (err) {
		console.warn(`[danube] SHMÚ level ${name} failed:`, err);
		return null;
	}
}

async function fetchDanubeHisTemp(fetchFn: typeof fetch, now: number): Promise<Reading | null> {
	const url =
		`https://www.danubehis.org/results/${DANUBE_HIS_STATION}?symbol%5Btw%5D=tw` +
		`&time_from=${hisDate(now - 24 * HOUR)}&time_to=${hisDate(now)}`;
	return toWaterTemp(parseDanubeHisSeries(await fetchText(fetchFn, url)), now);
}

async function fetchNoeTemp(fetchFn: typeof fetch, now: number): Promise<Reading | null> {
	const text = await fetchText(
		fetchFn,
		'https://www.noel.gv.at/wasserstand/kidata/maplist/MapList.json'
	);
	const reading = parseNoeTemperature(JSON.parse(text), NOE_STATION);
	return reading && toWaterTemp([reading], now);
}

async function fetchWaterTemp(
	fetchFn: typeof fetch,
	now: number
): Promise<WaterTempReading | null> {
	const sources = [
		['danubehis', fetchDanubeHisTemp],
		['noe', fetchNoeTemp]
	] as const;

	for (const [source, fetchTemp] of sources) {
		try {
			const reading = await fetchTemp(fetchFn, now);
			if (reading) return { ...reading, source };
			console.warn(`[danube] no fresh water temperature from ${source}`);
		} catch (err) {
			console.warn(`[danube] water temperature from ${source} failed:`, err);
		}
	}
	return null;
}

export async function getDanubeData(
	fetchFn: typeof fetch,
	now = Date.now()
): Promise<DanubeData> {
	const [bratislava, samorin, cilistov, waterTemp] = await Promise.all([
		fetchLevel(fetchFn, 'bratislava', now),
		fetchLevel(fetchFn, 'samorin', now),
		fetchLevel(fetchFn, 'cilistov', now),
		fetchWaterTemp(fetchFn, now)
	]);

	return { levels: { bratislava, samorin, cilistov }, waterTemp };
}
