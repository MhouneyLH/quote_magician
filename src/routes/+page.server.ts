// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load = async ({ fetch }) => {
	console.log('Fetching data from API...');

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
			if (!dailyQuote.ok) {
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
