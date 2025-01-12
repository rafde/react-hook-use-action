import { NavItem, } from './index';
import Code from '../../ui/code';
import { useCTAParameterActionsCustomConfig, } from './use-cta-parameter-actions-custom-config';
import { useCTAParameterActionsOverridableConfig, } from './use-cta-parameter-actions-override-built-in-config';
import { useCTAParameterCreateFuncConfig, } from './use-cta-parameter-create-func-config';
import { useCTAReturnValues1DispatchConfig, } from './use-cta-return-values-1-dispatch-config';

export const useCTABasicExampleConfig: NavItem = {
	desc: <>
		<Code>useCTA</Code>
		{' '}
		Basic Example
	</>,
	href: 'use-cta-basic-example',
	title: 'useCTA Basic Example',
};

export const useCTAParameterInitialConfig: NavItem = {
	desc: <Code>props.initial</Code>,
	href: 'use-cta-parameter-initial',
	title: 'props.initial',
};
export const useCTAParameterOnInitExampleConfig: NavItem = {
	desc: <>
		<Code>props.onInit</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-on-init-example',
	title: 'props.onInit Example',
};
export const useCTAParameterOnInitConfig: NavItem = {
	desc: <Code>props.onInit</Code>,
	href: 'use-cta-parameter-on-init',
	subNav: [
		useCTAParameterOnInitExampleConfig,
	],
	title: 'props.onInit',
};
export const useCTAParameterCompareExampleConfig: NavItem = {
	desc: <>
		<Code>props.compare</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-compare-example',
	title: 'props.compare Example',
};
export const useCTAParameterCompareConfig: NavItem = {
	desc: <Code>props.compare</Code>,
	href: 'use-cta-parameter-compare',
	subNav: [
		useCTAParameterCompareExampleConfig,
	],
	title: 'props.compare',
};

export const useCTAParameterAfterActionChangeExampleConfig: NavItem = {
	desc: <>
		<Code>props.afterActionChange</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-after-action-change-example',
	title: 'props.afterActionChange Example',
};
export const useCTAAfterActionChangeParametersConfig: NavItem = {
	desc: <>
		<Code>props.afterActionChange</Code>
		{' '}
		Parameters
	</>,
	navTitle: 'Parameters',
	href: 'use-cta-after-action-change-parameters',
	title: 'props.afterActionChange parameters',
};

export const useCTAfterActionChangeReturnConfig: NavItem = {
	desc: <Code>props.afterActionChange return</Code>,
	href: 'use-cta-after-action-change-return',
	navTitle: <Code>return</Code>,
	title: 'props.afterActionChange return',
};
export const useCTAParameterAfterActionChangeConfig: NavItem = {
	desc: <Code>props.afterActionChange</Code>,
	href: 'use-cta-parameter-after-action-change',
	subNav: [
		useCTAParameterAfterActionChangeExampleConfig,
		useCTAAfterActionChangeParametersConfig,
		useCTAfterActionChangeReturnConfig,
	],
	title: 'props.afterActionChange',
};

export const useCTAParameterTransformExampleConfig: NavItem = {
	desc: <>
		<Code>props.transform</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-transform-example',
	title: 'props.transform Example',
};

export const useCTATransformReturnConfig: NavItem = {
	desc: <Code>props.transform return</Code>,
	href: 'use-cta-transform-return',
	navTitle: <Code>return</Code>,
	title: 'props.transform return',
};

export const useCTATransformParameterConfig: NavItem = {
	desc: <>
		<Code>props.transform</Code>
		{' '}
		Parameters
	</>,
	href: 'use-cta-transform-parameters',
	navTitle: 'Parameters',
	title: 'props.transform parameters',
};

export const useCTAParameterTransformConfig: NavItem = {
	desc: <Code>props.transform</Code>,
	href: 'use-cta-parameter-transform',
	subNav: [
		useCTAParameterTransformExampleConfig,
		useCTATransformParameterConfig,
		useCTATransformReturnConfig,
	],
	title: 'props.transform',
};

export const useCTAParameterActionsConfig: NavItem = {
	desc: <Code>props.actions</Code>,
	href: 'use-cta-parameter-actions',
	subNav: [
		useCTAParameterActionsOverridableConfig,
		useCTAParameterActionsCustomConfig,
	],
	title: 'props.actions',
};

export const useCTAParameterPropsConfig: NavItem = {
	desc: <>
		1st Parameter:
		{' '}
		<Code>props</Code>
	</>,
	href: 'use-cta-parameter-props',
	subNav: [
		useCTAParameterInitialConfig,
		useCTAParameterOnInitConfig,
		useCTAParameterCompareConfig,
		useCTAParameterTransformConfig,
		useCTAParameterAfterActionChangeConfig,
		useCTAParameterActionsConfig,
	],
	title: '1st Parameter: props',
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
	</>,
	href: 'use-cta-return-values',
	subNav: [
		useCTAReturnValues0HistoryConfig,
		useCTAReturnValues1DispatchConfig,
	],
	title: 'return',
};
export const useCTAConfig: NavItem = {
	href: 'use-cta',
	subNav: [
		useCTABasicExampleConfig,
		useCTAParameterPropsConfig,
		useCTAParameterCreateFuncConfig,
		useCTAReturnValuesConfig,
	],
	title: 'useCTA',
	desc: <Code>useCTA</Code>,
};
