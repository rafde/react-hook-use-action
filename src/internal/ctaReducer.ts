import type { BuiltInActions, } from '../types/BuiltInActions';
import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAReducerState, } from '../types/CTAReducerState';
import type { CTAState, } from '../types/CTAState';
import type { CustomCTAReturnType, } from '../types/CustomCTAReturnType';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAParameterTransform, } from '../types/UseCTAParameterTransform';
import type { Dispatch, } from '../types/UseCTAReturnTypeDispatch';
import type { CompareCallbackReturnType, } from './compareCallback';

import {
	ActionType,
	createDeepUpdateActionType,
	createDeepUpdateInitialActionType,
	createReplaceActionType,
	createReplaceInitialActionType,
	createResetActionType,
	createUpdateActionType,
	createUpdateInitialActionType,
} from './ActionTypes';
import builtInActions from './builtInActions';

import getCallbackValueFromWeakMap from './getCallbackValueFromWeakMap';
import typeResult from './typeResult';

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
			type: 'update' as Extract<BuiltInActions, 'update'>,
			useDefault: false,
		};
	}
}

const customCTAHistoryCache = new WeakMap<Record<string | number, unknown>>();
function createCustomCTAHistory( actions: Record<string | number, unknown>, ) {
	return {
		deepUpdateAction: createDeepUpdateActionType( actions, ),
		deepUpdateInitialAction: createDeepUpdateInitialActionType( actions, ),
		replaceAction: createReplaceActionType( actions, ),
		replaceInitialAction: createReplaceInitialActionType( actions, ),
		resetAction: createResetActionType( actions, ),
		updateAction: createUpdateActionType( actions, ),
		updateInitialAction: createUpdateInitialActionType( actions, ),
	};
}
function getCustomCTAHistoryCache( actions: Record<string | number, unknown>, ) {
	return getCallbackValueFromWeakMap( customCTAHistoryCache, actions, () => createCustomCTAHistory( actions, ), );
}

const _args: unknown[] = [];
const _noopTransform = <Initial extends CTAState,>( nextState: Initial, ) => nextState;

export default function ctaReducer<
	Initial extends CTAState,
	Actions,
	ReturnType,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	compare: CompareCallbackReturnType<Initial>
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

	// actions is undefined
	if ( action in builtInActions && !( isActionsObject && action in actions ) ) {
		if ( payload instanceof Function ) {
			return typeResult( {
				compare,
				ctaReducerState,
				next: payload( ctaState, ),
				transform,
				type: action as BuiltInActions,
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
			type: action as BuiltInActions,
			transform,
		}, );
	}

	const cta = isActionsObject && actions![ action as keyof typeof actions ];

	if ( typeof cta !== 'function' ) {
		return ctaReducerState;
	}

	let nextPayload: typeof payload | null = payload;

	if ( action in builtInActions ) {
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
			type: action as BuiltInActions,
			transform,
		}, );
	}

	const nextState = cta(
		Object.assign( ctaState, getCustomCTAHistoryCache( actions as Record<string | number, unknown>, ), ),
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
			action: action as string | number,
			compare,
			ctaReducerState,
			next,
			type,
			transform,
		}, );
	}

	return typeResult( {
		action: action as string | number,
		compare,
		ctaReducerState,
		next: customPredefinedCTA( ctaState, next, ),
		type,
		transform,
	}, );
}
