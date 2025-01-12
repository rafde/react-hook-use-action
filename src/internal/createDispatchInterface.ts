import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type {
	DispatchCTA,
	UseCTAReturnTypeDispatch,
} from '../types/UseCTAReturnTypeDispatch';

import ctaReducer from './ctaReducer';

export default function createDispatchInterface<
	Initial extends CTAState,
	Actions,
	ReturnValue,
>(
	dispatch: DispatchCTA<Initial, Actions, ReturnValue>,
	history: CTAHistory<Initial>,
	actions?: Actions,
): UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue> {
	type DispatchParameter = Parameters<typeof dispatch>[0];
	type Dispatch = UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>;
	const cta = {
		replace: payload => dispatch( {
			payload,
			type: 'replace',
		} as DispatchParameter, ),
		replaceInitial: payload => dispatch( {
			payload,
			type: 'replaceInitial',
		} as DispatchParameter, ),
		reset: payload => dispatch( {
			payload,
			type: 'reset',
		} as DispatchParameter, ),
		update( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'update',
				} as DispatchParameter, );
			}

			return dispatch( {
				payload,
				type: 'update',
			} as DispatchParameter, );
		},
		updateInitial( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'updateInitial',
				} as DispatchParameter, );
			}

			return dispatch( {
				payload,
				type: 'updateInitial',
			} as DispatchParameter, );
		},
	} as Dispatch['cta'];

	const dispatchWrapper = Object.assign(
		dispatch as Dispatch,
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

	return dispatchWrapper;
}
