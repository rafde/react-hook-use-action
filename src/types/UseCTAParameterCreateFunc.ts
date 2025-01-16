import type { CTAState, } from './CTAState';
import type { DispatchCTA, } from './DispatchCTA';

export type UseCTAParameterCreateFuncReturnRecord = Record<
	string | number,
	( ...args: never[] ) => unknown
>;

export type UseCTAParameterCreateFunc<
	Initial extends CTAState,
	Action,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnType,
> = ( dispatch: DispatchCTA<Initial, Action, ReturnType> ) => FR;
