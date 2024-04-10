<script lang="ts">
	import QuoteWidget from './quote_widget.svelte';
	import { onMount } from 'svelte';
	import { type QuoteAPI, AWSLambdaQuoteAPI  } from './quote_api';
	import type { Quote } from './quote';

	let quoteApi: QuoteAPI = new AWSLambdaQuoteAPI();

	let quotes: Quote[] = [];
	let dailyQuote: Quote;
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

	const handleGetAllQuotes = async () => {
		try {
			const bodyData = await quoteApi.getAllQuotes();
			quotes = bodyData.map((quote: any) => ({
				id: quote.id,
				text: quote.text,
				author: quote.author,
				likeCount: quote.likeCount
			}));
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleGetDailyQuote = async () => {
		try {
			const bodyData = await quoteApi.getDailyQuote();
			dailyQuote = bodyData;
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleCreateQuote = async (quote: Quote) => {
		try {
			await quoteApi.createQuote(quote);
			handleGetAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleUpdateQuote = async (quote: Quote) => {
		try {
			await quoteApi.updateQuote(quote);
			handleGetAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleLikeQuote = async (quote: Quote) => {
		try {
			quote.likeCount++;
			await quoteApi.updateQuote(quote);
			handleGetAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleDeleteQuote = async (quote: Quote) => {
		try {
			await quoteApi.deleteQuote(quote);
			handleGetAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	onMount(() => {
		handleGetAllQuotes();
		handleGetDailyQuote();
	});
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
			on:like={() => handleLikeQuote(dailyQuote)}
			on:edit={() => handleUpdateQuote(dailyQuote)}
			on:delete={() => handleDeleteQuote(dailyQuote)}
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

			<button on:click={() => handleCreateQuote(newQuote)}>Add Quote</button>
		</div>
		<div class="divider"></div>
	{/if}
	<div class="divider"></div>

	{#if quotes.length === 0}
		<p>Keine Zitate vorhanden. 🙁</p>
	{/if}
	{#each quotes as quote}
		<QuoteWidget
			{quote}
			on:like={() => handleLikeQuote(quote)}
			on:edit={() => handleUpdateQuote(quote)}
			on:delete={() => handleDeleteQuote(quote)}
		></QuoteWidget>
		<div class="divider"></div>
	{/each}
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
