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
		},
		globals: true,
		environment: 'happy-dom',
		mockReset: true,
		watch: false,
	},
}, );
