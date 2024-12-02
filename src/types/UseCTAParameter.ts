import { strictDeepEqual, } from 'fast-equals';
import type { CTAInitial, } from './CTAInitial';

type OnInitCallback<Initial,> = ( initial: Initial ) => Initial;

type CompareCallback = ( a: unknown, b: unknown, cmp: typeof strictDeepEqual ) => boolean;

export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	initial: Initial
	onInit?: OnInitCallback<Initial>
	compare?: CompareCallback
} : {
	actions: Actions
	initial: Initial
	onInit?: OnInitCallback<Initial>
	compare?: CompareCallback
};
