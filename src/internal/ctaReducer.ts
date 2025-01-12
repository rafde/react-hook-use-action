import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';
import type { CustomCTAReturnType, } from '../types/CustomCTAReturnType';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAParameterTransform, } from '../types/UseCTAParameterTransform';
import type { Dispatch, } from '../types/UseCTAReturnTypeDispatch';
import {
	ActionType,
	createUpdateInitialActionType,
	createResetActionType,
	createUpdateActionType,
	createReplaceActionType,
	createReplaceInitialActionType,
} from './ActionTypes';
import type { CompareCallbackReturnType, } from './compareCallback';

const predefinedActionsConst = {
	replace: 'replace',
	replaceInitial: 'replaceInitial',
	reset: 'reset',
	update: 'update',
	updateInitial: 'updateInitial',
} as const;

type PredefinedActions = keyof typeof predefinedActionsConst;

export type CTAReducerState<Initial extends CTAState,> = CTAHistory<Initial> & {
	changesMap: Map<string | number, unknown>
	actionType: PredefinedActions
	customAction?: string | number
};

function _replace<Initial extends CTAState,>(
	prop: {
		payload: Initial
		a: Initial
		b: Initial
		compare: CompareCallbackReturnType
		useBValue?: boolean
	},
) {
	const {
		a,
		b,
		compare,
		payload,
		useBValue,
	} = prop;
	const changesMap = new Map();
	let hasChange = false;
	for ( const key in payload ) {
		const value = payload[ key ];

		if ( !compare( a[ key ], value, key, ) ) {
			hasChange = true;
			if ( !compare( b[ key ], value, key, ) ) {
				changesMap.set( key, useBValue ? b[ key ] : value, );
			}
		}
	}

	if ( !hasChange ) {
		return;
	}
	return changesMap;
}

function _replaceCurrent<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
	compare: CompareCallbackReturnType,
	actionType: PredefinedActions,
	customAction?: string | number,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = _replace( {
		a: current,
		b: initial,
		compare,
		payload,
	}, );

	if ( !changesMap ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
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
	actionType: PredefinedActions,
	customAction?: string | number,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = _replace( {
		a: initial,
		b: current,
		compare,
		payload,
		useBValue: true,
	}, );

	if ( !changesMap ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		previousInitial: initial,
		initial: payload,
	};
}

function _update<Initial extends CTAState,>(
	prop: {
		a: Initial
		b: Initial
		changesMap: CTAReducerState<Initial>['changesMap']
		compare: CompareCallbackReturnType
		payload: Initial
		useCompareValue?: boolean
	},
) {
	const {
		a,
		b,
		compare,
		payload,
		useCompareValue,
	} = prop;
	let hasChange = false;
	const next: Record<string, unknown> = {};
	const changesMap = new Map( prop.changesMap, );

	for ( const key in payload ) {
		const value = payload[ key ];
		if ( compare( a[ key as keyof Initial ], value, key, ) ) {
			continue;
		}

		next[ key ] = value;
		hasChange = true;

		const compareValue = b[ key as keyof Initial ];
		if ( compare( compareValue, value, key, ) ) {
			changesMap.delete( key, );
		}
		else {
			changesMap.set( key, useCompareValue ? b[ key ] : value, );
		}
	}

	if ( !hasChange ) {
		return;
	}

	return {
		next,
		changesMap,
	};
}

function _updateInitial<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
	compare: CompareCallbackReturnType,
	actionType: PredefinedActions,
	customAction?: string | number,
): CTAReducerState<Initial> {
	const {
		current,
		initial,
	} = ctaReducerState;
	const nextUpdate = _update( {
		a: initial,
		b: current,
		changesMap: ctaReducerState.changesMap,
		compare,
		payload,
		useCompareValue: true,
	}, );

	if ( !nextUpdate ) {
		return ctaReducerState;
	}
	const {
		next,
		changesMap,
	} = nextUpdate;

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial: {
			...initial,
			...next,
		},
		previousInitial: initial,
	};
}

