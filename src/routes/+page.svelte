<script lang="ts">
	import QuoteWidget from '../components/quote_widget.svelte';
	import { type Quote } from '../lib/quote/quote';
	import {
		_handleCreateQuote,
		_handleDeleteQuote,
		_handleLikeQuote,
		_handleUpdateQuote
	} from './+page.server';

	export let data: any;
	let quotes: Quote[] = data.quotes;
	let dailyQuote: Quote = data.dailyQuote;

	let newQuote: Quote = {
		id: '',
		text: '',
		author: '',
		likeCount: 0
	};

	let isCreateQuoteFormOpen = false;
	const toggleCreateQuoteForm = () => {
		isCreateQuoteFormOpen = !isCreateQuoteFormOpen;
	};
</script>

<svelte:head>
	<title>Zitate</title>
	<meta name="description" content="Zitate App" />
</svelte:head>

<section>
	<h1>Zitat des Tages</h1>
	{#if dailyQuote === undefined}
		<p>Kein Zitat des Tages vorhanden. 🙁</p>
	{:else}
		<QuoteWidget
			quote={dailyQuote}
			on:like={() => _handleLikeQuote(dailyQuote)}
			on:edit={() => _handleUpdateQuote(dailyQuote)}
			on:delete={() => _handleDeleteQuote(dailyQuote)}
		></QuoteWidget>
	{/if}
</section>

<section>
	<h1>Alle Zitate</h1>

	<button on:click={toggleCreateQuoteForm}>Toggle create quote form</button>
	<div class="divider"></div>
	{#if isCreateQuoteFormOpen}
		<div class="create-new-quote-column">
			<label for="quoteText">Quote Text:</label>
			<input bind:value={newQuote.text} id="quoteText" />

			<label for="quoteAuthor">Author:</label>
			<input bind:value={newQuote.author} id="quoteAuthor" />

			<button on:click={() => _handleCreateQuote(newQuote)}>Add Quote</button>
		</div>
		<div class="divider"></div>
	{/if}
	<div class="divider"></div>

	{#if quotes === undefined}
		<p>Loading quotes...</p>
	{:else if quotes.length === 0}
		<p>Keine Zitate vorhanden. 🙁</p>
	{:else}
		{#each quotes as quote}
			<QuoteWidget
				{quote}
				on:like={() => _handleLikeQuote(quote)}
				on:edit={() => _handleUpdateQuote(quote)}
				on:delete={() => _handleDeleteQuote(quote)}
			></QuoteWidget>
			<div class="divider"></div>
		{/each}
	{/if}
</section>

<style>
	section {
		display: block;
		flex-direction: column;
		width: 75%;
		margin: 0 auto;
	}

	.divider {
		margin: 20px 0;
	}

	button {
		font-size: medium;
		cursor: pointer;
	}

	.create-new-quote-column {
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 2px dashed #ccc;
		padding: 10px;
		border-radius: 8px;
	}
</style>
