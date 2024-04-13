import type { Quote } from '../quote';
import type { QuoteAPI } from './quote_api';
// import { env } from '$env/static/public';
import { Logger } from '$lib/utils/logger';

export class DevopsQuoteAPI implements QuoteAPI {
	private API_URL: string = `http://localhost:4000`;
	// private API_URL: string = `http://${env.PUBLIC_QUOTE_API_ADDRESS}:4000`;

	async getAllQuotes(): Promise<Quote[]> {
		try {
			Logger.log('Getting all quotes');

			const response = await fetch(`${this.API_URL}/quotes`, {
				method: 'GET'
			});
			const data = await response.json();

			Logger.log('Got all quotes');
			Logger.log(JSON.stringify(data['body']));

			return JSON.parse(data['body']);
		} catch (error) {
			console.error('Error while getAllQuotes()', error);
			throw error;
		}
	}

	async getDailyQuote(): Promise<Quote> {
		try {
			Logger.log('Getting daily quote');

			const response = await fetch(`${this.API_URL}/quotes/daily`, {
				method: 'GET'
			});
			const data = await response.json();

			Logger.log('Got daily quote');
			Logger.log(JSON.stringify(data['body']));

			return JSON.parse(data['body']);
		} catch (error) {
			console.error('Error while getDailyQuote()', error);
			throw error;
		}
	}

	async createQuote(quote: Quote): Promise<Response> {
		try {
			const body = JSON.stringify({
				author: quote.author,
				text: quote.text,
				likeCount: quote.likeCount
			});

			Logger.log('Creating quote');
			Logger.log(body);

			const response = await fetch(`${this.API_URL}/quote`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			Logger.log('Created quote');
			Logger.log(JSON.stringify(response));

			return response;
		} catch (error) {
			console.error('Error while createQuote()', error);
			throw error;
		}
	}

	async updateQuote(quote: Quote): Promise<Response> {
		try {
			const body = JSON.stringify({
				author: quote.author,
				text: quote.text,
				likeCount: quote.likeCount
			});

			Logger.log('Updating quote');
			Logger.log(body);

			const response = await fetch(`${this.API_URL}/quotes/${quote.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			Logger.log('Updated quote');
			Logger.log(JSON.stringify(response));

			return response;
		} catch (error) {
			console.error('Error while updateQuote()', error);
			throw error;
		}
	}

	async deleteQuote(quote: Quote): Promise<Response> {
		try {
			Logger.log('Deleting quote');
			Logger.log(JSON.stringify(quote));

			const response = await fetch(`${this.API_URL}/quotes/${quote.id}`, {
				method: 'DELETE'
			});

			Logger.log('Deleted quote');

			return response;
		} catch (error) {
			console.error('Error while deleteQuote()', error);
			throw error;
		}
	}
}
