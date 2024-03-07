import type { CTAInitial, } from './CTAInitial';
import type { CTAParam, } from './CTAParam';

type UseCTAParameterPredefinedActionsRecord<Initial extends CTAInitial,> = {
	replace?: ( ctaParam: CTAParam<Initial>, payload: Initial ) => Initial | undefined
	replaceInitial?: ( ctaParam: CTAParam<Initial>, payload: Initial ) => Initial | undefined
	reset?: ( ctaParam: CTAParam<Initial>, payload?: Initial ) => Initial | undefined
	update?: ( ctaParam: CTAParam<Initial>, payload: Partial<Initial> ) => Partial<Initial> | undefined
};

type UseCTAParameterCustomActionsRecord<Initial extends CTAInitial,> = {
	[customAction: string | number]: ( (
		ctaParam: CTAParam<Initial>,
		// Needs to be `any` in order to take any type.
		payload?: any // eslint-disable-line
	) => Partial<Initial> | undefined )
};
export type UseCTAParameterActionsRecordProp<Initial extends CTAInitial,> = UseCTAParameterCustomActionsRecord<Initial> &
	UseCTAParameterPredefinedActionsRecord<Initial>;
