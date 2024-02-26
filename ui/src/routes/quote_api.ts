const API_URL = 'https://4l88bbgzf2.execute-api.us-east-1.amazonaws.com/v3';

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

export async function createQuote(quoteId: string) {
	try {
		const response = await fetch(`${API_URL}/quote?id=${quoteId}`, {
			method: 'POST',
			body: JSON.stringify({
				author: 'some author',
				text: 'some text',
				likeCount: -10
			})
		});

		return response;
	} catch (error) {
		console.error('Error while createQuote()', error);
		throw error;
	}
}

export async function updateQuote(quoteId: string) {
	try {
		const response = await fetch(`${API_URL}/quote?id=${quoteId}`, {
			method: 'PUT',
			body: JSON.stringify({
				author: 'some author',
				text: 'some text',
				likeCount: -10
			})
		});

		return response;
	} catch (error) {
		console.error('Error while updateQuote()', error);
		throw error;
	}
}

export async function deleteQuote(quoteId: string) {
	try {
		const response = await fetch(`${API_URL}/quote?id=${quoteId}`, {
			method: 'DELETE'
		});

		return response;
	} catch (error) {
		console.error('Error while deleteQuote()', error);
		throw error;
	}
}
