<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		gradientBackgroundStart?: string;
		gradientBackgroundEnd?: string;
		firstColor?: string;
		secondColor?: string;
		thirdColor?: string;
		fourthColor?: string;
		fifthColor?: string;
		size?: string;
		blendingValue?: string;
		interactive?: boolean;
	}

	let {
		children,
		className,
		containerClassName,
		gradientBackgroundStart = 'rgb(108, 0, 162)',
		gradientBackgroundEnd = 'rgb(0, 17, 82)',
		firstColor = '18, 113, 255',
		secondColor = '221, 74, 255',
		thirdColor = '100, 220, 255',
		fourthColor = '200, 50, 50',
		fifthColor = '180, 180, 50',
		size = '80%',
		blendingValue = 'hard-light',
		interactive = true
	}: Props = $props();

	let containerRef: HTMLDivElement | undefined = $state();
	let curX = $state(0);
	let curY = $state(0);

	function handleMouseMove(event: MouseEvent) {
		if (!interactive || !containerRef) return;
		const rect = containerRef.getBoundingClientRect();
		curX = event.clientX - rect.left;
		curY = event.clientY - rect.top;
	}
</script>

<div
	bind:this={containerRef}
	onmousemove={handleMouseMove}
	role="presentation"
	class={cn(
		'relative h-screen w-full overflow-hidden bg-gradient-to-br',
		containerClassName
	)}
	style="--gradient-start: {gradientBackgroundStart}; --gradient-end: {gradientBackgroundEnd}; background: linear-gradient(135deg, {gradientBackgroundStart}, {gradientBackgroundEnd});"
>
	<svg class="hidden">
		<defs>
			<filter id="blurMe">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>

	<div class={cn('absolute inset-0', className)} style="filter: url(#blurMe) blur(40px);">
		<!-- Animated gradient circles -->
		<div
			class="absolute animate-move-vertical rounded-full opacity-100"
			style="background: radial-gradient(circle at center, rgba({firstColor}, 0.8) 0, rgba({firstColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: calc(50% - {size} / 2); left: calc(50% - {size} / 2); mix-blend-mode: {blendingValue};"
		></div>
		<div
			class="absolute animate-move-in-circle rounded-full opacity-100"
			style="background: radial-gradient(circle at center, rgba({secondColor}, 0.8) 0, rgba({secondColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: calc(50% - {size} / 2); left: calc(50% - {size} / 2); mix-blend-mode: {blendingValue};"
		></div>
		<div
			class="absolute animate-move-in-circle-reverse rounded-full opacity-100"
			style="background: radial-gradient(circle at center, rgba({thirdColor}, 0.8) 0, rgba({thirdColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: calc(50% - {size} / 2 + 200px); left: calc(50% - {size} / 2 - 500px); mix-blend-mode: {blendingValue};"
		></div>
		<div
			class="absolute animate-move-horizontal rounded-full opacity-70"
			style="background: radial-gradient(circle at center, rgba({fourthColor}, 0.8) 0, rgba({fourthColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: calc(50% - {size} / 2); left: calc(50% - {size} / 2); mix-blend-mode: {blendingValue};"
		></div>
		<div
			class="absolute animate-move-in-circle rounded-full opacity-70"
			style="background: radial-gradient(circle at center, rgba({fifthColor}, 0.8) 0, rgba({fifthColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: calc(50% - {size} / 2); left: calc(50% - {size} / 2); mix-blend-mode: {blendingValue};"
		></div>

		{#if interactive}
			<div
				class="absolute rounded-full opacity-70"
				style="background: radial-gradient(circle at center, rgba({firstColor}, 0.8) 0, rgba({firstColor}, 0) 50%) no-repeat; width: {size}; height: {size}; top: {curY}px; left: {curX}px; transform: translate(-50%, -50%); mix-blend-mode: {blendingValue};"
			></div>
		{/if}
	</div>

	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
