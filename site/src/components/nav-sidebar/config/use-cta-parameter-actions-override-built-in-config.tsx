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

export const useCTAParameterActionsOverridableParameterActionsUpdateConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions?.update</Code>
	</>,
	href: 'use-cta-parameter-actions-update',
	navTitle: <Code>actions?.update</Code>,
	title: 'Parameter: actions?.update',
};

export const useCTAParameterActionsOverridableParameterActionsReplaceConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions?.replace</Code>
	</>,
	href: 'use-cta-parameter-actions-replace',
	navTitle: <Code>actions?.replace</Code>,
	title: 'Parameter: actions?.replace',
};

export const useCTAParameterActionsOverridableParameterActionsResetConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions?.reset</Code>
	</>,
	href: 'use-cta-parameter-actions-reset',
	navTitle: <Code>actions?.reset</Code>,
	title: 'Parameter: actions?.reset',
};

export const useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions?.updateInitial</Code>
	</>,
	href: 'use-cta-parameter-actions-updateInitial',
	navTitle: <Code>actions?.updateInitial</Code>,
	title: 'Parameter: actions?.updateInitial',
};

export const useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions?.replaceInitial</Code>
	</>,
	href: 'use-cta-parameter-actions-replaceInitial',
	navTitle: <Code>actions?.replaceInitial</Code>,
	title: 'Parameter: actions?.replaceInitial',
};

export const useCTAParameterActionsOverridableConfig: NavItem = {
	desc: <>
		Overridable built-in
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable',
	subNav: [
		useCTAParameterActionsOverridableExampleConfig,
		useCTAParameterActionsOverridableParameterCTAHistoryConfig,
		useCTAParameterActionsOverridableParameterActionsUpdateConfig,
		useCTAParameterActionsOverridableParameterActionsReplaceConfig,
		useCTAParameterActionsOverridableParameterActionsResetConfig,
		useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig,
		useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig,
	],
	title: 'Overridable built-in actions',
};
