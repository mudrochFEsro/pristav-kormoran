<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		variant?: 'grid' | 'dots' | 'grid-small';
	}

	let { children, className, variant = 'grid' }: Props = $props();

	const patterns = {
		grid: 'bg-grid-white/[0.02]',
		dots: 'bg-dot-white/[0.2]',
		'grid-small': 'bg-grid-small-white/[0.2]'
	};
</script>

<div
	class={cn(
		'relative flex h-full w-full items-center justify-center bg-slate-950',
		patterns[variant],
		className
	)}
>
	<!-- Radial gradient overlay -->
	<div
		class="pointer-events-none absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
	></div>

	<div class="relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
