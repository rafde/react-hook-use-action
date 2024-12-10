'use strict';

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	'extends': [
		'../.eslintrc.cjs',
		'plugin:@next/next/recommended',
		'plugin:tailwindcss/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'{next,postcss,tailwind}.config.js',
			],
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
			},
		},
	],
	settings: {
		tailwindcss: {
			config: './tailwind.config.js',
			callees: [
				'cn',
			],
			classRegex: '(^c|C)lass(Name)?$',
		},
	},
};
