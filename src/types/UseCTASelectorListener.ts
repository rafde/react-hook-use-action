import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameterFuncRecord, } from './UseCTAParameterFunc';
import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTASelectorListener<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterFuncRecord,
	SelectorReturn,
> = ( params: CTAHistory<Initial> & {
	dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>
} ) => SelectorReturn;
