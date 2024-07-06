import type { CTAInitial, } from './CTAInitial';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions,
> = {
	actions?: Actions
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
};
