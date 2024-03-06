import type { CTAInitial, } from './CTAInitial';

export type CTAParam<Initial extends CTAInitial> = {
	readonly changes: Readonly<Partial<Initial>> | null,
	readonly initial: Readonly<Initial>,
	readonly previous: Readonly<Initial>
}
