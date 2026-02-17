<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		text: string;
		className?: string;
		glowColor?: string;
		as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
	}

	let {
		text,
		className,
		glowColor = '#f97316',
		as = 'h1'
	}: Props = $props();
</script>

{#if as === 'h1'}
	<h1
		class={cn('relative inline-block font-bold', className)}
		style="
			text-shadow:
				0 0 20px {glowColor}40,
				0 0 40px {glowColor}30,
				0 0 60px {glowColor}20;
		"
	>
		<span class="relative z-10">{text}</span>
		<span
			class="absolute inset-0 animate-pulse-glow blur-sm"
			style="color: {glowColor}; opacity: 0.5;"
			aria-hidden="true"
		>
			{text}
		</span>
	</h1>
{:else if as === 'h2'}
	<h2
		class={cn('relative inline-block font-bold', className)}
		style="
			text-shadow:
				0 0 20px {glowColor}40,
				0 0 40px {glowColor}30,
				0 0 60px {glowColor}20;
		"
	>
		<span class="relative z-10">{text}</span>
		<span
			class="absolute inset-0 animate-pulse-glow blur-sm"
			style="color: {glowColor}; opacity: 0.5;"
			aria-hidden="true"
		>
			{text}
		</span>
	</h2>
{:else if as === 'h3'}
	<h3
		class={cn('relative inline-block font-bold', className)}
		style="
			text-shadow:
				0 0 20px {glowColor}40,
				0 0 40px {glowColor}30,
				0 0 60px {glowColor}20;
		"
	>
		<span class="relative z-10">{text}</span>
		<span
			class="absolute inset-0 animate-pulse-glow blur-sm"
			style="color: {glowColor}; opacity: 0.5;"
			aria-hidden="true"
		>
			{text}
		</span>
	</h3>
{:else if as === 'p'}
	<p
		class={cn('relative inline-block', className)}
		style="
			text-shadow:
				0 0 20px {glowColor}40,
				0 0 40px {glowColor}30,
				0 0 60px {glowColor}20;
		"
	>
		<span class="relative z-10">{text}</span>
		<span
			class="absolute inset-0 animate-pulse-glow blur-sm"
			style="color: {glowColor}; opacity: 0.5;"
			aria-hidden="true"
		>
			{text}
		</span>
	</p>
{:else}
	<span
		class={cn('relative inline-block', className)}
		style="
			text-shadow:
				0 0 20px {glowColor}40,
				0 0 40px {glowColor}30,
				0 0 60px {glowColor}20;
		"
	>
		<span class="relative z-10">{text}</span>
		<span
			class="absolute inset-0 animate-pulse-glow blur-sm"
			style="color: {glowColor}; opacity: 0.5;"
			aria-hidden="true"
		>
			{text}
		</span>
	</span>
{/if}
