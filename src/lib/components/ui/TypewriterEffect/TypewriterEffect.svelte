<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		words: string[];
		className?: string;
		cursorClassName?: string;
		typingSpeed?: number;
		deletingSpeed?: number;
		pauseDuration?: number;
	}

	let {
		words,
		className,
		cursorClassName,
		typingSpeed = 100,
		deletingSpeed = 50,
		pauseDuration = 2000
	}: Props = $props();

	let currentWordIndex = $state(0);
	let currentText = $state('');
	let isDeleting = $state(false);

	$effect(() => {
		const currentWord = words[currentWordIndex];

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					if (currentText.length < currentWord.length) {
						currentText = currentWord.slice(0, currentText.length + 1);
					} else {
						setTimeout(() => {
							isDeleting = true;
						}, pauseDuration);
					}
				} else {
					if (currentText.length > 0) {
						currentText = currentText.slice(0, -1);
					} else {
						isDeleting = false;
						currentWordIndex = (currentWordIndex + 1) % words.length;
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed
		);

		return () => clearTimeout(timeout);
	});
</script>

<span class={cn('inline-flex items-center', className)}>
	<span>{currentText}</span>
	<span
		class={cn(
			'ml-1 inline-block h-[1em] w-[3px] animate-blink bg-orange-500',
			cursorClassName
		)}
	></span>
</span>

<style>
	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	.animate-blink {
		animation: blink 1s step-end infinite;
	}
</style>
