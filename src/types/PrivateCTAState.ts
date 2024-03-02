import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeState, } from './UseCTAReturnTypeState';

export type PrivateCTAState<Initial extends CTAInitial> = UseCTAReturnTypeState<Initial> & {
	changesMap: Map<string | number, unknown>,
};
