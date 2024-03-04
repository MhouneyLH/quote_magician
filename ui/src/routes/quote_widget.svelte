<script lang="ts">
	import type { Quote } from './quote';
	import { createEventDispatcher } from 'svelte';

	export let quote: Quote;

	let isEditing: boolean = false;
	let editedText: string = quote.text;
	let editedAuthor: string = quote.author;

	// Create event dispatcher for communicating with the parent component
	const dispatch = createEventDispatcher();

	const handleOnLike = () => {
		dispatch('like', quote);
	};

	const handleOnDelete = () => {
		dispatch('delete', quote);
	};

	const handleEditClick = () => {
		isEditing = true;
	};

	const handleSaveClick = () => {
		quote.text = editedText;
		quote.author = editedAuthor;

		isEditing = false;

		// Dispatch an event to notify the parent component about the update
		dispatch('edit', quote);
	};

	const handleCancelClick = () => {
		editedText = quote.text;
		editedAuthor = quote.author;

		isEditing = false;
	};
</script>

<div class="widget-border">
	<div class="information-container">
		{#if isEditing}
			<label for="text-edit-input">Quote text:</label>
			<input class="text-edit-input" bind:value={editedText} placeholder="Enter new text" />
			<label for="author-edit-input">Author:</label>
			<input class="author-edit-input" bind:value={editedAuthor} placeholder="Enter new author" />
		{:else}
			<p class="quote-text">💡 "{quote.text}"</p>
			<p class="quote-author">~ {quote.author}</p>
			<p class="like-count">❤️ {quote.likeCount}</p>
		{/if}
	</div>
	<div class="modify-container">
		{#if isEditing}
			<button on:click={handleSaveClick} class="save-button">Save</button>
			<button on:click={handleCancelClick} class="cancel-button">Cancel</button>
		{:else}
			<button on:click={handleOnLike} class="like-button">❤️</button>
			<button on:click={handleEditClick} class="edit-button">🖊️</button>
			<button on:click={handleOnDelete} class="delete-button">🚮</button>
		{/if}
	</div>
</div>

<style>
	.widget-border {
		border: 2px solid #ccc;
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
		width: 100%;
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

	button {
		font-size: large;
		cursor: pointer;
	}

	.save-button,
	.cancel-button {
		font-size: medium;
	}

	.text-edit-input,
	.author-edit-input {
		width: 100%;
		margin-bottom: 10px;
	}

	label {
		align-self: flex-start;
	}
</style>
