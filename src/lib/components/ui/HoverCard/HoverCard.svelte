<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		className?: string;
	}

	let { children, className }: Props = $props();

	let cardRef: HTMLDivElement | undefined = $state();
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isHovering = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!cardRef) return;

		const rect = cardRef.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		rotateY = (mouseX / (rect.width / 2)) * 10;
		rotateX = -(mouseY / (rect.height / 2)) * 10;
	}

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div
	bind:this={cardRef}
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="article"
	class={cn(
		'group relative rounded-xl border border-white/[0.1] bg-slate-900/50 p-6 transition-all duration-200',
		className
	)}
	style="
		transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg);
		transform-style: preserve-3d;
	"
>
	<!-- Glow effect on hover -->
	<div
		class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="
			background: radial-gradient(
				600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
				rgba(255, 102, 0, 0.15),
				transparent 40%
			);
		"
	></div>

	<div style="transform: translateZ(50px);">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
