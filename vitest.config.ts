import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	// dont use hot reload in vitest
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		// use DOM API for more reliable tests
		environment: 'jsdom'
	}
});
