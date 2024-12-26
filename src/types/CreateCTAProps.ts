import type { CTAState, } from './CTAState';
import { UseCTAParameterCompare, } from './UseCTAParameterCompare';

export type CreateCTAProps<
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
