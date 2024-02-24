'use strict';

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	globals: {
		globalThis: false, // means it is not writeable
	},
	ignorePatterns: [
		'jest.config.js',
	],
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
		},
		{
			env: {
				jest: true,
				'jest/globals': true,
			},
			'extends': [
				'plugin:jest/recommended',
				'plugin:jest/style',
				'plugin:testing-library/react',
			],
			files: '*.test.ts',
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
				'jest/prefer-expect-resolves': 'error',
				'jest/prefer-spy-on': 'error',
				'jest/prefer-todo': 'error',
				'testing-library/no-dom-import': 'error',
				'testing-library/prefer-find-by': 'error',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'react',
	],
	rules: {
		'array-bracket-newline': [
			'error',
			'always',
		],
		'array-callback-return': 'error',
		'arrow-body-style': 'error',
		'arrow-parens': 'error',
		'arrow-spacing': 'error',
		'brace-style': [
			'error',
			'1tbs',
			{
				allowSingleLine: false,
			},
		],
		'comma-dangle': [
			'error',
			'always',
		],
		'comma-style': [
			'error',
		],
		'computed-property-spacing': [
			'error',
			'always',
		],
		curly: [
			2,
			'all',
		],
		'dot-location': [
			'error',
			'property',
		],
		'dot-notation': 'error',
		'eol-last': [
			'error',
			'always',
		],
		eqeqeq: [
			'error',
			'smart',
		],
		'func-call-spacing': 'error',
		'function-call-argument-newline': [
			'error',
			'consistent',
		],
		'function-paren-newline': [
			'error',
			'consistent',
		],
		'generator-star-spacing': 'error',
		'implicit-arrow-linebreak': 'error',
		indent: [
			'error',
			'tab',
		],
		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'linebreak-style': [
			'error',
			'unix',
		],
		'lines-around-comment': 'off',
		'lines-between-class-members': 'error',
		'newline-per-chained-call': 'error',
		'no-confusing-arrow': 'error',
		'no-div-regex': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-extra-bind': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-label': 'error',
		'no-extra-parens': 'error',
		'no-extra-semi': 'error',
		'no-floating-decimal': 'error',
		'no-func-assign': 'error',
		'no-implicit-coercion': 'error',
		'no-lonely-if': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		'no-new-native-nonconstructor': 'error',
		'no-param-reassign': 'error',
		'no-promise-executor-return': 'error',
		'no-regex-spaces': 'error',
		'no-restricted-imports': 'error',
		'no-trailing-spaces': [
			'error',
			{
				skipBlankLines: true,
			},
		],
		'no-undef-init': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unneeded-ternary': 'error',
		'no-unreachable-loop': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-unused-labels': 'error',
		'no-unused-private-class-members': 'error',
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		'no-useless-computed-key': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-newline': 'error',
		'object-curly-spacing': [
			'error',
			'always',
		],
		'object-property-newline': 'error',
		'object-shorthand': 'error',
		'operator-assignment': 'error',
		'operator-linebreak': [
			'error',
			'before',
		],
		'padded-blocks': [
			'error',
			'never',
		],
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-object-spread': 'error',
		'quote-props': [
			'error',
			'as-needed',
			{
				keywords: true,
			},
		],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
			},
		],
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'rest-spread-spacing': [
			'error',
			'never',
		],
		semi: [
			'error',
			'always',
		],
		'semi-style': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': [
			'error',
			'never',
		],
		'space-in-parens': [
			'error',
			'always',
		],
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': 'error',
		strict: 'error',
		'switch-colon-spacing': 'error',
		'template-tag-spacing': [
			'error',
			'always',
		],
		'unicode-bom': 'error',
		'wrap-iife': 'error',
		yoda: 'error',
	},
};
