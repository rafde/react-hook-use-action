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

export function createDispatchInterface<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
>( dispatch: DispatchCTA<Initial, Actions, ReturnValue>, actions?: Actions, ): UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue> {
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
		update( payload: unknown, value: unknown, ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					return dispatch( {
						payload: {
							[ payload ]: value,
						},
						type: 'update',
					} as UpdateCTAProps<Initial>, );
				}
				default: {
					return dispatch( {
						payload,
						type: 'update',
					} as UpdateCTAProps<Initial>, );
				}
			}
		},
		updateInitial( payload: unknown, value: unknown, ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					return dispatch( {
						payload: {
							[ payload ]: value,
						},
						type: 'updateInitial',
					} as UpdateCTAProps<Initial>, );
				}
				default: {
					return dispatch( {
						payload,
						type: 'updateInitial',
					} as UpdateCTAProps<Initial>, );
				}
			}
		},
	};

	const props = {
		cta,
	};
	if ( actions == null || typeof actions !== 'object' ) {
		return Object.assign( dispatchWrapper, props, ) as UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>;
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

		customActions[ type as unknown as keyof typeof customActions ] = ( payload, ...args ) => dispatch( {
			payload,
			type,
			args,
		} as Parameters<typeof ctaReducer<Initial, Actions>>[0]['nextCTAProps'], );

		hasCustomAction = true;
	}

	if ( hasCustomAction ) {
		Object.assign( props.cta, customActions, );
	}

	return Object.assign( dispatchWrapper, props, ) as UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>;
}
