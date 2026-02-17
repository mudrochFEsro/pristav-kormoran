<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		number?: number;
		className?: string;
	}

	let { number = 20, className }: Props = $props();

	// Generate meteor data with random positions and delays
	const meteors = $derived(
		Array.from({ length: number }, () => ({
			left: `${Math.floor(Math.random() * 800) - 400}px`,
			animationDelay: `${Math.random() * 0.6 + 0.2}s`,
			animationDuration: `${Math.random() * 8 + 2}s`
		}))
	);
</script>

{#each meteors as meteor, idx (idx)}
	<span
		class={cn(
			'pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
			"before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
			className
		)}
		style="left: {meteor.left}; animation-delay: {meteor.animationDelay}; animation-duration: {meteor.animationDuration};"
	></span>
{/each}
