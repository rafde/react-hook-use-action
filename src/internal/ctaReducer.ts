import { strictDeepEqual, } from 'fast-equals';

import type { CTAInitial, } from '../types/CTAInitial';
import type { CTAState, } from '../types/CTAState';
import type { CustomCTAReturnType, } from '../types/CustomCTAReturnType';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import {
	ActionType,
	createReplaceActionType,
	createReplaceInitialActionType,
	createResetActionType,
	createUpdateActionType,
} from './ActionTypes';

function _mutateToLatestChangesMap<Initial extends CTAInitial,>(
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

function _replaceState<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_mutateToLatestChangesMap( payload, ctaReducerState.initial, changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: payload,
		previous: ctaReducerState.current,
	};
}

function _replaceInitialState<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	initial: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_mutateToLatestChangesMap( ctaReducerState.current, initial, ctaReducerState.changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial,
	};
}

function _updateState<Initial extends CTAInitial,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
): CTAReducerState<Initial> {
	const current: Record<string, unknown> = {};
	let hasUpdates = false;
	const {
		current: previous,
		...rest
	} = ctaReducerState;
	const {
		initial,
		changesMap,
	} = ctaReducerState;

	for ( const key in payload ) {
		const value = payload[ key ];
		if ( strictDeepEqual( previous[ key as keyof Initial ], value, ) ) {
			continue;
		}

		current[ key ] = value;
		hasUpdates = true;

		if ( strictDeepEqual( initial[ key as keyof Initial ], value, ) ) {
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
		...rest,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: {
			...previous,
			...payload,
		},
		previous,
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
	};
}

const predefinedActionsConst = {
	replace: 'replace',
	replaceInitial: 'replaceInitial',
	reset: 'reset',
	update: 'update',
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

	if ( !next || typeof next !== 'object' || Array.isArray( next, ) || next instanceof ActionType ) {
		return ctaReducerState;
	}

	const {
		type,
	} = param;

	if ( type === 'reset' ) {
		return _resetState(
			ctaReducerState,
			next as Initial,
		);
	}

	if ( type === 'replace' ) {
		return _replaceState(
			ctaReducerState,
			next as Initial,
		);
	}

	if ( type === 'replaceInitial' ) {
		return _replaceInitialState(
			ctaReducerState,
			next as Initial,
		);
	}

	return _updateState(
		ctaReducerState,
		next,
	);
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
		const options = actionTypeOptions?.options;

		if ( Array.isArray( nextState, ) ) {
			return;
		}

		const actionType = {
			next: nextState,
			options,
			type,
			useDefault,
		};

		if ( type === 'reset' ) {
			if ( typeof nextState === 'undefined' ) {
				return actionType;
			}

			if ( typeof nextState !== 'object' || !nextState ) {
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
			options: undefined,
		};
	}
}

export type CTAReducerState<Initial extends CTAInitial,> = CTAState<Initial> & {
	changesMap: Map<string | number, unknown>
};

export default function ctaReducer<
	Initial extends CTAInitial,
	Actions,
>( params: {
	ctaReducerState: CTAReducerState<Initial>
	actions?: UseCTAParameter<Initial, Actions>['actions']
	nextCTAProps: Parameters<DispatchCTA<Initial, Actions>>[0]
}, ): CTAReducerState<Initial> {
	const {
		args = [],
		options,
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
			options,
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
			replaceAction: createReplaceActionType,
			replaceInitialAction: createReplaceInitialActionType,
			resetAction: createResetActionType,
			updateAction: createUpdateActionType,
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
		next: customPredefinedCTA( ctaState, next, actionType.options, ),
		type,
	}, );
}
