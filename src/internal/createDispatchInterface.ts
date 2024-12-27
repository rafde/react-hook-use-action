import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import {
	DispatchCTA,
	DispatchCTADefaultRecord,
	UpdateCTAProps,
	type UseCTAReturnTypeDispatch,
} from '../types/UseCTAReturnTypeDispatch';
import ctaReducer from './ctaReducer';

export function createDispatchInterface<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
>( dispatch: DispatchCTA<Initial, Actions, ReturnValue>, actions?: Actions, ) {
	const dispatchWrapper = ( value: Parameters<typeof dispatch>[0], ) => dispatch( value, );

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
		update( payload, value, ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					return dispatch( {
						payload: {
							[ payload ]: value as Initial[keyof Initial],
						},
						type: 'update',
					} as unknown as UpdateCTAProps<Initial>, );
				}
				default: {
					return dispatch( {
						payload,
						type: 'update',
					} as unknown as UpdateCTAProps<Initial>, );
				}
			}
		},
		updateInitial: payload => dispatch( {
			payload,
			type: 'updateInitial',
		}, ),
	};
	const props = {
		cta,
	};
	if ( actions == null || typeof actions !== 'object' ) {
		return Object.assign( dispatchWrapper, props, ) as unknown as UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>;
	}

	let hasCustomAction = false;
	const customActions = {} as Record<
		Exclude<keyof Exclude<Actions, undefined>, keyof DefaultActionsRecord<Initial>>,
		( ...args: unknown[] ) => ReturnValue
	>;

	for ( const type in actions ) {
		if ( type in cta || typeof actions[ type ] !== 'function' ) {
			continue;
		}

		customActions[ type as unknown as keyof typeof customActions ] = ( payload?: unknown, ...args ) => dispatch( {
			payload,
			type,
			args,
		} as Parameters<typeof ctaReducer<Initial, Actions>>[0]['nextCTAProps'], );

		hasCustomAction = true;
	}

	if ( hasCustomAction ) {
		Object.assign( props.cta, customActions, );
	}

	return Object.assign( dispatchWrapper, props, ) as unknown as UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>;
}
