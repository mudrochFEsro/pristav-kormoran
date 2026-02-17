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
		'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
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
			<li class="relative w-[280px] shrink-0 sm:w-[320px] md:w-[360px] lg:w-[400px]">
				{#if item.link}
					<a href={item.link} class="group block">
						<div class="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 lg:rounded-3xl">
							<div class="relative h-40 w-full overflow-hidden sm:h-44 md:h-48 lg:h-52">
								<img
									src={item.image}
									alt={item.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
							</div>
							<div class="p-5 sm:p-6">
								<h3 class="text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600 sm:text-xl">
									{item.title}
								</h3>
								{#if item.description}
									<p class="mt-2 text-sm text-gray-500 sm:text-base">{item.description}</p>
								{/if}
							</div>
							<!-- Orange accent on hover -->
							<div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
						</div>
					</a>
				{:else}
					<div class="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg lg:rounded-3xl">
						<div class="relative h-40 w-full overflow-hidden sm:h-44 md:h-48 lg:h-52">
							<img
								src={item.image}
								alt={item.title}
								class="h-full w-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
						</div>
						<div class="p-5 sm:p-6">
							<h3 class="text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
							{#if item.description}
								<p class="mt-2 text-sm text-gray-500 sm:text-base">{item.description}</p>
							{/if}
						</div>
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
