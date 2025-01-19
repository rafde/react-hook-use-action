import type { CTAState, } from './CTAState';
import type { Dispatch, } from './UseCTAReturnTypeDispatch';

export type DispatchParameterTypes<
	Payload extends CTAState,
	Actions,
	ReturnValue,
> = Parameters<Dispatch<Payload, Actions, ReturnValue>>[0];
