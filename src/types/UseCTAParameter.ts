import type { CTAInitial, } from './CTAInitial';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
} : {
	actions: Actions
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
};
