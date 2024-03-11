import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeDispatchState, } from './UseCTAReturnTypeDispatch';

export type UseCTAParameterActionsPredefinedRecord<Initial extends CTAInitial,> = {
	replace?: ( ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Initial ) => Initial | undefined
	replaceInitial?: ( ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Initial ) => Initial | undefined
	reset?: ( ctaState: UseCTAReturnTypeDispatchState<Initial>, payload?: Initial ) => Initial | undefined
	update?: ( ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Partial<Initial> ) => Partial<Initial> | undefined
};
