import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions = undefined,
> = [
	Initial,
	UseCTAReturnTypeDispatch<Initial, Actions>,
];
