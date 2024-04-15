export const load = async ({ fetch }) => {
	console.log('Fetching data from API...');

	// TODO: Currently we use the fetch from which is given as parameter. Normally we could also use the [DevOpsApi] implementation for doing these calls.
	const handleGetAllQuotes = async () => {
		try {
			const quotes = await fetch('http://api:4000/quotes');
			return quotes.json();
		} catch (error) {
			console.error('Error handling fetched data:', error);
		}
	};

	const handleGetDailyQuote = async () => {
		try {
			const dailyQuote = await fetch('http://api:4000/quotes/daily');

			if (dailyQuote.status === 404) {
				return undefined;
			}

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
