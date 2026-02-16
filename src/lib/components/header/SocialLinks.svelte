<script lang="ts">
	const FACEBOOK_URL = 'http://www.facebook.com/pristavkormoran';
	const INSTAGRAM_URL = 'https://www.instagram.com/kormoran_ports/';
</script>

<div class="social-links">
	<a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
		<span class="icon-custom-facebook"></span>
	</a>
	<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
		<span class="icon-custom-instagram"></span>
	</a>
</div>

<style>
	.social-links {
		display: flex;
		gap: 8px;
		font-size: 25px;
	}

	.social-links a {
		display: inline-block;
		transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.social-links a:hover {
		transform: scale(1.1);
	}
</style>
