import type { Quote } from '../quote';
import type { QuoteAPI } from './quote_api';

export class DevopsQuoteAPI implements QuoteAPI {
	private API_URL: string = 'your_api_url';

	async getAllQuotes(): Promise<Quote[]> {
		try {
			const response = await fetch(`${this.API_URL}/quotes`, {
				method: 'GET'
			});
			const data = await response.json();

			return JSON.parse(data['body']);
		} catch (error) {
			console.error('Error while getAllQuotes()', error);
			throw error;
		}
	}

	async getDailyQuote(): Promise<Quote> {
		try {
			const response = await fetch(`${this.API_URL}/daily`, {
				method: 'GET'
			});
			const data = await response.json();

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

			const response = await fetch(`${this.API_URL}/quote`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

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

			const response = await fetch(`${this.API_URL}/quotes/${quote.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			return response;
		} catch (error) {
			console.error('Error while updateQuote()', error);
			throw error;
		}
	}

	async deleteQuote(quote: Quote): Promise<Response> {
		try {
			const response = await fetch(`${this.API_URL}/quotes/${quote.id}`, {
				method: 'DELETE'
			});

			return response;
		} catch (error) {
			console.error('Error while deleteQuote()', error);
			throw error;
		}
	}
}
