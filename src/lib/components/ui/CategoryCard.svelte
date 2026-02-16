<script lang="ts">
	interface Props {
		image: string;
		imageAlt: string;
		icon: string;
		title: string;
	}

	let { image, imageAlt, icon, title }: Props = $props();
</script>

<div class="category">
	<img src={image} alt={imageAlt} />
	<div class="category-text">
		<span class={icon}></span>
		<h3>{title}</h3>
		<p></p>
	</div>
</div>
