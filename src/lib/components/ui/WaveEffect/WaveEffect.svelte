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
		class="absolute bottom-0 left-0 h-full w-[200%] min-w-[1440px]"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 2880 320"
		preserveAspectRatio="none"
	>
		<!-- Wave 1 - Slowest, back (doubled path for seamless loop) -->
		<path
			class="wave-path wave-slow"
			fill={waveColor}
			fill-opacity={waveOpacity * 0.5}
			d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1488,197.3C1536,203,1632,213,1728,229.3C1824,245,1920,267,2016,250.7C2112,235,2208,181,2304,181.3C2400,181,2496,235,2592,234.7C2688,235,2784,181,2832,154.7L2880,128L2880,320L0,320Z"
		></path>
		<!-- Wave 2 - Medium -->
		<path
			class="wave-path wave-medium"
			fill={waveColor}
			fill-opacity={waveOpacity * 0.7}
			d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,224C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1488,240C1536,224,1632,192,1728,181.3C1824,171,1920,181,2016,197.3C2112,213,2208,235,2304,224C2400,213,2496,171,2592,165.3C2688,160,2784,192,2832,208L2880,224L2880,320L0,320Z"
		></path>
		<!-- Wave 3 - Fast, front -->
		<path
			class="wave-path wave-fast"
			fill={waveColor}
			fill-opacity={waveOpacity}
			d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1488,272C1536,256,1632,224,1728,213.3C1824,203,1920,213,2016,229.3C2112,245,2208,267,2304,261.3C2400,256,2496,224,2592,213.3C2688,203,2784,213,2832,218.7L2880,224L2880,320L0,320Z"
		></path>
	</svg>

	<!-- Content -->
	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.wave-path {
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.wave-slow {
		animation: wave-scroll 25s linear infinite;
	}

	.wave-medium {
		animation: wave-scroll 18s linear infinite;
	}

	.wave-fast {
		animation: wave-scroll 12s linear infinite;
	}

	@keyframes wave-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.wave-path {
			animation: none;
		}
	}
</style>
