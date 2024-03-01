import { CTAParam, } from './CTAParam';

export type CTARecord<Initial> = {
	[customAction: string | number]: (
		ctaParam: CTAParam<Initial>,
		// Needs to be any in order to take any param.
		payload?: any // eslint-disable-line
	) => Partial<Initial> | undefined
} & {
	replace?: ( ctaParam: CTAParam<Initial>, payload: Initial ) => Initial | undefined,
	replaceInitial?: ( ctaParam: CTAParam<Initial>, payload: Initial ) => Initial | undefined,
	reset?: ( ctaParam: CTAParam<Initial>, payload?: Initial ) => Initial | undefined,
	update?: ( ctaParam: CTAParam<Initial>, payload: Partial<Initial> ) => Partial<Initial> | undefined,
};
