import { defineConfig, } from 'vitest/config';

export default defineConfig( {
	cacheDir: '.test-cache',
	test: {
		coverage: {
			reportsDirectory: './coverage',
			all: false,
			include: [
				'src/*.ts',
				'src/internal/*.ts',
			],
			reporter: ['text', 'html', 'json-summary',],
		},
		globals: true,
		environment: 'happy-dom',
		mockReset: true,
		watch: false,
	},
}, );
