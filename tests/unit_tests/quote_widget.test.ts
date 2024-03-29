import { Quote } from '../../src/routes/quote';
import QuoteWidget from '../../src/routes/quote_widget.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

describe('Quote Component ', () => {
	it('should render the component', () => {
		const quote: Quote = {
			id: '1',
			text: 'text',
			author: 'author',
			likeCount: 1
		};
		render(QuoteWidget, { quote });

		expect(screen.getByText('💡 "text"')).toBeTruthy();
		expect(screen.getByText('~ author')).toBeTruthy();
		expect(screen.getByText('❤️ 1')).toBeTruthy();
	});
});
