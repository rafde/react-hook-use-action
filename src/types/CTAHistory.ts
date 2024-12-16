import type { CTAState, } from './CTAState';

export type CTAHistory<Initial extends CTAState,> = Readonly<{
	initial: Readonly<Initial>
	previousInitial: Readonly<Initial> | null
	current: Readonly<Initial>
	previous: Readonly<Initial> | null
	changes: Readonly<Partial<Initial>> | null
}>;
