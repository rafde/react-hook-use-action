import type { _GetCTAStateValue, } from './_GetCTAStateValue';
import type { CTAState, } from './CTAState';
import type { Mutable, } from './Mutable';
import type { NestedKeys, } from './NestedKeys';

export type GetCTAStateValue<
	State extends CTAState,
	K extends NestedKeys<State>,
> = Mutable<_GetCTAStateValue<State, K>>;
