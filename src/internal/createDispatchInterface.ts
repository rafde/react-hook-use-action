import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { DispatchParameterTypes, } from '../types/DispatchParameterTypes';
import type {
	UseCTAParameterCreateFunc,
	UseCTAParameterCreateFuncReturnRecord,
} from '../types/UseCTAParameterCreateFunc';
import type {
	Dispatch,
	UseCTAReturnTypeDispatch,
} from '../types/UseCTAReturnTypeDispatch';
import builtInActions from './builtInActions';
import createObjectFromArrayPath from './createObjectFromArrayPath';
import createObjectFromPath from './createObjectFromPath';

import ctaReducer from './ctaReducer';
import deepGetArrayPath from './deepGetArrayPath';
import deepGetPath from './deepGetPath';
import getCallbackValueFromWeakMap from './getCallbackValueFromWeakMap';

function createDeepCTAHistoryProxy<
	State extends CTAState,
	P,
	Create extends ( target: State, payload: P ) => unknown,
>( ctaHistory: CTAHistory<State>, payload: P, weakMap: WeakMap<WeakKey, unknown>, create: Create, ) {
	return new Proxy( ctaHistory, {
		get: (
			target,
			prop: keyof typeof ctaHistory | 'currentValue' | 'previousValue' | 'initialValue' | 'previousInitialValue' | 'changesValue',
		) => {
			switch ( prop ) {
				case 'currentValue':
					return getCallbackValueFromWeakMap(
						weakMap,
						target.current,
						() => create( target.current, payload, ),
					);
				case 'previousValue':
					if ( target.previous != null ) {
						return getCallbackValueFromWeakMap(
							weakMap,
							target.previous,
							() => create( target.previous as State, payload, ),
						);
					}
					return target.previous;
				case 'initialValue':
					return getCallbackValueFromWeakMap(
						weakMap,
						target.initial,
						() => create( target.initial, payload, ),
					);
				case 'previousInitialValue':
					if ( target.previousInitial != null ) {
						return getCallbackValueFromWeakMap(
							weakMap,
							target.previousInitial,
							() => create( target.previousInitial as State, payload, ),
						);
					}
					return target.previousInitial;
				case 'changesValue':
					if ( target.changes != null ) {
						return getCallbackValueFromWeakMap(
							weakMap,
							target.changes,
							() => create( target.changes as State, payload, ),
						);
					}
					return target.changes;
				default:
					return target[ prop ];
			}
		},
		set() {
			return false;
		},
	}, );
}

function getDeepPropArrayCallback<
	State extends CTAState,
>(
	payload: string[],
	callback: ( prop: CTAHistory<State> ) => typeof deepGetArrayPath,
) {
	const weakMap = new WeakMap();

	return function createDeepPropValue( ctaHistory: CTAHistory<State>, ) {
		const deepCTAHistory = createDeepCTAHistoryProxy(
			ctaHistory,
			payload,
			weakMap,
			deepGetArrayPath,
		);

		return createObjectFromArrayPath( payload, callback( deepCTAHistory, ), );
	};
}

function getDeepPropCallback<
	State extends CTAState,
>(
	payload: string | number,
	callback: ( prop: CTAHistory<State> ) => typeof deepGetPath,
) {
	const weakMap = new WeakMap();

	return function createDeepPropValue( ctaHistory: CTAHistory<State>, ) {
		const deepCTAHistory = createDeepCTAHistoryProxy(
			ctaHistory,
			payload,
			weakMap,
			deepGetPath,
		);
		return createObjectFromPath( String( payload, ), callback( deepCTAHistory, ), );
	};
}

function getDeepUpdatePayload( payload: unknown, value: unknown, ) {
	if ( Array.isArray( payload, ) ) {
		if ( typeof value === 'function' ) {
			return getDeepPropArrayCallback( payload, value as () => typeof deepGetArrayPath, );
		}
		return createObjectFromArrayPath( payload, value, );
	}

	if ( typeof payload === 'string' ) {
		if ( typeof value === 'function' ) {
			return getDeepPropCallback( payload, value as () => typeof deepGetPath, );
		}
		return createObjectFromPath( payload, value, );
	}

	return getUpdatePayload( payload, value, );
}

function getUpdatePayload( payload: unknown, value: unknown, ) {
	if ( typeof payload === 'number' || typeof payload === 'string' ) {
		return { [ payload ]: value, };
	}

	return payload;
}

export default function createDispatchInterface<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnValue,
>(
	dispatch: Dispatch<Initial, Actions, ReturnValue>,
	history: CTAHistory<Initial>,
	createFunc: UseCTAParameterCreateFunc<Initial, Actions, FR, ReturnValue>,
	actions?: Actions,
): UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnValue> {
	const cta = {
		deepUpdate( payload: unknown, value: unknown, ) {
			return dispatch( {
				payload: getDeepUpdatePayload( payload, value, ),
				type: builtInActions.deepUpdate,
			} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
		},
		deepUpdateInitial( payload: unknown, value: unknown, ) {
			return dispatch( {
				payload: getDeepUpdatePayload( payload, value, ),
				type: builtInActions.deepUpdateInitial,
			} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
		},
		replace: payload => dispatch( {
			payload,
			type: builtInActions.replace,
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		replaceInitial: payload => dispatch( {
			payload,
			type: builtInActions.replaceInitial,
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		reset: payload => dispatch( {
			payload,
			type: builtInActions.reset,
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		update( payload: unknown, value: unknown, ) {
			return dispatch( {
				payload: getUpdatePayload( payload, value, ),
				type: builtInActions.update,
			} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
		},
		updateInitial( payload: unknown, value: unknown, ) {
			return dispatch( {
				payload: getUpdatePayload( payload, value, ),
				type: builtInActions.updateInitial,
			} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
		},
	} as UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnValue>['cta'];

	const dispatchWrapper = Object.assign(
		dispatch,
		{
			cta,
			history,
		},
	);

	if ( actions && typeof actions === 'object' ) {
		const customActions = {} as Record<
			Exclude<keyof Exclude<Actions, undefined>, keyof DefaultActionsRecord<Initial>>,
			( ...args: unknown[] ) => ReturnValue
		>;

		for ( const type in actions ) {
			if ( !( type in cta ) && typeof actions[ type ] === 'function' ) {
				customActions[ type as unknown as keyof typeof customActions ] = ( payload, ...args ) => dispatch( {
					payload,
					type,
					args,
				} as Parameters<typeof ctaReducer<Initial, Actions, ReturnValue>>[0]['nextCTAProps'], );
			}
		}
		Object.assign( dispatchWrapper.cta, customActions, );
	}

	return Object.assign( dispatchWrapper, {
		func: createFunc( dispatchWrapper, ),
	}, );
}
