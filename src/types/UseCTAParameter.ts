import { UseCTAParameterCompare, } from './UseCTAParameterCompare';
import type { CTAInitial, } from './CTAInitial';
import { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	onInit?: UseCTAParameterOnInit<Initial>
	compare?: UseCTAParameterCompare
} : {
	actions: Actions
	initial: Initial
	onInit?: UseCTAParameterOnInit<Initial>
	compare?: UseCTAParameterCompare
};
