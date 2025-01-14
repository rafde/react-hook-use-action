import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';

import { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFuncReturnRecord';
import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type CTASelector<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	SelectorReturn,
> = ( params: CTAHistory<Initial> & {
	dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>
} ) => SelectorReturn;
