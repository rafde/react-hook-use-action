import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CTAHistory, } from './types/CTAHistory';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsOptionalRecordProp, } from './types/UseCTAParameterActionsOptionalRecordProp';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';
import type { CreateCTAProps, } from './types/CreateCTAProps';

import { compareCallback, } from './internal/compareCallback';
import { createDispatchInterface, } from './internal/createDispatchInterface';
import ctaReducer, { CTAReducerState, } from './internal/ctaReducer';

/**
 * A `function` that provides a way to execute like {@link useCTA} but outside a React component.
 *
 * Useful if you want to handle {@link CTAHistory  state history} and dispatch using a 3rd party global state management system.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsOptionalRecordProp} Actions - The actions type.
 *
 * @param {CreateCTAProps} ctaParameter - {@link CreateCTAProps} parameter.
 * @returns {UseCTAReturnType} The CTA return type.
 */
export function createCTA<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsOptionalRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	ctaParameter: CreateCTAProps<Initial, ActionsRecord>,
): UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>> {
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
