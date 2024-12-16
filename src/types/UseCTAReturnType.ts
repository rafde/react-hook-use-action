import type { CTAInitial, } from './CTAInitial';
import type { CTAHistory, } from './CTAHistory';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions,
	ReturnValue = void,
> = [
	CTAHistory<Initial>, // current state
	UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>, // dispatcher
];
