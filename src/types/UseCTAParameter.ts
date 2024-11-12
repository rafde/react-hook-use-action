import { strictDeepEqual, } from 'fast-equals';
import type { CTAInitial, } from './CTAInitial';

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
	compare?: ( ( a: unknown, b: unknown, cmp: typeof strictDeepEqual ) => boolean )
} : {
	actions: Actions
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
	compare?: ( ( a: unknown, b: unknown, cmp: typeof strictDeepEqual ) => boolean )
};
