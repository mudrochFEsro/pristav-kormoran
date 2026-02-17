<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		waveColor?: string;
		backgroundColor?: string;
		waveOpacity?: number;
	}

	let {
		children,
		className,
		waveColor = '#f97316',
		backgroundColor = 'transparent',
		waveOpacity = 0.3
	}: Props = $props();
</script>

<div class={cn('relative overflow-hidden', className)} style="background-color: {backgroundColor};">
	<!-- Wave layers -->
	<svg
		class="absolute bottom-0 left-0 w-full"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1440 320"
		preserveAspectRatio="none"
		style="height: 200px;"
	>
		<!-- Wave 1 - Slowest, back -->
		<path
			class="animate-wave-slow"
			fill={waveColor}
			fill-opacity={waveOpacity * 0.5}
			d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
		<!-- Wave 2 - Medium -->
		<path
			class="animate-wave-medium"
			fill={waveColor}
			fill-opacity={waveOpacity * 0.7}
			d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,224C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
		<!-- Wave 3 - Fast, front -->
		<path
			class="animate-wave-fast"
			fill={waveColor}
			fill-opacity={waveOpacity}
			d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
	</svg>

	<!-- Content -->
	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
