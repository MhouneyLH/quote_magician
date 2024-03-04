<script lang="ts">
	import QuoteWidget from './quote_widget.svelte';
	import { onMount } from 'svelte';
	import { getAllQuotes, getDailyQuote, deleteQuote, createQuote, updateQuote } from './quote_api';
	import type { Quote } from './quote';

	let quotes: Quote[] = [];
	const fetchAllQuotes = async () => {
		try {
			console.log('Fetching all quotes');
			const bodyData = await getAllQuotes();
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

	let dailyQuote: Quote;
	const fetchDailyQuote = async () => {
		try {
			// const bodyData = await getDailyQuote();
			// dailyQuote = bodyData;
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const performDeleteQuote = async (quote: Quote) => {
		try {
			// await deleteQuote(quote);
			// fetchAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	let newQuote: Quote = {
		id: '',
		text: '',
		author: '',
		likeCount: 0
	};
	const performCreateQuote = async (quote: Quote) => {
		try {
			// await createQuote(quote);
			// fetchAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const performUpdateQuote = async (quote: Quote) => {
		try {
			console.log('Update quote:', quote);
			// await updateQuote(quote);
			// fetchAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const performLikeQuote = async (quote: Quote) => {
		try {
			quote.likeCount++;
			console.log('Like quote:', quote);
			// await updateQuote(quote);
			// fetchAllQuotes();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	onMount(() => {
		fetchAllQuotes();
		fetchDailyQuote();
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
			on:like={() => performLikeQuote(dailyQuote)}
			on:edit={() => performUpdateQuote(dailyQuote)}
			on:delete={() => performDeleteQuote(dailyQuote)}
		></QuoteWidget>
	{/if}
</section>

<section>
	<h1>Alle Zitate</h1>
	{#each quotes as quote}
		<QuoteWidget
			{quote}
			on:like={() => performLikeQuote(quote)}
			on:edit={() => performUpdateQuote(quote)}
			on:delete={() => performDeleteQuote(quote)}
		></QuoteWidget>
		<div class="divider"></div>
	{/each}

	{#if quotes.length === 0}
		<p>Keine Zitate vorhanden. 🙁</p>
	{/if}
	<h1>Create New Quotes</h1>
	<label for="quoteText">Quote Text:</label>
	<input type="text" id="quoteText" bind:value={newQuote.text} />

	<label for="author">Author:</label>
	<input type="text" id="author" bind:value={newQuote.author} />
	<button on:click={() => performCreateQuote(newQuote)}>Create Quote</button>
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
</style>
