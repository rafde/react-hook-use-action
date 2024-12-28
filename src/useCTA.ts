import { useMemo, } from 'react';

import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsOptionalRecordProp, } from './types/UseCTAParameterActionsOptionalRecordProp';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './types/CTAHistory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './types/UseCTAParameterOnInit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';

/**
 * A React hook for managing complex state with custom actions, history tracking, and type safety.
 * <b>Features</b>:
 * - Type-safe state management
 * - Initial state management
 * - Flexible and customizable actions for state management
 * - Built-in state history tracking
 * - Built-in state management action types
 *
 * @template {CTAState} Initial
 *
 * @template {UseCTAParameterActionsOptionalRecordProp<Initial> | undefined} Actions
 *
 * @param {UseCTAParameter | undefined} useCTAParameter
 * - Parameter {@link UseCTAParameter} for the useCTA.
 *
 * @param {UseCTAParameter<CTAState, UseCTAParameterActionsOptionalRecordProp<CTAState> | undefined>['initial']} useCTAParameter.initial
 * - Representing the {@link CTAHistory}.`initial` state structure.
 * This serves as the base state to compare {@link CTAHistory} .`changes` against {@link CTAHistory}.`current` state.
 * Can be used `reset` {@link CTAHistory}.`current` to {@link CTAHistory}.`initial` state.
 *
 * @param {UseCTAParameter<CTAState, UseCTAParameterActionsOptionalRecordProp<CTAState> | undefined>['onInit']} useCTAParameter.onInit
 * - Optional {@link UseCTAParameterOnInit} `function` type for handling {@link CTAHistory}.`initial` on component mount.
 *
 * @param {UseCTAParameter<CTAState, UseCTAParameterActionsOptionalRecordProp<CTAState> | undefined>['compare']} useCTAParameter.compare
 * - Optional {@link UseCTAParameterCompare} `function` type for custom equality logic by comparing only specific properties to optimize re-renders.
 *
 * @param {UseCTAParameter<CTAState, UseCTAParameterActionsOptionalRecordProp<CTAState> | undefined>['actions']} useCTAParameter.actions
 * - Optional {@link UseCTAParameterActionsOptionalRecordProp} `object` type to define custom and/or overridden actions for state management.
 *
 * @returns {[CTAHistory, UseCTAReturnTypeDispatch]} A {@link UseCTAReturnType} array containing the following elements:
 * 1. {@link CTAHistory} - An `object` representing the history of hook state changes.
 * 2. {@link UseCTAReturnTypeDispatch} - An `function` containing the following properties:
 *    - `cta` - An `object` containing the following properties:
 *    - {@link CTAHistory history} - A read-only reference to {@link CTAHistory} object,
 * in case you need to read it from somewhere that doesn't need as a dependency.
 */
export function useCTA<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsOptionalRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	useCTAParameter: UseCTAParameter<Initial, ActionsRecord>,
): UseCTAReturnType<Initial, ActionsRecord> {
	const actions = useMemo(
		() => {
			if ( useCTAParameter.actions && typeof useCTAParameter.actions === 'object' ) {
				return {
					...useCTAParameter.actions,
				};
			}

			return useCTAParameter.actions;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const stateDispatcher = usePrivateCTA<Initial, ActionsRecord>( useCTAParameter, actions, );
	return usePublicCTA( {
		actions,
		stateDispatcher,
	}, );
}
