import type { CTAState, } from '../types/CTAState';
import { CTAHistory, } from '../types/CTAHistory';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import { UseCTAParameterCompare, } from '../types/UseCTAParameterCompare';
import { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { DispatchCTADefaultRecord, UpdateCTAProps, } from '../types/UseCTAReturnTypeDispatch';
import { compareCallback, } from './compareCallback';
import ctaReducer, { CTAReducerState, } from './ctaReducer';

export function ctaCallback<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	useCTAParameter: ActionsRecord extends undefined ? {
		actions?: undefined
		initial: Initial
		compare?: UseCTAParameterCompare<Initial>
	} : {
		actions: ActionsRecord
		initial: Initial
		compare?: UseCTAParameterCompare<Initial>
	},
): UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>> {
	const {
		initial,
	} = useCTAParameter;
	const actions = typeof useCTAParameter.actions === 'undefined'
		? undefined
		: {
			...useCTAParameter.actions,
		};
	let state: CTAHistory<Initial> = {
		changes: null,
		current: initial,
		initial,
		previous: null,
		previousInitial: null,
	};
	let ctaReducerState: CTAReducerState<Initial> = {
		...state,
		changesMap: new Map(),
	};
	const compare = compareCallback( useCTAParameter.compare, );

	function _ctaCallback( nextCTAProps: Parameters<typeof ctaReducer<Initial, ActionsRecord>>[0]['nextCTAProps'], ) {
		const newCtaReducerState = ctaReducer<Initial, ActionsRecord>( {
			actions,
			compare,
			ctaReducerState,
			nextCTAProps,
		}, );

		if ( newCtaReducerState !== ctaReducerState ) {
			ctaReducerState = newCtaReducerState;
			state = {
				changes: ctaReducerState.changes,
				current: ctaReducerState.current,
				initial: ctaReducerState.initial,
				previous: ctaReducerState.previous,
				previousInitial: ctaReducerState.previousInitial,
			};
		}

		_ctaCallback.state = state;
		return state;
	}

	_ctaCallback.state = state;
	_ctaCallback.cta = {
		replace: payload => _ctaCallback( {
			payload,
			type: 'replace',
		}, ),
		replaceInitial: payload => _ctaCallback( {
			payload,
			type: 'replaceInitial',
		}, ),
		reset: payload => _ctaCallback( {
			payload,
			type: 'reset',
		}, ),
		update( payload, value, ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					return _ctaCallback( {
						payload: {
							[ payload ]: value as Initial[keyof Initial],
						},
						type: 'update',
					} as unknown as UpdateCTAProps<Initial>, );
				}
				default: {
					return _ctaCallback( {
						payload,
						type: 'update',
					} as unknown as UpdateCTAProps<Initial>, );
				}
			}
		},
		updateInitial: payload => _ctaCallback( {
			payload,
			type: 'updateInitial',
		}, ),
	} as DispatchCTADefaultRecord<Initial, CTAHistory<Initial>>;

	if ( actions == null || typeof actions !== 'object' ) {
		return [
			state,
			_ctaCallback as unknown as UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>>[1],
		];
	}

	const defaultCTARecord = _ctaCallback.cta;
	let hasCustomAction = false;
	const customActions = {} as Record<
		Exclude<keyof Exclude<Actions, undefined>, keyof DefaultActionsRecord<Initial>>,
		( payload?: unknown, ...args: unknown[] ) => void
	>;

	for ( const type in actions ) {
		if ( type in defaultCTARecord || typeof actions[ type ] !== 'function' ) {
			continue;
		}

		customActions[ type as unknown as keyof typeof customActions ] = ( payload?: unknown, ...args ) => _ctaCallback( {
			payload,
			type,
			args,
		} as Parameters<typeof ctaReducer<Initial, ActionsRecord>>[0]['nextCTAProps'], );

		hasCustomAction = true;
	}

	if ( hasCustomAction ) {
		Object.assign( _ctaCallback.cta, customActions, );
	}

	return [
		state,
		_ctaCallback as unknown as UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>>[1],
	];
}
