<script lang="ts">
	import { smoothDetails } from '$lib/actions/smoothDetails';

	interface Props {
		title: string;
		items: ReadonlyArray<{ question: string; answer: string }>;
	}

	let { title, items }: Props = $props();
</script>

<!-- Visible FAQ - same items as the FAQPage JSON-LD (AEO: answers must be on the page) -->
<section class="faq" aria-labelledby="faq-title">
	<h2 id="faq-title" class="faq__title">{title}</h2>
	<div class="faq__list">
		{#each items as item (item.question)}
			<details class="faq__item" use:smoothDetails>
				<summary class="faq__question">{item.question}</summary>
				<p class="faq__answer">{item.answer}</p>
			</details>
		{/each}
	</div>
</section>

<style>
	.faq {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-6) var(--space-8);
	}

	.faq__title {
		font-family: var(--font-primary);
		font-weight: var(--font-weight-medium);
		font-size: var(--size-heading-lg);
		/* primary-dark at ≥ 24px meets the 3:1 large-text contrast on white */
		color: var(--color-primary-dark);
		text-align: center;
		margin-bottom: var(--space-4);
	}

	.faq__item {
		/* Border-box so the animated height (smoothDetails) includes the borders */
		box-sizing: border-box;
		border-bottom: 1px solid var(--color-border-light);
	}

	.faq__item:first-child {
		border-top: 1px solid var(--color-border-light);
	}

	.faq__question {
		position: relative;
		display: block;
		padding: var(--space-4) var(--space-8) var(--space-4) 0;
		font-family: var(--font-primary);
		font-weight: var(--font-weight-medium);
		font-size: var(--size-body);
		line-height: 1.5;
		color: var(--color-text-dark);
		cursor: pointer;
		list-style: none;
	}

	.faq__question::-webkit-details-marker {
		display: none;
	}

	/* Plus that turns into a cross when open */
	.faq__question::after {
		content: '+';
		position: absolute;
		top: 50%;
		right: var(--space-2);
		font-size: 24px;
		font-weight: var(--font-weight-light);
		line-height: 1;
		color: var(--color-primary);
		transform: translateY(-50%);
		transition: transform var(--transition-normal);
	}

	/* data-closing: the cross turns back while the close animation runs */
	.faq__item[open]:not([data-closing]) .faq__question::after {
		transform: translateY(-50%) rotate(45deg);
	}

	.faq__question:hover {
		color: var(--color-primary-dark);
	}

	.faq__question:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.faq__answer {
		margin: 0;
		padding: 0 var(--space-8) var(--space-4) 0;
		font-family: var(--font-primary);
		font-weight: var(--font-weight-light);
		font-size: var(--size-body);
		line-height: 1.875;
		color: var(--color-text-primary);
	}

	@media (max-width: 768px) {
		.faq {
			padding: var(--space-5) var(--space-4);
		}

		.faq__title {
			font-size: 24px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.faq__question::after {
			transition: none;
		}
	}
</style>
