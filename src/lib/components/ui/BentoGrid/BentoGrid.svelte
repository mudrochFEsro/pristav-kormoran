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
		'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3',
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</div>
