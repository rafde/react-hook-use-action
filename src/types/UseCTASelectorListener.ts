import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameterFuncRecord, } from './UseCTAParameterFunc';
import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTASelectorListener<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterFuncRecord,
	ReturnType,
	SelectorReturn,
> = ( params: CTAHistory<Initial> & {
	dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnType>
} ) => SelectorReturn;
