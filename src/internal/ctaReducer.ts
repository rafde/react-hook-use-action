import { strictDeepEqual, } from 'fast-equals';

import type { CTAInitial, } from '../types/CTAInitial';
import {
	UseCTAParameterActionsCustomRecord,
} from '../types/UseCTAParameterActionsRecordProp';
import type { DispatchCTA, UseCTAReturnTypeDispatchState, } from '../types/UseCTAReturnTypeDispatch';
import {
	ActionType,
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
} from './ActionTypes';

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

function _update<Initial extends CTAInitial,>(
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
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;

	if ( type === 'reset' ) {
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

	if ( type === 'replace' ) {
		return _replace(
			ctaReducerState,
			next as Initial,
		);
	}

	if ( type === 'replaceInitial' ) {
		return _replaceInitial(
			ctaReducerState,
			next as Initial,
		);
	}

	return _update(
		ctaReducerState,
		next,
	);
}

function getActionType<
	Initial extends CTAInitial,
	CTAReturnType extends UseCTAParameterActionsCustomRecord<Initial>[string | number],
>( ctaReturnType: Exclude<ReturnType<CTAReturnType>, undefined>, ) {
	if ( ctaReturnType instanceof ActionType ) {
		const {
			type,
			nextState,
			options,
		} = ctaReturnType;

		if ( Array.isArray( nextState, ) ) {
			return;
		}

		if ( type === 'reset' ) {
			if ( typeof nextState === 'undefined' ) {
				return {
					type,
					useDefault: Boolean( options?.useDefault, ),
				};
			}

			if ( typeof nextState !== 'object' || !nextState ) {
				return;
			}

			return {
				type,
				next: nextState,
				useDefault: Boolean( options?.useDefault, ),
			};
		}

		if ( !nextState || typeof nextState !== 'object' ) {
			return;
		}

		return {
			next: nextState,
			type,
			useDefault: Boolean( options?.useDefault, ),
		} as typeof type extends 'update' ? {
			next: Partial<Initial>
			type: 'update'
			useDefault: boolean
		} : {
			next: Initial
			type: Exclude<PredefinedActions, 'update'>
			useDefault: boolean
		};
	}

	if ( ctaReturnType && typeof ctaReturnType === 'object' ) {
		return {
			next: ctaReturnType as Partial<Initial>,
			type: 'update' as Extract<PredefinedActions, 'update'>,
			useDefault: false,
		};
	}
}

export type CTAReducerState<Initial extends CTAInitial,> = UseCTAReturnTypeDispatchState<Initial> & {
	changesMap: Map<string | number, unknown>
};

export default function ctaReducer<
	Initial extends CTAInitial,
	Actions = undefined,
>( params: {
	ctaReducerState: CTAReducerState<Initial>
	actions?: Actions
	nextCTAProps: Parameters<DispatchCTA<Initial, Actions>>[0]
}, ): CTAReducerState<Initial> {
	const {
		type: ctaType,
		payload: nextCTAPayload,
		options,
	} = params.nextCTAProps;
	const {
		ctaReducerState,
		actions,
	} = params;
	const {
		current,
		initial,
	} = ctaReducerState;
	const ctaState: UseCTAReturnTypeDispatchState<Initial> = {
		changes: ctaReducerState.changes,
		current,
		initial,
		previous: ctaReducerState.previous,
	};
	const ctaHandleState = {
		...ctaState,
		options,
	};

	const isActionsObject = actions && typeof actions == 'object' && !Array.isArray( actions, );

	if ( ctaType in predefinedActionsConst && ( !isActionsObject || !( ctaType in actions ) ) ) {
		if ( nextCTAPayload instanceof Function ) {
			return typeResult( {
				ctaReducerState,
				next: nextCTAPayload( ctaState, ),
				type: ctaType as PredefinedActions,
			}, );
		}

		if ( ctaType === 'reset' && typeof nextCTAPayload === 'undefined' ) {
			return typeResult( {
				ctaReducerState,
				next: initial,
				type: 'reset',
			}, );
		}

		return typeResult( {
			ctaReducerState,
			next: nextCTAPayload,
			type: ctaType as PredefinedActions,
		}, );
	}

	const cta = isActionsObject && actions?.[ ctaType as keyof typeof actions ];

	if ( typeof cta !== 'function' ) {
		return ctaReducerState;
	}

	let nextPayload: typeof nextCTAPayload | null = nextCTAPayload;
	if ( nextCTAPayload instanceof Function ) {
		const nextCTAPayloadResult = nextCTAPayload(
			ctaState,
		);

		if ( typeof nextCTAPayloadResult === 'undefined' ) {
			return ctaReducerState;
		}

		nextPayload = nextCTAPayloadResult;
	}

	if ( ctaType in predefinedActionsConst ) {
		const next = cta(
			ctaHandleState,
			nextPayload,
		);

		return typeResult( {
			ctaReducerState,
			next,
			type: ctaType as PredefinedActions,
		}, );
	}

	const nextState = cta(
		{
			...ctaHandleState,
			replaceAction: ReplaceActionType.create<Initial>,
			replaceInitialAction: ReplaceInitialActionType.create<Initial>,
			resetAction: ResetActionType.create<Initial>,
			updateAction: UpdateActionType.create<Initial>,
		},
		nextPayload,
	);

	const actionType = getActionType( nextState, );

	if ( !actionType ) {
		return ctaReducerState;
	}

	const {
		type,
		useDefault,
	} = actionType;

	let {
		next,
	} = actionType;

	const customPredefinedCTA = isActionsObject && actions?.[ type as keyof typeof actions ];

	if ( typeof customPredefinedCTA === 'function' && !useDefault ) {
		next = customPredefinedCTA( ctaHandleState, next, );
	}

	return typeResult( {
		ctaReducerState,
		next,
		type,
	}, );
}
