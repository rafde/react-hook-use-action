import Code from '../../ui/code';
import { NavItem, } from './index';

export const createCTAExampleConfig: NavItem = {
	desc: <>
		<Code>createCTA</Code>
		{' '}
		<Code>zustand</Code>
		{' '}
		Example
	</>,
	href: 'create-cta-example',
	navTitle: <>
		<Code>zustand</Code>
		{' '}
		Example
	</>,
	title: 'createCTA zustand Example',
};

export const createCTAParametersConfig: NavItem = {
	desc: <>
		<Code>createCTA</Code>
		{' '}
		Parameters
	</>,
	href: 'create-cta-parameters',
	navTitle: 'Parameters',
	title: 'Parameters',
};

export const createCTAReturnValuesConfig: NavItem = {
	desc: <>
		<Code>createCTA</Code>
		{' '}
		<Code>return</Code>
		{' '}
		values
	</>,
	href: 'create-cta-return-values',
	navTitle: <>
		<Code>return</Code>
		{' '}
		values
	</>,
	title: 'Return Values',
};

export const createCtaConfig: NavItem = {
	href: 'create-cta',
	title: 'createCTA',
	desc: <Code>createCTA</Code>,
	subNav: [
		createCTAExampleConfig,
		createCTAParametersConfig,
		createCTAReturnValuesConfig,
	],
};
