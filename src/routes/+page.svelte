<script lang="ts">
	import QuoteWidget from '../components/quote_widget.svelte';
	import { onMount } from 'svelte';
	import { type QuoteAPI } from '../lib/quote/api/quote_api';
	import { AWSLambdaQuoteAPI } from '../lib/quote/api/aws_lambda_quote_api';
	import { type Quote } from '../lib/quote/quote';
	import { DevopsQuoteAPI } from '../lib/quote/api/devops_quote_api';
	import { invalidateAll } from '$app/navigation';
	// import { env } from '$env/static/public';

	// const deploymentEnv: string = env.PUBLIC_DEPLOYMENT_ENVIRONMENT;
	// console.log('Got deployment environment:', deploymentEnv);

	// let quoteApi: QuoteAPI;
	// if (deploymentEnv === 'devops') {
	// 	quoteApi = new DevopsQuoteAPI();
	// } else {
	// 	quoteApi = new AWSLambdaQuoteAPI();
	// }

	let quoteApi = new DevopsQuoteAPI();
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

	const handleCreateQuote = async (quote: Quote) => {
		try {
			await quoteApi.createQuote(quote);
			invalidateAll();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleUpdateQuote = async (quote: Quote) => {
		try {
			await quoteApi.updateQuote(quote);
			invalidateAll();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleLikeQuote = async (quote: Quote) => {
		try {
			quote.likeCount++;
			await quoteApi.updateQuote(quote);
			invalidateAll();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleDeleteQuote = async (quote: Quote) => {
		try {
			await quoteApi.deleteQuote(quote);
			invalidateAll();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
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

	{#if quotes === undefined}
		<p>Loading quotes...</p>
	{:else if quotes.length === 0}
		<p>Keine Zitate vorhanden. 🙁</p>
	{:else}
		{#each quotes as quote}
			<QuoteWidget
				{quote}
				on:like={() => handleLikeQuote(quote)}
				on:edit={() => handleUpdateQuote(quote)}
				on:delete={() => handleDeleteQuote(quote)}
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
