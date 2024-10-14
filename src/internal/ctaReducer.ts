import { strictDeepEqual, } from 'fast-equals';

import type { CTAInitial, } from '../types/CTAInitial';
import type { CTAState, } from '../types/CTAState';
import type { CustomCTAReturnType, } from '../types/CustomCTAReturnType';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import {
	ActionType,
	createUpdateInitialActionType,
	createResetActionType,
	createUpdateActionType,
} from './ActionTypes';

export type CTAReducerState<Initial extends CTAInitial,> = CTAState<Initial> & {
	changesMap: Map<string | number, unknown>
};

function _resetCurrentChangesMap<Initial extends CTAInitial,>(
	state: Initial,
	initial: CTAReducerState<Initial>['initial'],
	changesMap: CTAReducerState<Initial>['changesMap'],
) {
	const checkedKeys: Record<string, boolean> = {};
	changesMap.clear();

	for ( const key in state ) {
		const value = state[ key ];
		checkedKeys[ key ] = true;

		if ( strictDeepEqual( initial[ key ], value, ) ) {
			changesMap.delete( key, );
			continue;
		}
		changesMap.set( key, value, );
	}

	for ( const key in initial ) {
		if ( checkedKeys[ key ] ) {
			continue;
		}
		const value = initial[ key ];
		changesMap.set( key, value, );
	}
}

function _replace<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_resetCurrentChangesMap( payload, ctaReducerState.initial, changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: payload,
		previous: ctaReducerState.current,
	};
}

function _replaceInitial<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	initial: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_resetCurrentChangesMap( ctaReducerState.current, initial, ctaReducerState.changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial,
	};
}

function _updateInitialState<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
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
		if ( strictDeepEqual( initial[ key as keyof Initial ], value, ) ) {
			continue;
		}

		next[ key ] = value;
		hasUpdates = true;

		const currentValue = current[ key as keyof Initial ];
		if ( strictDeepEqual( currentValue, value, ) ) {
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

function _updateState<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
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
		if ( strictDeepEqual( current[ key as keyof Initial ], value, ) ) {
			continue;
		}

		next[ key ] = value;
		hasUpdates = true;

		const initialValue = initial[ key as keyof Initial ];
		if ( strictDeepEqual( initialValue, value, ) ) {
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

function _resetState<Initial extends CTAInitial, >(
	ctaReducerState: CTAReducerState<Initial>,
	next: Initial,
) {
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;

	if ( strictDeepEqual( initial, next, ) && strictDeepEqual( current, next, ) ) {
		return ctaReducerState;
	}

	changesMap.clear();
	return {
		...ctaReducerState,
		changes: null,
		initial: next as Initial,
		current: next as Initial,
		previous: current,
		previousInitial: initial,
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
	Initial extends CTAInitial,
	Type extends PredefinedActions,
	Next = Type extends 'update' ? Partial<Initial> : Initial,
>(
	param: {
		ctaReducerState: CTAReducerState<Initial>
		type: Type
		next: Next
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
	} = param;

	switch ( type ) {
		case 'replace':
			return _replace(
				ctaReducerState,
				next as Initial,
			);
		case 'replaceInitial':
			return _replaceInitial(
				ctaReducerState,
				next as Initial,
			);
		case 'reset':
			return _resetState(
				ctaReducerState,
				next as Initial,
			);
		case 'updateInitial':
			return _updateInitialState(
				ctaReducerState,
				next as Initial,
			);
		default:
			return _updateState(
				ctaReducerState,
				next,
			);
	}
}

function getActionType<
	Initial extends CTAInitial,
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
	Initial extends CTAInitial,
	Actions,
>( params: {
	ctaReducerState: CTAReducerState<Initial>
	actions?: UseCTAParameter<Initial, Actions>['actions']
	nextCTAProps: Parameters<DispatchCTA<Initial, Actions>>[0]
}, ): CTAReducerState<Initial> {
	const {
		args = _args,
		type: ctaType,
		payload,
	} = params.nextCTAProps;
	const {
		ctaReducerState,
		actions,
	} = params;
	const {
		current,
		initial,
	} = ctaReducerState;
	const ctaState: CTAState<Initial> = {
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
			}, );
		}

		if ( ctaType === 'reset' && typeof payload === 'undefined' ) {
			return typeResult( {
				ctaReducerState,
				next: initial,
				type: 'reset',
			}, );
		}

		return typeResult( {
			ctaReducerState,
			next: payload,
			type: ctaType as PredefinedActions,
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
		}, );
	}

	const nextState = cta(
		{
			...ctaState,
			updateInitialAction: createUpdateInitialActionType( actions, ),
			resetAction: createResetActionType( actions, ),
			updateAction: createUpdateActionType( actions, ),
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
		}, );
	}

	return typeResult( {
		ctaReducerState,
		next: customPredefinedCTA( ctaState, next, ),
		type,
	}, );
}
