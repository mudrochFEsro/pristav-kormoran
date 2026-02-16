<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'sync' | 'auto';
		width?: number;
		height?: number;
	}

	let {
		src,
		alt,
		class: className = '',
		loading = 'lazy',
		decoding = 'async',
		width,
		height
	}: Props = $props();

	const aspectRatioStyle = $derived(
		width && height ? `aspect-ratio: ${width} / ${height};` : ''
	);
</script>

<img
	{src}
	{alt}
	class={className}
	{loading}
	{decoding}
	{width}
	{height}
	style={aspectRatioStyle}
/>
