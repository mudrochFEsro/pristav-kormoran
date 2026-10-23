import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
	parseShmuSeries,
	parseDanubeHisSeries,
	parseNoeTemperature,
	toLevel,
	toWaterTemp,
	getDanubeData
} from './danube.ts';

const fixture = (name: string) => readFileSync(`${import.meta.dirname}/fixtures/${name}`, 'utf8');

const HOUR = 60 * 60 * 1000;
// Last measured point in the fixtures: 2026-10-23 07:00 UTC
const NOW = Date.UTC(2026, 9, 23, 7, 30);

test('parseShmuSeries reads measured levels and skips the forecast', () => {
	const series = parseShmuSeries(fixture('shmu-tooltip.html'));

	assert.equal(series.length, 82);
	assert.deepEqual(series.at(-1), { value: 285, time: Date.UTC(2026, 9, 23, 7) });
});

test('parseShmuSeries returns nothing for unrelated HTML', () => {
	assert.deepEqual(parseShmuSeries('<html><body>Maintenance</body></html>'), []);
});

test('parseDanubeHisSeries reads the hourly water temperature', () => {
	const series = parseDanubeHisSeries(fixture('danubehis-tw.html'));

	assert.equal(series.length, 10);
	assert.deepEqual(series.at(-1), { value: 13, time: Date.UTC(2026, 9, 23, 7) });
});

test('parseNoeTemperature finds the station temperature and ignores empty rows', () => {
	const rows = [{}, ...JSON.parse(fixture('noe-maplist.json'))];

	assert.deepEqual(parseNoeTemperature(rows, '207373'), {
		value: 13.7,
		time: Date.UTC(2026, 9, 23, 7, 15)
	});
	assert.equal(parseNoeTemperature(rows, '999999'), null);
});

test('toLevel is steady when the level moved at most 2 cm in 3 hours', () => {
	const level = toLevel(parseShmuSeries(fixture('shmu-tooltip.html')), NOW);

	assert.deepEqual(level, { value: 285, time: Date.UTC(2026, 9, 23, 7), trend: 'steady' });
});

test('toLevel reports rising and falling water', () => {
	const t = NOW - HOUR;
	const rising = [
		{ value: 280, time: t - 3 * HOUR },
		{ value: 290, time: t }
	];
	const falling = [
		{ value: 290, time: t - 3 * HOUR },
		{ value: 280, time: t }
	];

	assert.equal(toLevel(rising, NOW)?.trend, 'up');
	assert.equal(toLevel(falling, NOW)?.trend, 'down');
});

test('toLevel drops readings older than 3 hours', () => {
	assert.equal(toLevel([{ value: 285, time: NOW - 4 * HOUR }], NOW), null);
	assert.equal(toLevel([], NOW), null);
});

test('toWaterTemp rejects implausible and stale values', () => {
	assert.deepEqual(toWaterTemp([{ value: 13, time: NOW - HOUR }], NOW), {
		value: 13,
		time: NOW - HOUR
	});
	assert.equal(toWaterTemp([{ value: 99, time: NOW - HOUR }], NOW), null);
	assert.equal(toWaterTemp([{ value: 13, time: NOW - 4 * HOUR }], NOW), null);
});

function fakeFetch(routes: Record<string, string | null>): typeof fetch {
	return (async (input: string | URL | Request) => {
		const url = String(input);
		const key = Object.keys(routes).find((k) => url.includes(k));
		const body = key ? routes[key] : null;
		return body === null ? new Response('error', { status: 503 }) : new Response(body);
	}) as typeof fetch;
}

test('getDanubeData combines levels and Bratislava water temperature', async () => {
	const fetchFn = fakeFetch({
		'tooltip.php': fixture('shmu-tooltip.html'),
		danubehis: fixture('danubehis-tw.html'),
		'noel.gv.at': fixture('noe-maplist.json')
	});

	const data = await getDanubeData(fetchFn, NOW);

	assert.equal(data.levels.bratislava?.value, 285);
	assert.equal(data.levels.bratislava?.station, 'Bratislava');
	assert.equal(data.levels.samorin?.station, 'Hamuliakovo');
	assert.equal(data.levels.cilistov?.station, 'Dobrohošť');
	assert.deepEqual(data.waterTemp, {
		value: 13,
		time: Date.UTC(2026, 9, 23, 7),
		source: 'danubehis'
	});
});

test('getDanubeData falls back to Lower Austria when Danube HIS fails', async () => {
	const fetchFn = fakeFetch({
		'tooltip.php': fixture('shmu-tooltip.html'),
		danubehis: null,
		'noel.gv.at': fixture('noe-maplist.json')
	});

	const data = await getDanubeData(fetchFn, NOW);

	assert.equal(data.waterTemp?.source, 'noe');
	assert.equal(data.waterTemp?.value, 13.7);
});

test('getDanubeData keeps working when every source is down', async () => {
	const data = await getDanubeData(fakeFetch({}), NOW);

	assert.deepEqual(data, {
		levels: { bratislava: null, samorin: null, cilistov: null },
		waterTemp: null
	});
});
