import type { Quote } from './quote';

const API_URL = 'https://4l88bbgzf2.execute-api.us-east-1.amazonaws.com/v1';

export async function getAllQuotes() {
	try {
		const response = await fetch(`${API_URL}/quotes`, {
			method: 'GET'
		});
		const data = await response.json();

		return JSON.parse(data['body']);
	} catch (error) {
		console.error('Error while getAllQuotes()', error);
		throw error;
	}
}

export async function getDailyQuote() {
	try {
		const response = await fetch(`${API_URL}/daily`, {
			method: 'GET'
		});
		const data = await response.json();

		return JSON.parse(data['body']);
	} catch (error) {
		console.error('Error while getDailyQuote()', error);
		throw error;
	}
}

export async function createQuote(quote: Quote) {
	try {
		const response = await fetch(`${API_URL}/quote`, {
			method: 'POST',
			body: JSON.stringify({
				author: quote.author,
				text: quote.text,
				likeCount: quote.likeCount
			})
		});

		return response;
	} catch (error) {
		console.error('Error while createQuote()', error);
		throw error;
	}
}

export async function updateQuote(quote: Quote) {
	try {
		const response = await fetch(`${API_URL}/quote?id=${quote.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				author: quote.author,
				text: quote.text,
				likeCount: quote.likeCount
			})
		});

		return response;
	} catch (error) {
		console.error('Error while updateQuote()', error);
		throw error;
	}
}

export async function deleteQuote(quote: Quote) {
	try {
		const response = await fetch(`${API_URL}/quote?id=${quote.id}`, {
			method: 'DELETE'
		});

		return response;
	} catch (error) {
		console.error('Error while deleteQuote()', error);
		throw error;
	}
}
