import type { CTAInitial, } from './CTAInitial';
import type { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
> = {
	actions?: Actions
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
};
