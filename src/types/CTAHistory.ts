import type { CTAState, } from './CTAState';

export type CTAHistory<Initial extends CTAState,> = Readonly<{
	current: Readonly<Initial>
	previous: Readonly<Initial> | null
	changes: Readonly<Partial<Initial>> | null
	initial: Readonly<Initial>
	previousInitial: Readonly<Initial> | null
}>;
