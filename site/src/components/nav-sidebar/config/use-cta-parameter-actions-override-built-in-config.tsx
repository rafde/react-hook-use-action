import Code from '../../ui/code';
import { NavItem, } from './index';

export const useCTAParameterActionsOverridableExampleConfig: NavItem = {
	desc: <>
		Overridable
		{' '}
		<Code>actions</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-actions-overridable-actions-example',
	title: 'Overridable actions Example',
};

export const useCTAParameterActionsOverridableParameterCTAHistoryConfig: NavItem = {
	desc: <>
		Overridable
		{' '}
		<Code>actions</Code>
		{' '}
		Parameter:
		{' '}
		<Code>CTAHistory</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable-parameter-cta-history',
	navTitle: <>
		Parameter:
		{' '}
		<Code>CTAHistory</Code>
	</>,
	title: 'Overridable actions Parameter: CTAHistory',
};
export const useCTAParameterActionsOverridableParameterPayloadConfig: NavItem = {
	desc: <>
		Overridable
		{' '}
		<Code>actions</Code>
		{' '}
		Parameter:
		{' '}
		<Code>payload</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable-parameter-cta-payload',
	navTitle: <>
		Parameter:
		{' '}
		<Code>payload</Code>
	</>,
	title: 'Overridable actions Parameter: payload',
};
export const useCTAParameterActionsOverridableReturnConfig: NavItem = {
	desc: <>
		Overridable
		{' '}
		<Code>actions</Code>
		{' '}
		<Code>return</Code>
		{' '}
		value
	</>,
	href: 'use-cta-parameter-actions-overridable-return-value',
	navTitle: <>
		<Code>return</Code>
		{' '}
		value
	</>,
	title: 'Overridable actions return value',
};
export const useCTAParameterActionsOverridableConfig: NavItem = {
	desc: <>
		Overridable
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable',
	subNav: [
		useCTAParameterActionsOverridableExampleConfig,
		useCTAParameterActionsOverridableParameterCTAHistoryConfig,
		useCTAParameterActionsOverridableParameterPayloadConfig,
		useCTAParameterActionsOverridableReturnConfig,
	],
	title: 'Overridable actions',
};
