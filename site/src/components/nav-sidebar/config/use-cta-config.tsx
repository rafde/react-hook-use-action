import { NavItem, } from './index';
import Code from '../../ui/code';
import { useCTAParameterActionsCustomConfig, } from './use-cta-parameter-actions-custom-config';
import { useCTAParameterActionsOverridableConfig, } from './use-cta-parameter-actions-override-built-in-config';
import { useCTAReturnValues1DispatchConfig, } from './use-cta-return-values-1-dispatch-config';

export const useCTABasicExampleConfig: NavItem = {
	desc: <>
		<Code>useCTA</Code>
		{' '}
		Basic Example
	</>,
	href: 'use-cta-basic-example',
	title: 'useCTA Basic Example',
	navTitle: 'Basic Example',
};
export const useCTAParameterInitialConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>initial</Code>
	</>,
	href: 'use-cta-parameter-initial',
	title: 'Parameter: initial',
};
export const useCTAParameterOnInitExampleConfig: NavItem = {
	desc: <>
		<Code>onInit</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-on-init-example',
	title: 'Parameter: onInit Example',
};
export const useCTAParameterOnInitConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>onInit</Code>
	</>,
	href: 'use-cta-parameter-on-init',
	subNav: [
		useCTAParameterOnInitExampleConfig,
	],
	title: 'Parameter: onInit',
};
export const useCTAParameterCompareExampleConfig: NavItem = {
	desc: <>
		<Code>compare</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-compare-example',
	title: 'Parameter: compare Example',
};
export const useCTAParameterCompareConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>compare</Code>
	</>,
	href: 'use-cta-parameter-compare',
	subNav: [
		useCTAParameterCompareExampleConfig,
	],
	title: 'Parameter: compare',
};
export const useCTAReturnValues0HistoryConfig: NavItem = {
	desc: <>
		<Code>useCTA return</Code>
		{' '}
		value
		{' '}
		<Code>[0]</Code>
		:
		{' '}
		<Code>history</Code>
	</>,
	href: 'use-cta-return-value-0-history',
	navTitle: <>
		<Code>[0]</Code>
		:
		{' '}
		<Code>history</Code>
	</>,
	title: 'Return value [0]: history',
};
export const useCTAReturnValuesConfig: NavItem = {
	desc: <>
		<Code>useCTA return</Code>
		{' '}
		values
	</>,
	navTitle: <>
		<Code>return</Code>
		{' '}
		values
	</>,
	href: 'use-cta-return-values',
	subNav: [
		useCTAReturnValues0HistoryConfig,
		useCTAReturnValues1DispatchConfig,
	],
	title: 'return values',
};
export const useCTAParameterActionsConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions',
	subNav: [
		useCTAParameterActionsOverridableConfig,
		useCTAParameterActionsCustomConfig,
	],
	title: 'Parameter: actions',
};
export const useCTAConfig: NavItem = {
	href: 'use-cta',
	subNav: [
		useCTABasicExampleConfig,
		useCTAParameterInitialConfig,
		useCTAParameterOnInitConfig,
		useCTAParameterCompareConfig,
		useCTAParameterActionsConfig,
		useCTAReturnValuesConfig,
	],
	title: 'useCTA',
	desc: <Code>useCTA</Code>,
};
