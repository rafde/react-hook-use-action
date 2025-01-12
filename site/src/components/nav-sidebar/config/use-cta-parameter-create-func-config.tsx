import Code from '../../ui/code';
import { NavItem, } from './index';

export const useCTAParameterCreateFuncExampleConfig: NavItem = {
	desc: <>
		<Code>createFunc</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-create-func-example',
	title: 'Parameter: createFunc Example',
};

export const useCTAParameterCreateFuncParameterConfig: NavItem = {
	desc: <>
		<Code>createFunc</Code>
		{' '}
		Parameter:
		{' '}
		<Code>dispatch</Code>
	</>,
	href: 'use-cta-parameter-create-func-parameter',
	navTitle: <>
		Parameter:
		{' '}
		<Code>dispatch</Code>
	</>,
	title: 'createFunc Parameter dispatch',
};

export const useCTAParameterCreateFuncReturnConfig: NavItem = {
	desc: <Code>createFunc return</Code>,
	href: 'use-cta-parameter-create-func-return',
	navTitle: <Code>return</Code>,
	title: 'createFunc return',
};

export const useCTAParameterCreateFuncConfig: NavItem = {
	desc: <>
		2nd Parameter:
		{' '}
		<Code>createFunc</Code>
	</>,
	href: 'use-cta-parameter-create-func',
	subNav: [
		useCTAParameterCreateFuncExampleConfig,
		useCTAParameterCreateFuncParameterConfig,
		useCTAParameterCreateFuncReturnConfig,
	],
	title: '2nd Parameter: createFunc',
};
