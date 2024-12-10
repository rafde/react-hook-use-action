import Code from '../../ui/code';
import { NavItem, } from './index';

export const createCTAContextReturnValueConfig: NavItem = {
	desc: <>
		<Code>createCTAContext</Code>
		{' '}
		<Code>return</Code>
		{' '}
		value
	</>,
	href: 'create-cta-context-return-value',
	navTitle: <>
		<Code>return</Code>
		{' '}
		value
	</>,
	title: 'Return Value',
};

export const createCTAContextParametersConfig: NavItem = {
	desc: <>
		<Code>createCTAContext</Code>
		{' '}
		Parameters
	</>,
	href: 'create-cta-context-parameters',
	navTitle: 'Parameters',
	title: 'Parameters',
};

export const createCTAContextExampleConfig: NavItem = {
	desc: <>
		<Code>createCTAContext</Code>
		{' '}
		Example
	</>,
	href: 'create-cta-context-example',
	title: 'createCTAContext Example',
};

export const createCTAContextConfig: NavItem = {
	desc: <Code>createCTAContext</Code>,
	href: 'create-cta-context',
	subNav: [
		createCTAContextExampleConfig,
		createCTAContextParametersConfig,
		createCTAContextReturnValueConfig,
	],
	title: 'createCTAContext',
};
