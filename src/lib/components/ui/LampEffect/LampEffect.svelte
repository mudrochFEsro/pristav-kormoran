<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
		color?: string;
	}

	let { children, className, color = 'orange' }: Props = $props();

	const colorClasses = {
		orange: {
			from: 'from-orange-500',
			to: 'to-orange-500',
			glow: 'bg-orange-500',
			glowLight: 'bg-orange-400',
			line: 'bg-orange-400'
		},
		cyan: {
			from: 'from-cyan-500',
			to: 'to-cyan-500',
			glow: 'bg-cyan-500',
			glowLight: 'bg-cyan-400',
			line: 'bg-cyan-400'
		},
		purple: {
			from: 'from-purple-500',
			to: 'to-purple-500',
			glow: 'bg-purple-500',
			glowLight: 'bg-purple-400',
			line: 'bg-purple-400'
		}
	};

	const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.orange;
</script>

<div
	class={cn(
		'relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 pt-20',
		className
	)}
>
	<div class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
		<!-- Left gradient cone -->
		<div
			class="animate-lamp-expand bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible {colors.from} via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
			style="background-image: conic-gradient(from 70deg at center top, var(--tw-gradient-stops));"
		>
			<div
				class="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"
			></div>
			<div
				class="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]"
			></div>
		</div>

		<!-- Right gradient cone -->
		<div
			class="animate-lamp-expand bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent {colors.to} text-white [--conic-position:from_290deg_at_center_top]"
			style="background-image: conic-gradient(from 290deg at center top, var(--tw-gradient-stops));"
		>
			<div
				class="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]"
			></div>
			<div
				class="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"
			></div>
		</div>

		<!-- Background blur layers -->
		<div class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
		<div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

		<!-- Glow effects -->
		<div
			class="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full {colors.glow} opacity-50 blur-3xl"
		></div>
		<div
			class="animate-lamp-glow absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full {colors.glowLight} blur-2xl"
		></div>

		<!-- Light line -->
		<div
			class="animate-lamp-line absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] {colors.line}"
		></div>

		<!-- Top cover -->
		<div class="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
	</div>

	<div class="relative z-50 flex -translate-y-32 flex-col items-center px-5 md:-translate-y-48">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
