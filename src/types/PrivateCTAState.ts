import type { UseCTAReturnTypeState, } from './UseCTAReturnTypeState';

export type PrivateCTAState<Initial> = {
	changesMap: Map<string | number, unknown>,
} & UseCTAReturnTypeState<Initial>;
