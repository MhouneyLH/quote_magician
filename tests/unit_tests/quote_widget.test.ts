import type { Quote } from '$lib/quote/quote';
import { cleanup, render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import QuoteWidget from '../../src/components/quote_widget.svelte';

describe('Quote Component ', () => {
	beforeEach(() => {
		cleanup();
	});

	it('should render the component', () => {
		const quote: Quote = {
			id: '1',
			text: 'text',
			author: 'author',
			likeCount: 0
		};

		render(QuoteWidget, { quote });

		expect(screen.getByText(/text/)).toBeTruthy();
		expect(screen.getByText(/author/)).toBeTruthy();
		expect(screen.getByText(/0/)).toBeTruthy();
	});

	// it('should render the component with 1 like, when the like button got clicked', async () => {
	// 	const quote: Quote = {
	// 		id: '1',
	// 		text: 'text',
	// 		author: 'author',
	// 		likeCount: 0
	// 	};

	// 	const { component } = render(QuoteWidget, { quote });
	// 	component.$on('like', () => {
	// 		quote.likeCount++;
	// 	});

	// 	const likeButton = screen.getByText('❤️');
	// 	expect(likeButton).toBeTruthy();
	// 	likeButton.click();

	// 	expect(quote.likeCount).toBe(1);
	// 	expect(screen.getByText(/1/)).toBeTruthy();
	// });
});
