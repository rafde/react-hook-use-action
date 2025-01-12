import type { CTAState, } from './CTAState';
import { UseCTADispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAParameterFuncRecord = Record<string | number, ( ...args: never[] ) => unknown >;
export type UseCTAParameterCreateFunc<
	Initial extends CTAState,
	Action,
	FR extends UseCTAParameterFuncRecord,
	ReturnType,
> = ( dispatch: UseCTADispatch<Initial, Action, ReturnType> ) => FR;
