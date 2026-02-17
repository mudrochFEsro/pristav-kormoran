<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		spotlightColor?: string;
	}

	let {
		children,
		className,
		spotlightColor = 'rgba(249, 115, 22, 0.15)'
	}: Props = $props();

	let cardRef: HTMLDivElement | undefined = $state();
	let position = $state({ x: 0, y: 0 });
	let isHovering = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!cardRef) return;
		const rect = cardRef.getBoundingClientRect();
		position = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}
</script>

<div
	bind:this={cardRef}
	onmousemove={handleMouseMove}
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
	role="article"
	class={cn(
		'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-6 lg:rounded-3xl lg:p-8',
		className
	)}
>
	<!-- Spotlight effect -->
	<div
		class="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:rounded-3xl"
		style="
			background: radial-gradient(
				600px circle at {position.x}px {position.y}px,
				{spotlightColor},
				transparent 40%
			);
		"
	></div>

	<!-- Border glow effect -->
	<div
		class="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:rounded-3xl"
		style="
			background: radial-gradient(
				300px circle at {position.x}px {position.y}px,
				rgba(249, 115, 22, 0.3),
				transparent 40%
			);
			mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
			mask-composite: exclude;
			padding: 1px;
		"
	></div>

	<!-- Content -->
	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
