import type { CTAInitial, } from './CTAInitial';
import { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined
> = {
	actions?: Actions,
	initial: Initial,
	onInit?: ( ( initial: Initial ) => Initial )
}
