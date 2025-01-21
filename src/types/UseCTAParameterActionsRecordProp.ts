import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';

import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { NestedPartial, } from './NestedPartial';

/**
 * `object` type for defining custom and/or overridden state management actions. It gives you access to the following capabilities:
 * - Gives you a clean, type-safe way to encapsulate your state logic while keeping your component code focused on presentation.
 * - Maintains full TypeScript type safety.
 * - Defines reusable state operations.
 * - Can be called via dispatch.cta or dispatch
 * - Can override the built-in actions.
 * - Custom actions can:
 *    - accept multiple parameters.
 *    - access all built-in actions.
 *
 * @template {string | number} p - Placeholder for custom action key.
 *
 * @template {CTAState} Payload - Extended {@link CTAState} hook state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['deepUpdate']} [updateDeep]
 * - Partially updates deeply merges properties in {@link CTAHistory}.`current` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['update']} [update]
 * - Partially updates properties in {@link CTAHistory}.`current` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAHistory>['replace']} [replace]
 * - Replaces all properties in {@link CTAHistory}.`current` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['reset']} [reset]
 * - Resets the {@link CTAHistory}.`current` state to {@link CTAHistory}.`initial` state
 * <b>or</b> replaces {@link CTAHistory}.`initial` and {@link CTAHistory}.`current` state when a {@link CTAState Payload} is provided.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['deepUpdateInitial']} [updateInitialDeep]
 * - Partially updates deeply merges properties in {@link CTAHistory}.`initial` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['updateInitial']} [updateInitial]
 * - Partially updates properties in {@link CTAHistory}.`initial` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['replaceInitial']} [replaceInitial]
 * - Replaces all properties in {@link CTAHistory}.`initial` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['p']} [p]
 * - Custom action key `p` can be a `string` or a `number`. This is a powerful way to extend
 * the functionality of your state management system. This gives you the flexibility to:
 * - Create domain-specific actions
 * - Encapsulate complex state updates
 * - Build reusable action patterns
 * - Handle specialized business logic
 *
 * They are defined as Records of functions that accepts 0 to any number of parameters.
 */
export type UseCTAParameterActionsRecordProp<
	State extends CTAState,
> = {
	deepUpdate?: <
		Payload extends NestedPartial<State>,
		Output extends NestedPartial<State>,
	>(
		ctaHistory: CTAHistory<State>,
		payload: Payload
	) => Output | Payload | ( Output & Payload ) | undefined
	deepUpdateInitial?: <
		Payload extends NestedPartial<State>,
		Output extends NestedPartial<State>,
	>(
		ctaHistory: CTAHistory<State>,
		payload: Payload
	) => Output | Payload | ( Output & Payload ) | undefined
	replace?: (
		ctaHistory: CTAHistory<State>,
		payload: State
	) => State | undefined
	replaceInitial?: (
		ctaHistory: CTAHistory<State>,
		payload: State
	) => State | undefined
	reset?: (
		ctaHistory: CTAHistory<State>,
		payload?: State
	) => State | undefined
	update?: (
		ctaHistory: CTAHistory<State>,
		payload: Partial<State>
	) => Partial<State> | undefined
	updateInitial?: (
		ctaHistory: CTAHistory<State>,
		payload: Partial<State>
	) => Partial<State> | undefined
}
	&
{
	[p: string | number]: undefined
		| ( (
			ctaState: CustomCTAHistory<State>,
			...args: never[]
		) => CustomCTAReturnType<State> )
};
