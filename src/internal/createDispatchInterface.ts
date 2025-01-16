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

import ctaReducer from './ctaReducer';

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
		replace: payload => dispatch( {
			payload,
			type: 'replace',
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		replaceInitial: payload => dispatch( {
			payload,
			type: 'replaceInitial',
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		reset: payload => dispatch( {
			payload,
			type: 'reset',
		} as DispatchParameterTypes<Initial, Actions, ReturnValue>, ),
		update( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'update',
				} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
			}

			return dispatch( {
				payload,
				type: 'update',
			} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
		},
		updateInitial( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'updateInitial',
				} as DispatchParameterTypes<Initial, Actions, ReturnValue>, );
			}

			return dispatch( {
				payload,
				type: 'updateInitial',
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
