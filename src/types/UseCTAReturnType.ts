import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import { UseCTAReturnTypeState, } from './UseCTAReturnTypeState';

export type UseCTAReturnType<Initial, Actions = undefined> = [
	UseCTAReturnTypeState<Initial>,
	UseCTAReturnTypeDispatch<Initial, Actions>,
]
