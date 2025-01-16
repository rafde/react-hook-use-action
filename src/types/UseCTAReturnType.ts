import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFunc';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

/**
 * The return type of the useCTA hook.
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-values useCTA return values}
 * @property {CTAHistory} 0 - The {@link CTAHistory} object.
 * @property {UseCTAReturnTypeDispatch} 1 - The {@link UseCTAReturnTypeDispatch} object.
 */
export type UseCTAReturnType<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnValue,
> = [
	CTAHistory<Initial>, // hook state history
	UseCTAReturnTypeDispatch<
		Initial,
		Actions,
		FR,
		ReturnValue
	>, // dispatcher
];
