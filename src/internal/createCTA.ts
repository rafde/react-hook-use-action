import { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { compareCallback, } from './compareCallback';
import { CreateCTACallbackProps, } from './CreateCTACallbackProps';
import { createDispatchInterface, } from './createDispatchInterface';
import ctaReducer, { CTAReducerState, } from './ctaReducer';

export function createCTA<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	useCTAParameter: CreateCTACallbackProps<Initial, ActionsRecord>,
): UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>> {
	const {
		initial,
	} = useCTAParameter;
	const actions = typeof useCTAParameter.actions === 'undefined'
		? undefined
		: {
			...useCTAParameter.actions,
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
	const compare = compareCallback( useCTAParameter.compare, );

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
