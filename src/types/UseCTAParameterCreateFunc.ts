import type { CTAState, } from './CTAState';
import { DispatchCTA, } from './DispatchCTA';
import { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFuncReturnRecord';

export type UseCTAParameterCreateFunc<
	Initial extends CTAState,
	Action,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnType,
> = ( dispatch: DispatchCTA<Initial, Action, ReturnType> ) => FR;
