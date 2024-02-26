<script lang="ts">
	import Quote from './quote.svelte';
	import { onMount } from 'svelte';
	import { getAllQuotes } from './quote_api';

	let newQuoteText: string = '';
	let newQuoteAuthor: string = '';

	let quotes: { author: string; text: string; likeCount: number }[] = [];
	const fetchAllQuotes = async () => {
		try {
			const bodyData = await getAllQuotes();
			quotes = bodyData.map((quote: any) => ({
				text: quote.text,
				author: quote.author,
				likeCount: quote.likeCount
			}));
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	onMount(() => {
		fetchAllQuotes();
	});
</script>

<svelte:head>
	<title>Zitate</title>
	<meta name="description" content="Zitate App" />
</svelte:head>

<section>
	<h1>Zitat des Tages</h1>
	<Quote text={'Platzhalter'} author={'Platzhalter'} likeCount={4}></Quote>

	<h1>Alle Zitate</h1>
	<ul>
		{#each quotes as quote}
			<Quote text={quote.text} author={quote.author} likeCount={quote.likeCount}></Quote>
			<button on:click={() => console.log('Delete Item')}>Delete</button>
			<button on:click={() => console.log('Update Item')}>Update</button>
		{/each}
	</ul>

	<h1>Create New Quotes</h1>
	<label for="author">Author:</label>
	<input type="text" id="author" bind:value={newQuoteAuthor} />

	<label for="quoteText">Quote Text:</label>
	<input type="text" id="quoteText" bind:value={newQuoteText} />
	<button
		on:click={() => console.log(`Neuer Autor: ${newQuoteAuthor}, Neuer Text: ${newQuoteText}`)}
		>Create Quote</button
	>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
