<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		borderRadius?: string;
		duration?: number;
		borderClassName?: string;
	}

	let {
		children,
		className,
		containerClassName,
		borderRadius = '1.5rem',
		duration = 2000,
		borderClassName
	}: Props = $props();
</script>

<div
	class={cn('relative overflow-hidden bg-transparent p-[1px]', containerClassName)}
	style="border-radius: {borderRadius};"
>
	<!-- Animated border -->
	<div
		class={cn(
			'absolute inset-0 rounded-[inherit]',
			borderClassName
		)}
		style="
			background: linear-gradient(90deg, transparent, #f60, transparent);
			animation: moving-border {duration}ms linear infinite;
		"
	></div>

	<!-- Inner content -->
	<div
		class={cn(
			'relative z-10 flex h-full w-full items-center justify-center rounded-[inherit] bg-slate-950 text-sm antialiased backdrop-blur-xl',
			className
		)}
		style="border-radius: calc({borderRadius} - 1px);"
	>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
