<script lang="ts">
	import type { Quote } from './quote';

	export let quote: Quote;
	export let onLike: (() => void) | null = null;
	export let onEdit: (() => void) | null = null;
	export let onDelete: (() => void) | null = null;
</script>

<div class="widget-border">
	<div class="information-container">
		<p class="quote-text">💡 "{quote.text}"</p>
		<p class="quote-author">~ {quote.author}</p>
		<p class="like-count">❤️ {quote.likeCount}</p>
	</div>
	<div class="modify-container">
		{#if onLike}
			<button on:click={onLike} class="like-button">❤️</button>
		{/if}
		{#if onEdit}
			<button on:click={onEdit} class="edit-button">🖊️</button>
		{/if}
		{#if onDelete}
			<button on:click={onDelete} class="delete-button">🚮</button>
		{/if}
	</div>
</div>

<style>
	.widget-border {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.information-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		margin: 5px 0;
	}

	.quote-text {
		font-size: 18px;
		font-weight: bold;
	}

	.quote-author {
		font-size: 14px;
		font-style: italic;
		color: #888;
	}

	.like-count {
		font-size: 16px;
		color: #888;
	}

	.modify-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		gap: 5px;
	}

	.like-button,
	.edit-button,
	.delete-button {
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: transparent;
		font-size: 20px;
		cursor: pointer;
	}

	.like-button:hover,
	.edit-button:hover,
	.delete-button:hover {
		color: #888;
		background-color: #f0f0f0;
	}
</style>
