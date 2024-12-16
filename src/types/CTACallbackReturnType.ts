import { CTAInitial, } from './CTAInitial';
import { CTAHistory, } from './CTAHistory';
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
> = ( value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial>, never> ) => CTAHistory<Initial>;

type CTACallbackBaseDefaultRecord<
	Initial extends CTAInitial,
> = DispatchCTABaseDefaultRecord<Initial, CTAHistory<Initial>> & DispatchCTAFlatUpdateRecord<Initial, CTAHistory<Initial>>;

export type CTACallbackReturnType<
	Initial extends CTAInitial,
	Actions,
> = CTACallbackFunction<Initial, Actions> & OmitEmptyRecord<
	CTACallbackBaseDefaultRecord<Initial> &
	DispatchCustomCTARecord<Initial, Actions, CTAHistory<Initial>>
>;
