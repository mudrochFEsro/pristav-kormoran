<script lang="ts">
	interface SocialLink {
		name: string;
		href: string;
		icon: 'facebook' | 'instagram';
		bgColor: string;
	}

	const socialLinks: SocialLink[] = [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/pristavkormoran',
			icon: 'facebook',
			bgColor: '#1877f2'
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/kormoran_ports/',
			icon: 'instagram',
			bgColor: '' // Uses gradient
		}
	];
</script>

<ul class="social-icons" role="list" aria-label="Social media">
	{#each socialLinks as link}
		<li>
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="social-icons__link social-icons__link--{link.icon}"
				style={link.bgColor ? `background-color: ${link.bgColor}` : ''}
				aria-label={link.name}
				title={link.name}
			>
				{#if link.icon === 'facebook'}
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icons__svg" aria-hidden="true">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
				{:else if link.icon === 'instagram'}
					<svg viewBox="0 0 24 24" fill="currentColor" class="social-icons__svg" aria-hidden="true">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
					</svg>
				{/if}
			</a>
		</li>
	{/each}
</ul>

<style>
	.social-icons {
		display: flex;
		gap: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.social-icons__link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		color: var(--color-white);
		border-radius: var(--radius-md);
		transition: all 0.3s var(--ease-out-expo);
		position: relative;
		overflow: hidden;
	}

	/* Shine effect on hover */
	.social-icons__link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.4s ease;
	}

	.social-icons__link:hover::before {
		left: 100%;
	}

	.social-icons__link:hover {
		transform: translateY(-2px) scale(1.1);
	}

	.social-icons__link:active {
		transform: translateY(0) scale(1);
	}

	/* Brand-specific styling */
	.social-icons__link--facebook:hover {
		box-shadow: 0 4px 12px rgba(24, 119, 242, 0.5);
	}

	.social-icons__link--instagram {
		background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
	}

	.social-icons__link--instagram:hover {
		box-shadow: 0 4px 12px rgba(225, 48, 108, 0.5);
	}

	.social-icons__svg {
		width: 14px;
		height: 14px;
		position: relative;
		z-index: 1;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.social-icons__link {
			transition: none;
		}

		.social-icons__link:hover {
			transform: none;
		}

		.social-icons__link::before {
			display: none;
		}
	}
</style>
