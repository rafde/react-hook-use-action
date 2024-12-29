import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CTAHistory, } from './types/CTAHistory';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { CreateCTAProps, } from './types/CreateCTAProps';

import { compareCallback, } from './internal/compareCallback';
import { createDispatchInterface, } from './internal/createDispatchInterface';
import ctaReducer, { type CTAReducerState, } from './internal/ctaReducer';
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

/**
 * A `function` that provides a way to execute like {@link useCTA} but outside a React component.
 *
 * Useful if you want to handle {@link CTAHistory state history} and dispatch using a 3rd party global state management system.
 *
 * @template {CTAState} Initial - The `initial` state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {CreateCTAProps} ctaParameter - {@link CreateCTAProps} parameter.
 * @param {CTAState} ctaParameter.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 *
 * @param {UseCTAParameterCompare} [ctaParameter.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [ctaParameter.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {[CTAHistory, UseCTAReturnTypeDispatch]}  An `array` containing {@link CTAHistory} and {@link UseCTAReturnTypeDispatch} elements:
 *
 * 1. {@link CTAHistory} - An `object` representing the history of hook state changes.
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
 *
 * 2. {@link UseCTAReturnTypeDispatch} - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * An `function` that returns {@link CTAHistory} and contains the following properties:
 * - {@link CTAHistory history} - A read-only reference to {@link CTAHistory} object.
 *
 * - {@link UseCTAReturnTypeDispatchCTA cta} - Read-only reference `object` to access call-to-action dispatch `function`s.
 * All call-to-action dispatch `functions` return {@link CTAHistory}
 *
 * `cta.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 * - `cta.update( Partial<CTAState> )`
 * - `cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 * - `cta.replace( CTAState )`
 * - `cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 * - `cta.reset()` - Resets the `current` state back to the `initial` state.
 * - `cta.reset( CTAState )` - Synchronizes the `current` state with the `initial` state.
 * - `cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined )` - Synchronizes the `current` state with the `initial` state.
 * `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 * - `cta.updateInitial( Partial<CTAState> )`
 * - `cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 * - `cta.replaceInitial( CTAState )`
 * - `cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 * - `cta.YourCustomAction( ...args )`
 */
export function createCTA<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	ctaParameter: CreateCTAProps<Initial, ActionsRecord>,
): [
		CTAHistory<Initial>,
		UseCTAReturnTypeDispatch<Initial, ActionsRecord, CTAHistory<Initial>>,
	] {
	const {
		initial,
	} = ctaParameter;
	const actions = typeof ctaParameter.actions === 'undefined'
		? undefined
		: {
			...ctaParameter.actions,
		};
	let history: CTAHistory<Initial> = {
		changes: null,
		current: initial,
		initial,
		previous: null,
		previousInitial: null,
	};
	let ctaReducerState: CTAReducerState<Initial> = {
		...history,
		changesMap: new Map(),
	};
	const compare = compareCallback( ctaParameter.compare, );

	const ctaCallback = createDispatchInterface<
		Initial,
		ActionsRecord,
		CTAHistory<Initial>
	>(
		function _ctaCallback( nextCTAProps: Parameters<typeof ctaReducer<Initial, ActionsRecord>>[0]['nextCTAProps'], ) {
			const newCtaReducerState = ctaReducer<Initial, ActionsRecord>( {
				actions,
				compare,
				ctaReducerState,
				nextCTAProps,
			}, );

			if ( newCtaReducerState !== ctaReducerState ) {
				ctaReducerState = newCtaReducerState;
				history = {
					changes: ctaReducerState.changes,
					current: ctaReducerState.current,
					initial: ctaReducerState.initial,
					previous: ctaReducerState.previous,
					previousInitial: ctaReducerState.previousInitial,
				};
			}

			ctaCallback.history = history;
			return history;
		},
		actions,
	);

	ctaCallback.history = history;

	return [
		history,
		ctaCallback,
	];
}
