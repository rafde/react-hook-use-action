'use strict';

module.exports = {
	env: {
		jest: true,
		'jest/globals': true,
	},
	'extends': [
		'../.eslintrc.cjs',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:testing-library/react',
	],
	plugins: [
		'jest',
		'testing-library',
	],
	rules: {
		'jest/consistent-test-it': [
			'error',
			{
				fn: 'test',
				withinDescribe: 'test',
			},
		],
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
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
			},
		},
	],
	settings: {
		jest: {
			version: require( 'jest/package.json', ).version,
		},
	},
};
