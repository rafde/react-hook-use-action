import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';
import type { CustomCTAReturnType, } from '../types/CustomCTAReturnType';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import {
	ActionType,
	createUpdateInitialActionType,
	createResetActionType,
	createUpdateActionType,
	createReplaceActionType,
	createReplaceInitialActionType,
} from './ActionTypes';
import type { CompareCallbackReturnType, } from './compareCallback';

export type CTAReducerState<Initial extends CTAState,> = CTAHistory<Initial> & {
	changesMap: Map<string | number, unknown>
};

function _replace<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
	compare: CompareCallbackReturnType,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = new Map();
	let hasChange = false;
	for ( const key in payload ) {
		const value = payload[ key ];

		if ( !compare( current[ key ], value, key, ) ) {
			hasChange = true;
			if ( compare( initial[ key ], value, key, ) ) {
				continue;
			}
			changesMap.set( key, value, );
		}
	}

	if ( !hasChange ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: payload,
		previous: ctaReducerState.current,
	};
}

function _replaceInitial<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
	compare: CompareCallbackReturnType,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = new Map();
	let hasChange = false;
	for ( const key in payload ) {
		const value = payload[ key ];
		const currentValue = current[ key ];

		if ( !compare( initial[ key ], value, key, ) ) {
			hasChange = true;
			if ( compare( currentValue, value, key, ) ) {
				continue;
			}
			changesMap.set( key, currentValue, );
		}
	}

	if ( !hasChange ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		previousInitial: initial,
		initial: payload,
	};
}

function _updateInitialState<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
	compare: CompareCallbackReturnType,
): CTAReducerState<Initial> {
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;
	let hasUpdates = false;
	const next: Record<string, unknown> = {};

	for ( const key in payload ) {
		const value = payload[ key ];
		if ( compare( initial[ key as keyof Initial ], value, key, ) ) {
			continue;
		}

		next[ key ] = value;
		hasUpdates = true;

		const currentValue = current[ key as keyof Initial ];
		if ( compare( currentValue, value, key, ) ) {
			changesMap.delete( key, );
		}
		else {
			changesMap.set( key, currentValue, );
		}
	}

	if ( !hasUpdates ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial: {
			...initial,
			...next,
		},
		previousInitial: initial,
	};
}

function _updateState<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
	compare: CompareCallbackReturnType,
): CTAReducerState<Initial> {
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;
	let hasUpdates = false;
	const next: Record<string, unknown> = {};

	for ( const key in payload ) {
		const value = payload[ key ];
		if ( compare( current[ key as keyof Initial ], value, key, ) ) {
			continue;
		}

		next[ key ] = value;
		hasUpdates = true;

		const initialValue = initial[ key as keyof Initial ];
		if ( compare( initialValue, value, key, ) ) {
			changesMap.delete( key, );
		}
		else {
			changesMap.set( key, value, );
		}
	}

	if ( !hasUpdates ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: {
			...current,
			...next,
		},
		previous: current,
	};
}

function _resetState<Initial extends CTAState, >(
	ctaReducerState: CTAReducerState<Initial>,
	next: Initial,
	compare: CompareCallbackReturnType,
) {
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;

	let isNextSameAsInitial = true;
	let isNextSameAsCurrent = true;
	for ( const key in next ) {
		const value = next[ key as keyof Initial ];
		const currentValue = current[ key as keyof Initial ];
		const initialValue = initial[ key as keyof Initial ];

		if ( !compare( initialValue, value, key, ) ) {
			isNextSameAsInitial = false;
		}

		if ( !compare( currentValue, value, key, ) ) {
			isNextSameAsCurrent = false;
		}

		if ( !isNextSameAsInitial && !isNextSameAsCurrent ) {
			break;
		}
	}

	if ( isNextSameAsInitial && isNextSameAsCurrent ) {
		return ctaReducerState;
	}

	let previousInitial: CTAReducerState<Initial>['previousInitial'] = initial;
	if ( ctaReducerState.previousInitial === null && isNextSameAsInitial ) {
		previousInitial = null;
	}

	changesMap.clear();
	return {
		...ctaReducerState,
		changes: null,
		initial: next as Initial,
		current: next as Initial,
		previous: current,
		previousInitial,
	};
}

const predefinedActionsConst: Record<keyof DefaultActionsRecord<NonNullable<unknown>>, keyof DefaultActionsRecord<NonNullable<unknown>>> = {
	updateInitial: 'updateInitial',
	reset: 'reset',
	update: 'update',
	replace: 'replace',
	replaceInitial: 'replaceInitial',
} as const;

type PredefinedActions = keyof typeof predefinedActionsConst;

function typeResult<
	Initial extends CTAState,
	Type extends PredefinedActions,
	Next = Type extends 'update' ? Partial<Initial> : Initial,
