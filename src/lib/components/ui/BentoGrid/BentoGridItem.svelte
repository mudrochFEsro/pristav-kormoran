<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		className?: string;
		title?: string;
		description?: string;
		header?: Snippet;
		icon?: Snippet;
		iconEmoji?: string;
		children?: Snippet;
	}

	let { className, title, description, header, icon, iconEmoji, children }: Props = $props();
</script>

<div
	class={cn(
		'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.1] bg-slate-900/50 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/10 hover:shadow-2xl',
		className
	)}
>
	{#if header}
		<div class="overflow-hidden rounded-lg">
			{@render header()}
		</div>
	{:else if children}
		<div class="overflow-hidden rounded-lg">
			{@render children()}
		</div>
	{/if}

	<div class="transition-all duration-300 group-hover/bento:translate-x-2">
		{#if icon}
			<div class="mb-2">
				{@render icon()}
			</div>
		{:else if iconEmoji}
			<div class="mb-2 text-2xl">{iconEmoji}</div>
		{/if}

		{#if title}
			<div
				class="mb-2 mt-2 font-sans text-lg font-bold text-neutral-200 transition-colors group-hover/bento:text-orange-400"
			>
				{title}
			</div>
		{/if}

		{#if description}
			<div class="font-sans text-sm font-normal text-neutral-400">
				{description}
			</div>
		{/if}
	</div>
</div>
