import type { Quote } from '../quote';

export interface QuoteAPI {
	getAllQuotes(): Promise<Quote[]>;
	getDailyQuote(): Promise<Quote>;
	createQuote(quote: Quote): Promise<Response>;
	updateQuote(quote: Quote): Promise<Response>;
	deleteQuote(quote: Quote): Promise<Response>;
}
