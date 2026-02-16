<script lang="ts">
	interface Props {
		icon?: string;
	}

	let { icon = 'icon-life-wheel' }: Props = $props();
</script>

<div class="divider">
	<div>
		<span class={icon}></span>
	</div>
</div>
