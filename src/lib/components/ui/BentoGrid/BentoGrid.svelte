<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
	}

	let { children, className }: Props = $props();
</script>

<div
	class={cn(
		'mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:gap-6 md:auto-rows-[22rem] md:grid-cols-3 lg:gap-8',
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</div>
