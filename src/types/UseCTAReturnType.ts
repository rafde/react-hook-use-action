import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions,
> = [
	CTAState<Initial>, // current state
	UseCTAReturnTypeDispatch<Initial, Actions>, // dispatcher
];
