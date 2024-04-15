<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import QuoteWidget from '../components/quote_widget.svelte';
	import { type Quote } from '../lib/quote/quote';

	export let data: any;
	let quotes: Quote[] = data.quotes;
	let dailyQuote: Quote = data.dailyQuote;

	async function refreshQuotes() {
		await invalidateAll();

		quotes = data.quotes;
		dailyQuote = data.dailyQuote;
	}

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

	async function createQuote(quote: Quote) {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify(quote)
		});

		if (!response.ok) {
			throw new Error('Failed to create quote');
		}

		await refreshQuotes();
	}

	async function updateQuote(quote: Quote) {
		const response = await fetch('/', {
			method: 'PUT',
			body: JSON.stringify(quote)
		});

		if (!response.ok) {
			throw new Error('Failed to update quote');
		}

		await refreshQuotes();
	}

	async function likeQuote(quote: Quote) {
		const newQuote: Quote = { ...quote, likeCount: quote.likeCount + 1 };
		await updateQuote(newQuote);
	}

	async function deleteQuote(quote: Quote) {
		const response = await fetch('/', {
			method: 'DELETE',
			body: JSON.stringify(quote)
		});

		if (!response.ok) {
			throw new Error('Failed to delete quote');
		}

		await refreshQuotes();
	}
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
			on:like={() => likeQuote(dailyQuote)}
			on:edit={() => updateQuote(dailyQuote)}
			on:delete={() => deleteQuote(dailyQuote)}
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

			<button on:click={() => createQuote(newQuote)}>Add Quote</button>
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
				on:like={() => likeQuote(quote)}
				on:edit={() => updateQuote(quote)}
				on:delete={() => deleteQuote(quote)}
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