function _updateCurrent<Initial extends CTAState,>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
	compare: CompareCallbackReturnType,
	actionType: PredefinedActions,
	customAction?: string | number,
): CTAReducerState<Initial> {
	const {
		current,
		initial,
	} = ctaReducerState;
	const nextUpdate = _update( {
		a: current,
		b: initial,
		changesMap: ctaReducerState.changesMap,
		compare,
		payload,
	}, );

	if ( !nextUpdate ) {
		return ctaReducerState;
	}

	const {
		next,
		changesMap,
	} = nextUpdate;
	return {
		...ctaReducerState,
		actionType,
		customAction,
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
	actionType: PredefinedActions,
	customAction?: string | number,
) {
	const {
		current,
		initial,
	} = ctaReducerState;

	let isNextSameAsInitial = true;
	let isNextSameAsCurrent = true;
	for ( const key in next ) {
		const value = next[ key as keyof Initial ];

		if ( !compare( initial[ key as keyof Initial ], value, key, ) ) {
			isNextSameAsInitial = false;
		}

		if ( !compare( current[ key as keyof Initial ], value, key, ) ) {
			isNextSameAsCurrent = false;
		}

		if ( !isNextSameAsInitial && !isNextSameAsCurrent ) {
			break;
		}
	}

	if ( isNextSameAsInitial && isNextSameAsCurrent ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap: new Map(),
		changes: null,
		initial: next as Initial,
		current: next as Initial,
		previous: current,
		previousInitial: isNextSameAsInitial ? null : initial,
	};
}

function typeResult<
	Initial extends CTAState,
	Type extends PredefinedActions,
	Next = Type extends 'update' | 'updateInitial' ? Partial<Initial> : Initial,
>(
	param: {
		action?: unknown
		compare: CompareCallbackReturnType
		ctaReducerState: CTAReducerState<Initial>
		next: Next
		transform: UseCTAParameterTransform<Initial>
		type: Type
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
		action,
	} = param;

	const transformedNext = param.transform(
		next,
		{
			changes: ctaReducerState.changes,
			current: ctaReducerState.current,
			initial: ctaReducerState.initial,
			previous: ctaReducerState.previous,
			previousInitial: ctaReducerState.previousInitial,
			actionType: type,
			customAction: action as string | number,
		},
	);

	if ( transformedNext == null ) {
		return ctaReducerState;
	}

	let result;

	switch ( type ) {
		case 'replace':
			result = _replaceCurrent(
				ctaReducerState,
				transformedNext as Initial,
				compare,
				type,
				action as string | number,
			);
			break;
		case 'replaceInitial':
			result = _replaceInitial(
				ctaReducerState,
				transformedNext as Initial,
				compare,
				type,
				action as string | number,
			);
			break;
		case 'reset':
			result = _resetState(
				ctaReducerState,
				transformedNext as Initial,
				compare,
				type,
				action as string | number,
			);
			break;
		case 'updateInitial':
			result = _updateInitial(
				ctaReducerState,
				transformedNext,
				compare,
				type,
				action as string | number,
			);
			break;
		default:
			result = _updateCurrent(
				ctaReducerState,
				transformedNext,
				compare,
				type,
				action as string | number,
			);
			break;
	}

	return result;
}

function getActionType<
	Initial extends CTAState,
>( ctaReturnType: CustomCTAReturnType<Initial>, ) {
	if ( ctaReturnType instanceof ActionType ) {
		const {
			type,
			payload,
			actionTypeOptions,
		} = ctaReturnType;
		const useDefault = Boolean( actionTypeOptions?.useDefault, );

		if ( Array.isArray( payload, ) ) {
			return;
		}

		const actionType = {
			next: payload,
			type,
			useDefault,
		};

		if ( type === 'reset' ) {
			if ( typeof payload === 'undefined' ) {
				return actionType;
			}

			if ( payload == null ) {
				return;
			}

			return actionType;
		}

		if ( !payload || typeof payload !== 'object' ) {
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

const customCTAHistoryCache = new WeakMap<Record<string | number, unknown>>();
function getCustomCTAHistoryCache<Initial extends CTAState, Actions,>( actions?: UseCTAParameter<Initial, Actions>['actions'], ) {
	if ( !actions ) {
		return;
	}
	if ( customCTAHistoryCache.has( actions, ) ) {
		return customCTAHistoryCache.get( actions, );
	}

	const customCTAHistoryActions = {
		replaceAction: createReplaceActionType( actions, ),
		replaceInitialAction: createReplaceInitialActionType( actions, ),
		resetAction: createResetActionType( actions, ),
		updateAction: createUpdateActionType( actions, ),
		updateInitialAction: createUpdateInitialActionType( actions, ),
	};

	customCTAHistoryCache.set( actions, customCTAHistoryActions, );

	return customCTAHistoryActions;
}

const _args: unknown[] = [];
const _noopTransform = <Initial extends CTAState,>( nextState: Initial, ) => nextState;

export default function ctaReducer<
	Initial extends CTAState,
	Actions,
	ReturnType,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	compare: CompareCallbackReturnType
	ctaReducerState: CTAReducerState<Initial>
	nextCTAProps: Parameters<Dispatch<Initial, Actions, ReturnType>>[0]
	transform?: UseCTAParameterTransform<Initial>
}, ): CTAReducerState<Initial> {
	const {
		args = _args,
		type: action,
		payload,
	} = params.nextCTAProps;
	const {
		ctaReducerState,
		actions,
		compare,
		transform = _noopTransform as UseCTAParameterTransform<Initial>,
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

	if ( action in predefinedActionsConst && ( !isActionsObject || !( action in actions ) ) ) {
		if ( payload instanceof Function ) {
			return typeResult( {
				compare,
				ctaReducerState,
				next: payload( ctaState, ),
				type: action as PredefinedActions,
				transform,
			}, );
		}

		if ( action === 'reset' && typeof payload === 'undefined' ) {
			return typeResult( {
				compare,
				ctaReducerState,
				next: initial,
				type: 'reset',
				transform,
			}, );
		}

		return typeResult( {
			compare,
			ctaReducerState,
			next: payload,
			type: action as PredefinedActions,
			transform,
		}, );
	}

	const cta = isActionsObject && actions![ action as keyof typeof actions ];

	if ( typeof cta !== 'function' ) {
		return ctaReducerState;
	}

	let nextPayload: typeof payload | null = payload;

	if ( action in predefinedActionsConst ) {
		if ( payload instanceof Function ) {
			const nextCTAPayloadResult = payload(
				ctaState,
			);

			if ( typeof nextCTAPayloadResult === 'undefined' ) {
				return ctaReducerState;
			}

			nextPayload = nextCTAPayloadResult;
		}

		const next = cta(
			ctaState,
			nextPayload,
			...args,
		);

		return typeResult( {
			compare,
			ctaReducerState,
			next,
			type: action as PredefinedActions,
			transform,
		}, );
	}

	const nextState = cta(
		Object.assign( ctaState, getCustomCTAHistoryCache( actions, ), ),
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
			action,
			compare,
			ctaReducerState,
			next,
			type,
			transform,
		}, );
	}

	return typeResult( {
		action,
		compare,
		ctaReducerState,
		next: customPredefinedCTA( ctaState, next, ),
		type,
		transform,
	}, );
}
