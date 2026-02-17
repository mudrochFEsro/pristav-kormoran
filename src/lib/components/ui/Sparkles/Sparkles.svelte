<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		minSize?: number;
		maxSize?: number;
		speed?: number;
		particleColor?: string;
		particleDensity?: number;
		className?: string;
	}

	let {
		minSize = 0.6,
		maxSize = 1.5,
		speed = 3,
		particleColor = '#ffffff',
		particleDensity = 100,
		className
	}: Props = $props();

	// Generate particles with random properties
	const particles = $derived(
		Array.from({ length: particleDensity }, (_, i) => ({
			id: i,
			size: minSize + Math.random() * (maxSize - minSize),
			top: Math.random() * 100,
			left: Math.random() * 100,
			delay: Math.random() * speed,
			duration: speed + Math.random() * speed
		}))
	);
</script>

<div class={cn('relative h-48 overflow-hidden', className)}>
	<div class="absolute inset-0">
		{#each particles as particle (particle.id)}
			<span
				class="absolute animate-sparkle rounded-full"
				style="
					width: {particle.size}px;
					height: {particle.size}px;
					background-color: {particleColor};
					top: {particle.top}%;
					left: {particle.left}%;
					animation-delay: {particle.delay}s;
					animation-duration: {particle.duration}s;
				"
			></span>
		{/each}
	</div>
</div>
