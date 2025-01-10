import { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type {
	DispatchCTA,
	DispatchCTADefaultRecord,
	UseCTAReturnTypeDispatch,
} from '../types/UseCTAReturnTypeDispatch';

import ctaReducer from './ctaReducer';

type UpdateCTAProps<
	Initial extends CTAState,
> = Extract<Parameters<DispatchCTA<Initial, undefined>>[0], { type: 'update' | 'updateInitial' }>;

export default function createDispatchInterface<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
>(
	dispatch: DispatchCTA<Initial, Actions, ReturnValue>,
	actions?: Actions,
	history?: CTAHistory<Initial>,
): UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue> {
	const cta: DispatchCTADefaultRecord<Initial, ReturnValue> = {
		replace: payload => dispatch( {
			payload,
			type: 'replace',
		}, ),
		replaceInitial: payload => dispatch( {
			payload,
			type: 'replaceInitial',
		}, ),
		reset: payload => dispatch( {
			payload,
			type: 'reset',
		}, ),
		update( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'update',
				} as UpdateCTAProps<Initial>, );
			}

			return dispatch( {
				payload,
				type: 'update',
			} as UpdateCTAProps<Initial>, );
		},
		updateInitial( payload: unknown, value: unknown, ) {
			if ( typeof payload === 'number' || typeof payload === 'string' ) {
				return dispatch( {
					payload: { [ payload ]: value, },
					type: 'updateInitial',
				} as UpdateCTAProps<Initial>, );
			}

			return dispatch( {
				payload,
				type: 'updateInitial',
			} as UpdateCTAProps<Initial>, );
		},
	};

	const dispatchWrapper = Object.assign(
		dispatch as UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>,
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
				} as Parameters<typeof ctaReducer<Initial, Actions>>[0]['nextCTAProps'], );
			}
		}
		Object.assign( dispatchWrapper.cta, customActions, );
	}

	return dispatchWrapper;
}
