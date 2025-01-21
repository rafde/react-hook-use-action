import type {
	DeepUpdateActionType,
} from '../internal/ActionTypes';
import type { ActionTypeConstructParam, ActionTypeOptions, } from './ActionTypeConstructParam';
import type { CTAState, } from './CTAState';
import type { NestedArrayValue, } from './NestedArrayValue';
import type { NestedCTAStateValue, } from './NestedCTAStateValue';
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
		value: NestedCTAStateValue<Payload, K>,
		actionTypeOptions?: ActionTypeOptions,
	): DeepUpdateActionType<Payload>
	deepUpdateAction<K extends NestedKeyArray<Payload>,>(
		key: K,
		value: NestedArrayValue<Payload, K> extends Record<
				string | number | symbol,
			unknown
		> ? NestedPartial<NestedArrayValue<Payload, K>>
			: NestedArrayValue<Payload, K>,
		actionTypeOptions?: ActionTypeOptions,
	): DeepUpdateActionType<Payload>
};
