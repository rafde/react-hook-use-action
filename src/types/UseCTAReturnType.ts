import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';

import { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFuncReturnRecord';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

/**
 * The return type of the useCTA hook.
 * @typedef {Array} UseCTAReturnType
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
	UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnValue>, // dispatcher
];
