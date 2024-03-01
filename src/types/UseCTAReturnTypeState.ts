import type { CTAParam, } from './CTAParam';

export type UseCTAReturnTypeState<Initial> = {
	readonly current: Initial,
} & CTAParam<Initial>;
