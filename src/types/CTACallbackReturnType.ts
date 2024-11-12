import { CTAInitial, } from './CTAInitial';
import { CTAState, } from './CTAState';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';
import {
	CustomDispatchValueRecordValues,
	DefaultCTAProps,
	DispatchCTABaseDefaultRecord,
	DispatchCTAFlatUpdateRecord,
	DispatchCustomCTARecord,
} from './UseCTAReturnTypeDispatch';

type CTACallbackFunction<
	Initial extends CTAInitial,
	Actions,
> = ( value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial>, never> ) => CTAState<Initial>;

type CTACallbackBaseDefaultRecord<
	Initial extends CTAInitial,
> = DispatchCTABaseDefaultRecord<Initial, CTAState<Initial>> & DispatchCTAFlatUpdateRecord<Initial, CTAState<Initial>>;

export type CTACallbackReturnType<
	Initial extends CTAInitial,
	Actions,
> = CTACallbackFunction<Initial, Actions> & OmitEmptyRecord<
	CTACallbackBaseDefaultRecord<Initial> &
	DispatchCustomCTARecord<Initial, Actions, CTAState<Initial>>
>;
