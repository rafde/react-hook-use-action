import Code from '../../ui/code';
import { NavItem, } from './index';

export const exportTypesCTAStateConfig: NavItem = {
	desc: <Code>CTAState</Code>,
	href: 'export-type-cta-state',
	title: 'export type CTAState',
};
export const exportTypesUseCTAParameterCompareConfig: NavItem = {
	desc: <Code>UseCTAParameterCompare</Code>,
	href: 'export-type-use-cta-parameter-compare',
	title: 'export type UseCTAParameterCompare',
};
export const exportTypesUseCTAReturnTypeConfig: NavItem = {
	desc: <Code>UseCTAReturnType</Code>,
	href: 'export-type-use-cta-return-type',
	title: 'export type UseCTAReturnType',
};
export const exportTypesUseCTAReturnTypeDispatchConfig: NavItem = {
	desc: <Code>UseCTAReturnTypeDispatch</Code>,
	href: 'export-type-use-cta-return-type-dispatch',
	title: 'export type UseCTAReturnTypeDispatch',
};

export const exportTypesConfig: NavItem = {
	desc: <>
		<Code>export type</Code>
		s
	</>,
	href: 'export-types',
	subNav: [
		exportTypesCTAStateConfig,
		exportTypesUseCTAParameterCompareConfig,
		exportTypesUseCTAReturnTypeConfig,
		exportTypesUseCTAReturnTypeDispatchConfig,
	],
	title: 'export types',
};
