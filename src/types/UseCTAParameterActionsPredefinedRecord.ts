import type { CTAInitial, } from './CTAInitial';
import { CTAStateParam, } from './CTAStateParam';

export type UseCTAParameterActionsPredefinedRecord<Initial extends CTAInitial,> = {
	replace?: ( ctaState: CTAStateParam<Initial>, payload: Initial ) => Initial | undefined
	replaceInitial?: ( ctaState: CTAStateParam<Initial>, payload: Initial ) => Initial | undefined
	reset?: ( ctaState: CTAStateParam<Initial>, payload?: Initial ) => Initial | undefined
	update?: ( ctaState: CTAStateParam<Initial>, payload: Partial<Initial> ) => Partial<Initial> | undefined
};
