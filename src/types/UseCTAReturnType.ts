import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions,
> = [
	Initial, // current state
	UseCTAReturnTypeDispatch<Initial, Actions>, // dispatcher
];
