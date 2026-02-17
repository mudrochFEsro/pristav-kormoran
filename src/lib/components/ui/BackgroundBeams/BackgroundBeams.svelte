<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
	}

	let { children, className }: Props = $props();

	// Generate beam paths
	const beams = [
		{ id: 1, d: 'M0 0 L100 100', delay: 0 },
		{ id: 2, d: 'M100 0 L0 100', delay: 0.5 },
		{ id: 3, d: 'M50 0 L50 100', delay: 1 },
		{ id: 4, d: 'M0 50 L100 50', delay: 1.5 },
		{ id: 5, d: 'M25 0 L75 100', delay: 2 },
		{ id: 6, d: 'M75 0 L25 100', delay: 2.5 }
	];
</script>

<div class={cn('relative h-full w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950', className)}>
	<!-- Beams container -->
	<svg
		class="pointer-events-none absolute inset-0 h-full w-full"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#f97316;stop-opacity:0" />
				<stop offset="50%" style="stop-color:#f97316;stop-opacity:0.5" />
				<stop offset="100%" style="stop-color:#f97316;stop-opacity:0" />
			</linearGradient>
			<filter id="beam-blur">
				<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
			</filter>
		</defs>

		{#each beams as beam (beam.id)}
			<line
				x1={beam.d.split(' ')[0].substring(1)}
				y1={beam.d.split(' ')[1]}
				x2={beam.d.split(' ')[2].substring(1)}
				y2={beam.d.split(' ')[3]}
				class="animate-beam-pulse"
				stroke="url(#beam-gradient)"
				stroke-width="1"
				filter="url(#beam-blur)"
				style="
					animation-delay: {beam.delay}s;
					transform-origin: center;
				"
			/>
		{/each}
	</svg>

	<!-- Radial gradient overlay -->
	<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]"></div>

	<!-- Grid pattern -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

	<!-- Content -->
	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
