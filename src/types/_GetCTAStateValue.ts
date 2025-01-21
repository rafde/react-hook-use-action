import type { CTAState, } from './CTAState';
import type { NestedKeys, } from './NestedKeys';
import type { NestedPartial, } from './NestedPartial';
import type { GetPathValue, } from './GetPathValue';

export type _GetCTAStateValue<
	State extends CTAState,
	K extends NestedKeys<State>,
> = GetPathValue<State, K> extends Record<
	string | number | symbol,
	unknown
> ? NestedPartial<GetPathValue<State, K>>
	: GetPathValue<State, K>;
