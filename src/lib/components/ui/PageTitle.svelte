<script lang="ts">
	interface Props {
		title: string;
		variant?: 'orange' | 'white';
		hasImage?: boolean;
	}

	let { title, variant = 'white', hasImage = false }: Props = $props();

	const classes = $derived(
		variant === 'orange'
			? 'main-title'
			: `static-title${!hasImage ? ' static-title-no-img' : ''}`
	);
</script>

<h1 class={classes}>{title}</h1>
