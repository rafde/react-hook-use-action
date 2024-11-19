import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions,
	ReturnValue = void,
> = [
	CTAState<Initial>, // current state
	UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>, // dispatcher
];
