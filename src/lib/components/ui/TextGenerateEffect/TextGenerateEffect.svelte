<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		words: string;
		className?: string;
		duration?: number;
	}

	let { words, className, duration = 0.15 }: Props = $props();

	const wordArray = $derived(words.split(' '));
</script>

<div class={cn('font-bold', className)}>
	<div class="mt-4">
		<div class="text-2xl leading-snug tracking-wide text-black dark:text-white">
			{#each wordArray as word, idx (`${word}-${idx}`)}
				<span
					class="inline-block animate-text-reveal opacity-0"
					style="animation-delay: {idx * duration}s;"
				>
					{word}&nbsp;
				</span>
			{/each}
		</div>
	</div>
</div>
