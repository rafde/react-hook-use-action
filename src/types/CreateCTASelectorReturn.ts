import { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameterFuncRecord, } from './UseCTAParameterFunc';
import { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import { UseCTASelectorListener, } from './UseCTASelectorListener';

export type CreateCTASelectorReturn<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterFuncRecord,
	ReturnType,
> = ( <SelectorReturn,>( selector: UseCTASelectorListener<Initial, Actions, FR, ReturnType, SelectorReturn> ) => SelectorReturn ) & {
	dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnType>
	getHistory: () => CTAHistory<Initial>
};
