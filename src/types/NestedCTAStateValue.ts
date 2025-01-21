import type { CTAState, } from './CTAState';
import type { NestedKeys, } from './NestedKeys';
import type { NestedPartial, } from './NestedPartial';
import type { NestedValue, } from './NestedValue';

export type NestedCTAStateValue<
	State extends CTAState,
	K extends NestedKeys<State>,
> = NestedValue<State, K> extends Record<
	string | number | symbol,
	unknown
> ? NestedPartial<NestedValue<State, K>>
	: NestedValue<State, K>;
