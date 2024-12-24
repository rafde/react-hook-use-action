import type { CTAState, } from '../types/CTAState';
import { UseCTAParameterCompare, } from '../types/UseCTAParameterCompare';

export type CreateCTACallbackProps<
	Initial extends CTAState,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	compare?: UseCTAParameterCompare<Initial>
} : {
	actions: Actions
	initial: Initial
	compare?: UseCTAParameterCompare<Initial>
};