>(
	param: {
		ctaReducerState: CTAReducerState<Initial>
		type: Type
		next: Next
		compare: CompareCallbackReturnType
	},
) {
	const {
		next,
		ctaReducerState,
	} = param;

	if ( next == null || Array.isArray( next, ) || next instanceof ActionType ) {
		return ctaReducerState;
	}

	const {
		type,
		compare,
	} = param;

	switch ( type ) {
		case 'replace':
			return _replace(
				ctaReducerState,
				next as Initial,
				compare,
			);
		case 'replaceInitial':
			return _replaceInitial(
				ctaReducerState,
				next as Initial,
				compare,
			);
		case 'reset':
			return _resetState(
				ctaReducerState,
				next as Initial,
				compare,
			);
		case 'updateInitial':
			return _updateInitialState(
				ctaReducerState,
				next,
				compare,
			);
		default:
			return _updateState(
				ctaReducerState,
				next,
				compare,
			);
	}
}

function getActionType<
	Initial extends CTAState,
>( ctaReturnType: CustomCTAReturnType<Initial>, ) {
	if ( ctaReturnType instanceof ActionType ) {
		const {
			type,
			nextState,
			actionTypeOptions,
		} = ctaReturnType;
		const useDefault = Boolean( actionTypeOptions?.useDefault, );

		if ( Array.isArray( nextState, ) ) {
			return;
		}

		const actionType = {
			next: nextState,
			type,
			useDefault,
		};

		if ( type === 'reset' ) {
			if ( typeof nextState === 'undefined' ) {
				return actionType;
			}

			if ( nextState == null ) {
				return;
			}

			return actionType;
		}

		if ( !nextState || typeof nextState !== 'object' ) {
			return;
		}

		return actionType;
	}

	if ( ctaReturnType && typeof ctaReturnType === 'object' ) {
		return {
			next: ctaReturnType as Partial<Initial>,
			type: 'update' as Extract<PredefinedActions, 'update'>,
			useDefault: false,
		};
	}
}

const _args: unknown[] = [];

export default function ctaReducer<
	Initial extends CTAState,
	Actions,
>( params: {
	ctaReducerState: CTAReducerState<Initial>
	actions?: UseCTAParameter<Initial, Actions>['actions']
	nextCTAProps: Parameters<DispatchCTA<Initial, Actions>>[0]
	compare: CompareCallbackReturnType
}, ): CTAReducerState<Initial> {
	const {
		args = _args,
		type: ctaType,
		payload,
	} = params.nextCTAProps;
	const {
		ctaReducerState,
		actions,
		compare,
	} = params;
	const {
		current,
		initial,
	} = ctaReducerState;
	const ctaState: CTAHistory<Initial> = {
		changes: ctaReducerState.changes,
		current,
		initial,
		previous: ctaReducerState.previous,
		previousInitial: ctaReducerState.previousInitial,
	};

	const isActionsObject = actions && typeof actions == 'object' && !Array.isArray( actions, );

	if ( ctaType in predefinedActionsConst && ( !isActionsObject || !( ctaType in actions ) ) ) {
		if ( payload instanceof Function ) {
			return typeResult( {
				ctaReducerState,
				next: payload( ctaState, ),
				type: ctaType as PredefinedActions,
				compare,
			}, );
		}

		if ( ctaType === 'reset' && typeof payload === 'undefined' ) {
			return typeResult( {
				ctaReducerState,
				next: initial,
				type: 'reset',
				compare,
			}, );
		}

		return typeResult( {
			ctaReducerState,
			next: payload,
			type: ctaType as PredefinedActions,
			compare,
		}, );
	}

	const cta = isActionsObject && actions![ ctaType as keyof typeof actions ];

	if ( typeof cta !== 'function' ) {
		return ctaReducerState;
	}

	let nextPayload: typeof payload | null = payload;
	if ( payload instanceof Function ) {
		const nextCTAPayloadResult = payload(
			ctaState,
		);

		if ( typeof nextCTAPayloadResult === 'undefined' ) {
			return ctaReducerState;
		}

		nextPayload = nextCTAPayloadResult;
	}

	if ( ctaType in predefinedActionsConst ) {
		const next = cta(
			ctaState,
			nextPayload,
			...args,
		);

		return typeResult( {
			ctaReducerState,
			next,
			type: ctaType as PredefinedActions,
			compare,
		}, );
	}

	const nextState = cta(
		{
			...ctaState,
			replaceAction: createReplaceActionType( actions, ),
			replaceInitialAction: createReplaceInitialActionType( actions, ),
			resetAction: createResetActionType( actions, ),
			updateAction: createUpdateActionType( actions, ),
			updateInitialAction: createUpdateInitialActionType( actions, ),
		},
		nextPayload,
		...args,
	);

	const actionType = getActionType<Initial>( nextState, );

	if ( !actionType ) {
		return ctaReducerState;
	}

	const {
		type,
		next,
	} = actionType;

	const customPredefinedCTA = isActionsObject && actions![ type as keyof typeof actions ];

	if ( actionType.useDefault || typeof customPredefinedCTA !== 'function' ) {
		return typeResult( {
			ctaReducerState,
			next,
			type,
			compare,
		}, );
	}

	return typeResult( {
		ctaReducerState,
		next: customPredefinedCTA( ctaState, next, ),
		type,
		compare,
	}, );
}
