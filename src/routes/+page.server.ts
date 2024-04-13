// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

// import { AWSLambdaQuoteAPI } from '$lib/quote/api/aws_lambda_quote_api';
import { DevopsQuoteAPI } from '$lib/quote/api/devops_quote_api';
import type { Quote } from '$lib/quote/quote';
import { invalidateAll } 

const quoteApi = new DevopsQuoteAPI();

export const load = async ({ fetch }) => {
	const handleGetAllQuotes = async () => {
		// try {
		// 	const quotes = await quoteApi.getAllQuotes();
		// 	return quotes;
		// } catch (error) {
		// 	console.error('Error handling fetched data:', error);
		// }
		try {
			const quotes = await fetch('http://api:4000/quotes');
			return quotes.json();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleGetDailyQuote = async () => {
		// try {
		// 	const dailyQuote = await quoteApi.getDailyQuote();
		// 	return dailyQuote;
		// } catch (error) {
		// 	console.error('Error handling fetched data:', error);
		// }
		try {
			const dailyQuote = await fetch('http://api:4000/quotes/daily');
			return dailyQuote.json();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	return {
		quotes: await handleGetAllQuotes(),
		dailyQuote: await handleGetDailyQuote()
	};
};

export const _handleCreateQuote = async (quote: Quote) => {
	try {
		await quoteApi.createQuote(quote);
		invalidateAll();
	} catch (error) {
		console.error('Error handling fetched data:', error);
	}
};

export const _handleUpdateQuote = async (quote: Quote) => {
	try {
		await quoteApi.updateQuote(quote);
		invalidateAll();
	} catch (error) {
		console.error('Error handling fetched data:', error);
	}
};

export const _handleLikeQuote = async (quote: Quote) => {
	try {
		quote.likeCount++;
		await quoteApi.updateQuote(quote);
		invalidateAll();
	} catch (error) {
		console.error('Error handling fetched data:', error);
	}
};

export const _handleDeleteQuote = async (quote: Quote) => {
	try {
		await quoteApi.deleteQuote(quote);
		invalidateAll();
	} catch (error) {
		console.error('Error handling fetched data:', error);
	}
};
