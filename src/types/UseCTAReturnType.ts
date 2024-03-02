import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import type { UseCTAReturnTypeState, } from './UseCTAReturnTypeState';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = [
	UseCTAReturnTypeState<Initial>,
	UseCTAReturnTypeDispatch<Initial, Actions>,
]
