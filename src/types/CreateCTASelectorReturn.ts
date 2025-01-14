import { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';

import { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFuncReturnRecord';
import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import { CTASelector, } from './CTASelector';

export type CreateCTASelectorReturn<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
> = ( <SelectorReturn,>( selector: CTASelector<Initial, Actions, FR, SelectorReturn> ) => SelectorReturn ) & {
	dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>
	getHistory: () => CTAHistory<Initial>
};
