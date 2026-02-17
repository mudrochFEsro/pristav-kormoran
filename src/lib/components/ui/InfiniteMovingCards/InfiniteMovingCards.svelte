<script lang="ts">
	import { cn } from '$lib/utils';

	interface CardItem {
		image: string;
		title: string;
		description?: string;
		link?: string;
	}

	interface Props {
		items: CardItem[];
		direction?: 'left' | 'right';
		speed?: 'slow' | 'normal' | 'fast';
		pauseOnHover?: boolean;
		className?: string;
	}

	let {
		items,
		direction = 'left',
		speed = 'normal',
		pauseOnHover = true,
		className
	}: Props = $props();

	const speedMap = {
		slow: '60s',
		normal: '40s',
		fast: '20s'
	} as const;

	const animationDuration = $derived(speedMap[speed]);
	const animationDirection = $derived(direction === 'left' ? 'normal' : 'reverse');

	// Duplicate items for seamless loop
	const duplicatedItems = $derived([...items, ...items]);
</script>

<div
	class={cn(
		'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]',
		className
	)}
>
	<ul
		class="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 sm:gap-5 md:gap-6 lg:gap-8"
		class:pause-on-hover={pauseOnHover}
		style="
			animation: infinite-scroll {animationDuration} linear infinite;
			animation-direction: {animationDirection};
		"
	>
		{#each duplicatedItems as item, i (i)}
			<li class="relative w-[260px] shrink-0 sm:w-[300px] md:w-[340px] lg:w-[380px]">
				{#if item.link}
					<a href={item.link} class="group block">
						<div class="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:rounded-2xl">
							<div class="relative h-36 w-full overflow-hidden sm:h-40 md:h-44 lg:h-48">
								<img
									src={item.image}
									alt={item.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
								<!-- Title overlay on image -->
								<div class="absolute inset-x-0 bottom-0 p-4">
									<h3 class="text-lg font-bold text-white drop-shadow-md sm:text-xl">
										{item.title}
									</h3>
									{#if item.description}
										<p class="text-sm text-white/80">{item.description}</p>
									{/if}
								</div>
							</div>
							<!-- Orange accent bar -->
							<div class="h-1 w-full bg-orange-500"></div>
						</div>
					</a>
				{:else}
					<div class="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md lg:rounded-2xl">
						<div class="relative h-36 w-full overflow-hidden sm:h-40 md:h-44 lg:h-48">
							<img
								src={item.image}
								alt={item.title}
								class="h-full w-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
							<div class="absolute inset-x-0 bottom-0 p-4">
								<h3 class="text-lg font-bold text-white drop-shadow-md sm:text-xl">{item.title}</h3>
								{#if item.description}
									<p class="text-sm text-white/80">{item.description}</p>
								{/if}
							</div>
						</div>
						<div class="h-1 w-full bg-orange-500"></div>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.pause-on-hover:hover {
		animation-play-state: paused;
	}
</style>
