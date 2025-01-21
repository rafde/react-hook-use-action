import type { CTAState, } from './CTAState';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';

/**
 * Options for configuring action type behavior
 * @prop {boolean} [useDefault=] - When true, bypasses the use of an overridden action.
 */
export type ActionTypeOptions = {
	useDefault?: boolean
};
export type ActionTypeConstructParam<
	Payload extends CTAState,
	Type extends keyof DefaultActionsRecord<Payload>,
> = {
	actionTypeOptions?: ActionTypeOptions
	hasAugmentedAction: boolean
	payload: Parameters<DefaultActionsRecord<Payload>[Type]>[1]
	type: Type
};
