import type {
	DeepUpdateActionType,
} from '../internal/ActionTypes';
import type { ActionTypeConstructParam, ActionTypeOptions, } from './ActionTypeConstructParam';
import type { CTAState, } from './CTAState';
import type { GetArrayValue, } from './GetArrayValue';
import type { GetCTAStateValue, } from './GetCTAStateValue';
import type { NestedKeyArray, } from './NestedKeyArray';
import type { NestedKeys, } from './NestedKeys';
import type { NestedPartial, } from './NestedPartial';

export type DeepUpdateActionRecord<Payload extends CTAState,> = {
	deepUpdateAction<P extends ActionTypeConstructParam<
		Payload,
		'deepUpdate'
	>['payload'], >(
		payload: P,
		actionTypeOptions?: ActionTypeOptions,
		_?: never
	): DeepUpdateActionType<Payload>
	deepUpdateAction<K extends NestedKeys<Payload>, >(
		key: K,
		value: GetCTAStateValue<Payload, K>,
		actionTypeOptions?: ActionTypeOptions,
	): DeepUpdateActionType<Payload>
	deepUpdateAction<K extends NestedKeyArray<Payload>,>(
		key: K,
		value: GetArrayValue<Payload, K> extends Record<
				string | number | symbol,
			unknown
		> ? NestedPartial<GetArrayValue<Payload, K>>
			: GetArrayValue<Payload, K>,
		actionTypeOptions?: ActionTypeOptions,
	): DeepUpdateActionType<Payload>
};
