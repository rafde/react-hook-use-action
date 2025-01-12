import Code from '../../ui/code';
import { NavItem, } from './index';

export const createCTASelectorExampleConfig: NavItem = {
	desc: <>
		<Code>createCTASelector</Code>
		{' '}
		Example
	</>,
	href: 'create-cta-selector-example',
	title: 'createCTASelector Example',
};

export const createCTASelectorParametersConfig: NavItem = {
	desc: <>
		<Code>createCTASelector</Code>
		{' '}
		Parameters
	</>,
	href: 'create-cta-selector-parameters',
	navTitle: 'Parameters',
	title: 'createCTASelector Parameters',
};

export const useCTASelectorParameterConfig: NavItem = {
	desc: <>
		<Code>useCTASelector</Code>
		{' '}
		Parameter:
		<Code>selector</Code>
	</>,
	href: 'use-cta-selector-parameter-selector',
	navTitle: <>
		Parameter:
		<Code>selector</Code>
	</>,
	title: 'useCTASelector parameter selector',
};

export const useCTASelectorReturnConfig: NavItem = {
	desc: <>
		<Code>useCTASelector</Code>
		{' '}
		<Code>return</Code>
	</>,
	href: 'useCTASelector return',
	navTitle: <Code>return</Code>,
	title: 'useCTASelector return',
};

export const createCTASelectorReturnUseCTASelectorConfig: NavItem = {
	desc: <>
		<Code>createCTASelector</Code>
		{' '}
		<Code>return useCTASelector</Code>
	</>,
	href: 'create-cta-selector-return-use-cta-selector',
	navTitle: <>
		<Code>return useCTASelector</Code>
	</>,
	title: 'createCTASelector return useCTASelector',
	subNav: [
		useCTASelectorParameterConfig,
		useCTASelectorReturnConfig,
	],
};

export const createCtaSelectorConfig: NavItem = {
	desc: <Code>createCTASelector</Code>,
	href: 'create-cta-selector',
	title: 'createCTASelector',
	subNav: [
		createCTASelectorExampleConfig,
		createCTASelectorParametersConfig,
		createCTASelectorReturnUseCTASelectorConfig,
	],
};
