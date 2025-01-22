import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';

import rootEslintConfig from '../eslint.config.mjs';

export default [
	...rootEslintConfig,
	testingLibrary.configs[ 'flat/react' ],
	{
		files: [
			'**/*.test.js',
		],
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
		plugins: {
			vitest,
			'testing-library': testingLibrary,
		},
		rules: {
			...vitest.configs.recommended.rules,
			'jest/consistent-test-it': ['error', {
				fn: 'test',
				withinDescribe: 'test',
			},],
			'testing-library/no-dom-import': 'error',
			'testing-library/prefer-find-by': 'error',
		},
		settings: {
			vitest: {
				typecheck: true,
			},
		},
	},
];
