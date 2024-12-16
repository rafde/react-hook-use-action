import { UseCTAParameterCompare, } from './UseCTAParameterCompare';
import type { CTAState, } from './CTAState';
import { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';

export type UseCTAParameter<
	Initial extends CTAState,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	onInit?: UseCTAParameterOnInit<Initial>
	compare?: UseCTAParameterCompare<Initial>
} : {
	actions: Actions
	initial: Initial
	onInit?: UseCTAParameterOnInit<Initial>
	compare?: UseCTAParameterCompare<Initial>
};
