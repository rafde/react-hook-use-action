import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeDispatch, UseCTAReturnTypeDispatchState, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions = undefined
> = [
	UseCTAReturnTypeDispatchState<Initial>['current'],
	UseCTAReturnTypeDispatch<Initial, Actions>,
]
