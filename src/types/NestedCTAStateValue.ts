import type { CTAState, } from './CTAState';
import type { NestedKeys, } from './NestedKeys';
import type { NestedValue, } from './NestedValue';

export type NestedCTAStateValue<T extends CTAState, K extends NestedKeys<T>,> = NestedValue<T, K>;
