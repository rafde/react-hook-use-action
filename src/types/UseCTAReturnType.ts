import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import type { UseCTAReturnTypeState, } from './UseCTAReturnTypeState';

export type UseCTAReturnType<Initial, Actions = undefined> = [
	UseCTAReturnTypeState<Initial>,
	UseCTAReturnTypeDispatch<Initial, Actions>,
]
