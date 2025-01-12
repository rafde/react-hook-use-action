import type { CTAState, } from './CTAState';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAParameterFuncRecord = Record<string | number, ( ...args: never[] ) => unknown >;
export type UseCTAParameterCreateFunc<
	Initial extends CTAState,
	Action,
	FR extends UseCTAParameterFuncRecord,
	ReturnType,
> = ( dispatch: UseCTAReturnTypeDispatch<Initial, Action, ReturnType> ) => FR;
