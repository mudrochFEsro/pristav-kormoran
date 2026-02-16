<script lang="ts">
	import { scrollReveal } from '$lib/actions/scrollReveal';

	interface Props {
		image: string;
		imageAlt: string;
		icon: string;
		title: string;
		/** Animation delay in ms for staggered effect */
		animationDelay?: number;
	}

	let { image, imageAlt, icon, title, animationDelay = 0 }: Props = $props();
</script>

<div
	class="category"
	use:scrollReveal={{ variant: 'fade', delay: animationDelay }}
>
	<img src={image} alt={imageAlt} />
	<div class="category-text">
		<span class={icon} aria-hidden="true"></span>
		<h3>{title}</h3>
	</div>
</div>
