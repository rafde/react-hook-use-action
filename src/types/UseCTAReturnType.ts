import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

/**
 * The return type of the useCTA hook.
 */
export type UseCTAReturnType<
	Initial extends CTAState,
	Actions,
> = [
	CTAHistory<Initial>, // hook state history
	UseCTAReturnTypeDispatch<Initial, Actions>, // dispatcher
];
