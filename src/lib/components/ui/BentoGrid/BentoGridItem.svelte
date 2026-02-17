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
		'group/bento row-span-1 flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.1] bg-slate-900/50 p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/10 hover:shadow-2xl sm:p-6 lg:rounded-3xl lg:p-8',
		className
	)}
>
	{#if header}
		<div class="overflow-hidden rounded-xl lg:rounded-2xl">
			{@render header()}
		</div>
	{:else if children}
		<div class="overflow-hidden rounded-xl lg:rounded-2xl">
			{@render children()}
		</div>
	{/if}

	<div class="transition-all duration-300 group-hover/bento:translate-x-2">
		{#if icon}
			<div class="mb-3">
				{@render icon()}
			</div>
		{:else if iconEmoji}
			<div class="mb-3 text-2xl">{iconEmoji}</div>
		{/if}

		{#if title}
			<div
				class="mb-2 font-sans text-base font-bold text-neutral-200 transition-colors group-hover/bento:text-orange-400 sm:text-lg"
			>
				{title}
			</div>
		{/if}

		{#if description}
			<div class="font-sans text-sm font-normal leading-relaxed text-neutral-400 sm:text-base">
				{description}
			</div>
		{/if}
	</div>
</div>
