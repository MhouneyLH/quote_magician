import { DevopsQuoteAPI } from '$lib/quote/api/devops_quote_api';
import type { QuoteAPI } from '$lib/quote/api/quote_api';
import type { Quote } from '$lib/quote/quote';

const quoteApi: QuoteAPI = new DevopsQuoteAPI();

export async function POST({ request }) {
	const quote: Quote = await request.json();
	const response = await quoteApi.createQuote(quote);

	return response;
}

export async function PUT({ request }) {
	const quote: Quote = await request.json();
	const response = await quoteApi.updateQuote(quote);

	return response;
}

export async function DELETE({ request }) {
	const quote: Quote = await request.json();
	const response = await quoteApi.deleteQuote(quote);

	return response;
}
