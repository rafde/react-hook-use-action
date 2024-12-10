import Code from '../../ui/code';
import { NavItem, } from './index';

export const useCtaParameterActionsCustomExampleConfig: NavItem = {
	desc: <>
		Custom
		{' '}
		<Code>actions</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-actions-custom-example',
	title: 'Custom actions Example',
};

export const useCTAParameterActionsParameterCustomCTAHistoryConfig: NavItem = {
	desc: <>
		Custom
		{' '}
		<Code>action</Code>
		{' '}
		Parameter:
		{' '}
		<Code>CustomCTAHistory</Code>
	</>,
	href: 'use-cta-parameter-actions-custom-cta-history',
	navTitle: <>
		Parameter:
		{' '}
		<Code>CustomCTAHistory</Code>
	</>,
	title: 'Custom action Parameter: CustomCTAHistory',
};
export const useCTAParameterActionsParameterCustomParametersArgsConfig: NavItem = {
	desc: <>
		Custom
		{' '}
		<Code>action</Code>
		{' '}
		Parameters:
		{' '}
		<Code>...args</Code>
	</>,
	href: 'use-cta-parameter-actions-custom-parameters-args',
	navTitle: <>
		Parameters:
		{' '}
		<Code>...args</Code>
	</>,
	title: 'Custom action Parameters: ...args',
};
export const useCTAParameterActionsCustomReturnConfig: NavItem = {
	desc: <>
		Custom
		{' '}
		<Code>action</Code>
		{' '}
		<Code>return</Code>
		{' '}
		value
	</>,
	href: 'use-cta-parameter-actions-custom-return',
	navTitle: <>
		<Code>return</Code>
		{' '}
		value
	</>,
	title: 'Custom actions return value',
};
export const useCTAParameterActionsCustomConfig: NavItem = {
	desc: <>
		Custom
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions-custom',
	subNav: [
		useCtaParameterActionsCustomExampleConfig,
		useCTAParameterActionsParameterCustomCTAHistoryConfig,
		useCTAParameterActionsParameterCustomParametersArgsConfig,
		useCTAParameterActionsCustomReturnConfig,
	],
	title: 'Custom actions',
};
