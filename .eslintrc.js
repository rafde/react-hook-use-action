'use strict';

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	'extends': [
		'plugin:@stylistic/recommended-extends',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	globals: {
		globalThis: false, // means it is not writeable
	},
	ignorePatterns: [
		'jest.config.js',
		'dist/',
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
		'@stylistic',
	],
	rules: {
		'@stylistic/arrow-spacing': 'error',
		'@stylistic/comma-dangle': [
			'error',
			'always',
		],
		'@stylistic/comma-style': [
			'error',
		],
		'@stylistic/computed-property-spacing': [
			'error',
			'always',
		],
		'@stylistic/dot-location': [
			'error',
			'property',
		],
		'@stylistic/func-call-spacing': 'error',
		'@stylistic/function-call-argument-newline': [
			'error',
			'consistent',
		],
		'@stylistic/function-paren-newline': [
			'error',
			'consistent',
		],
		'@stylistic/generator-star-spacing': 'error',
		'@stylistic/implicit-arrow-linebreak': 'error',
		'@stylistic/indent': [
			'error',
			'tab',
		],
		'@stylistic/indent-binary-ops': [
			'error',
			'tab',
		],
		'@stylistic/jsx-closing-tag-location': 'off',
		'@stylistic/jsx-indent': [
			'error',
			'tab',
		],
		'@stylistic/jsx-wrap-multilines': 'off',
		'@stylistic/linebreak-style': 'error',
		'@stylistic/lines-around-comment': 'off',
		'@stylistic/newline-per-chained-call': 'error',
		'@stylistic/no-confusing-arrow': 'error',
		'@stylistic/no-extra-semi': 'error',
		'@stylistic/no-tabs': 'off',
		'@stylistic/object-curly-newline': 'error',
		'@stylistic/object-property-newline': 'error',
		'@stylistic/operator-linebreak': [
			'error',
			'before',
		],
		'@stylistic/padded-blocks': [
			'error',
			'never',
		],
		'@stylistic/quote-props': [
			'error',
			'as-needed',
			{
				keywords: true,
			},
		],
		'@stylistic/quotes': [
			'error',
			'single',
			{
				avoidEscape: true,
			},
		],
		'@stylistic/semi': [
			'error',
			'always',
		],
		'@stylistic/semi-style': 'error',
		'@stylistic/space-before-function-paren': [
			'error',
			'never',
		],
		'@stylistic/space-in-parens': [
			'error',
			'always',
		],
		'@stylistic/switch-colon-spacing': 'error',
		'array-callback-return': 'error',
		'arrow-body-style': 'error',
		curly: [
			2,
			'all',
		],
		'dot-notation': 'error',
		eqeqeq: [
			'error',
			'smart',
		],
		'no-div-regex': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-extra-bind': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-label': 'error',
		'no-extra-parens': 'error',
		'no-func-assign': 'error',
		'no-implicit-coercion': 'error',
		'no-lonely-if': 'error',
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
		'object-shorthand': 'error',
		'operator-assignment': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-object-spread': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		strict: 'error',
		'unicode-bom': 'error',
		yoda: 'error',
	},
};
