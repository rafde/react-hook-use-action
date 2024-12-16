import type { CTAInitial, } from './CTAInitial';

export type CTAHistory<Initial extends CTAInitial,> = Readonly<{
	initial: Readonly<Initial>
	previousInitial: Readonly<Initial> | null
	current: Readonly<Initial>
	previous: Readonly<Initial> | null
	changes: Readonly<Partial<Initial>> | null
}>;
