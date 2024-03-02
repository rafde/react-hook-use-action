import type { CTAInitial, } from './CTAInitial';

export type UseCTAReturnTypeState<Initial extends CTAInitial> = {
	readonly changes: Partial<Initial> | null,
	readonly current: Initial,
	readonly initial: Initial,
	readonly previous: Initial,
}
