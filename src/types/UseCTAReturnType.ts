import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
> = [
	CTAHistory<Initial>, // current state
	UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>, // dispatcher
];
