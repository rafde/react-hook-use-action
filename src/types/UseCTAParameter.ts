import type { CTARecord, } from './CTARecord';

export type UseCTAParameter<
	Initial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = {
	actions?: Actions,
	initial: Initial,
	onInit?: ( ( initial: Initial ) => Initial )
}
