import type { CTAInitial, } from './CTAInitial';

export type CTAParam<Initial extends CTAInitial> = {
	readonly changes: Partial<Initial> | null,
	readonly initial: Initial,
	readonly previous: Initial,
}
