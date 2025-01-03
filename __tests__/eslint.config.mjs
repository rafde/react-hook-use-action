import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import { createRequire, } from 'module';

import rootEslintConfig from '../eslint.config.mjs';

const require = createRequire( import.meta.url, );

export default [
	...rootEslintConfig,
	jest.configs[ 'flat/recommended' ],
	jest.configs[ 'flat/style' ],
	testingLibrary.configs[ 'flat/react' ],
	{
		files: [
			'**/*.test.js',
		],
		plugins: {
			jest,
			'testing-library': testingLibrary,
		},

		languageOptions: {
			globals: jest.environments.globals.globals,
		},

		settings: {
			jest: {
				version: require( 'jest/package.json', ).version,
			},
		},

		rules: {
			'jest/consistent-test-it': ['error', {
				fn: 'test',
				withinDescribe: 'test',
			},],

			'jest/no-alias-methods': 'error',
			'jest/prefer-comparison-matcher': 'error',
			'jest/prefer-jest-mocked': 'error',
			'jest/prefer-lowercase-title': 'error',
			'jest/prefer-to-be': 'error',
			'jest/prefer-mock-promise-shorthand': 'error',
			'jest/prefer-expect-resolves': 'error',
			'jest/prefer-spy-on': 'error',
			'jest/prefer-todo': 'error',
			'testing-library/no-dom-import': 'error',
			'testing-library/prefer-find-by': 'error',
		},
	},
];
