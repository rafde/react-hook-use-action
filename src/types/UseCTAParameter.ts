import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = {
	actions?: Actions,
	initial: Initial,
	onInit?: ( ( initial: Initial ) => Initial )
}
