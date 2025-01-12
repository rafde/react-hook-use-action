import Code from '../../ui/code';
import { NavItem, } from './index';

export const useCTAReturnValues1DispatchCTAUpdateConfig: NavItem = {
	desc: <Code>dispatch.cta.update</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-update',
	title: 'dispatch.cta.update',
};
export const useCTAReturnValues1DispatchCTAReplaceConfig: NavItem = {
	desc: <Code>dispatch.cta.replace</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-replace',
	title: 'dispatch.cta.replace',
};
export const useCTAReturnValues1DispatchCTAResetConfig: NavItem = {
	desc: <Code>dispatch.cta.reset</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-reset',
	title: 'dispatch.cta.reset',
};
export const useCTAReturnValues1DispatchCTAUpdateInitialConfig: NavItem = {
	desc: <Code>dispatch.cta.updateInitial</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-updateInitial',
	title: 'dispatch.cta.updateInitial',
};
export const useCTAReturnValues1DispatchCTAReplaceInitialConfig: NavItem = {
	desc: <Code>dispatch.cta.replaceInitial</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-replaceInitial',
	title: 'dispatch.cta.replaceInitial',
};
export const useCTAReturnValues1DispatchCTACustomActionConfig: NavItem = {
	desc: <Code>dispatch.cta.YourCustomAction</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-custom-action',
	title: 'dispatch.cta.YourCustomAction',
};
export const useCTAReturnValuesDispatchHistoryConfig: NavItem = {
	desc: <Code>dispatch.history</Code>,
	href: 'use-cta-return-value-1-dispatch-history',
	title: 'dispatch.history',
};
export const useCTAReturnValuesDispatchFuncConfig: NavItem = {
	desc: <Code>dispatch.func</Code>,
	href: 'use-cta-return-value-1-dispatch-func',
	title: 'dispatch.func',
};
export const useCTAReturnValues1DispatchConfig: NavItem = {
	desc: <>
		<Code>useCTA return</Code>
		{' '}
		value
		{' '}
		<Code>[1]</Code>
		:
		{' '}
		<Code>dispatch</Code>
	</>,
	href: 'use-cta-return-value-1-dispatch',
	navTitle: <>
		<Code>[1]</Code>
		:
		{' '}
		<Code>dispatch</Code>
	</>,
	subNav: [
		useCTAReturnValues1DispatchCTAUpdateConfig,
		useCTAReturnValues1DispatchCTAReplaceConfig,
		useCTAReturnValues1DispatchCTAResetConfig,
		useCTAReturnValues1DispatchCTAUpdateInitialConfig,
		useCTAReturnValues1DispatchCTAReplaceInitialConfig,
		useCTAReturnValues1DispatchCTACustomActionConfig,
		useCTAReturnValuesDispatchHistoryConfig,
		useCTAReturnValuesDispatchFuncConfig,
	],
	title: 'Return value [1]: dispatch',
};
