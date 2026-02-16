<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error {$page.status}</title>
</svelte:head>

<div class="error-page">
	<h1>{$page.status}</h1>
	<p>{$page.error?.message ?? 'Something went wrong'}</p>
	<a href="/">Back to homepage</a>
</div>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: 4rem;
		color: #f60;
		margin: 0;
	}

	p {
		font-size: 1.25rem;
		color: #646464;
		margin: 1rem 0 2rem;
	}

	a {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #f60;
		color: white;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 0.875rem;
	}

	a:hover {
		background: #ee5800;
	}
</style>
