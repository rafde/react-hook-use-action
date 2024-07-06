import { useMemo, } from 'react';

import type { CTAInitial, } from '../types/CTAInitial';
import { UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import type { DispatchDefaultCTARecord, DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import type { UsePrivateCTADispatcher, UsePrivateCTAReturnType, } from './usePrivateCTA';

function mergeCustomCTAWithDefaultCTA<
	Initial extends CTAInitial,
	Actions,
	Dispatch,
>(
	dispatch: Dispatch,
	defaultCTARecord: DispatchDefaultCTARecord<Initial>,
	ctaRecord?: Actions,
) {
	let hasCustomAction = false;
	const customActions = {} as Record<
		Exclude<keyof Exclude<Actions, undefined>, keyof DispatchDefaultCTARecord<Initial>>,
		( payload?: unknown, ...args: unknown[] ) => void
	>;
	const dispatcher = dispatch as DispatchCTA<Initial, Actions>;
	for ( const type in ctaRecord ) {
		if ( type in defaultCTARecord || typeof ctaRecord[ type ] !== 'function' ) {
			continue;
		}

		customActions[ type as unknown as keyof typeof customActions ] = ( payload?: unknown, ...args ) => {
			dispatcher( {
				type,
				payload,
				options: args[ 0 ],
				args,
			} as unknown as Parameters<DispatchCTA<Initial, Actions>>[0], );
		};

		hasCustomAction = true;
	}

	if ( !hasCustomAction ) {
		return defaultCTARecord;
	}

	return Object.assign(
		defaultCTARecord,
		customActions,
	);
}

function wrapPrivateDispatcher<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined,
>(
	dispatcher: UsePrivateCTADispatcher<Initial, Actions>,
	actions?: Actions,
) {
	const publicDispatcher: DispatchCTA<Initial, Actions> = ( cta, ) => {
		dispatcher( cta, );
	};

	const cta: DispatchDefaultCTARecord<Initial> = {
		replace( payload, ...args ) {
			publicDispatcher( {
				args,
				options: args[ 0 ],
				payload,
				type: 'replace',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		replaceInitial( payload, ...args ) {
			publicDispatcher( {
				args,
				options: args[ 0 ],
				payload,
				type: 'replaceInitial',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		reset( payload, ...args ) {
			publicDispatcher( {
				args,
				options: args[ 0 ],
				payload,
				type: 'reset',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		update( payload, value, ...args ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					publicDispatcher( {
						args,
						type: 'update',
						payload: {
							[ payload ]: value,
						},
						options: args[ 0 ],
					} as unknown as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
				}
				default: {
					publicDispatcher( {
						type: 'update',
						payload,
						args: [
							value,
							...args,
						],
						options: value,
					} as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
				}
			}
		},
	};

	if ( actions == null || typeof actions !== 'object' ) {
		return Object.assign(
			publicDispatcher,
			{
				cta,
			},
		);
	}

	return Object.assign(
		publicDispatcher,
		{
			cta: mergeCustomCTAWithDefaultCTA(
				publicDispatcher,
				cta,
				actions,
			),
		},
	);
}

export default function usePublicCTA<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined,
>( params: {
	actions?: Actions
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>
}, ): UseCTAReturnType<Initial, Actions> {
	const {
		actions,
	} = params;
	const [
		ctaState,
		ctaDispatch,
	] = params.stateDispatcher;

	const augmentedDispatcher = useMemo(
		() => wrapPrivateDispatcher<Initial, Actions>( ctaDispatch, actions, ),
		[
			ctaDispatch,
			actions,
		],
	);

	return useMemo(
		() => {
			const state: UseCTAReturnType<Initial, Actions>[1]['state'] = {
				changes: ctaState.changes,
				current: ctaState.current,
				initial: ctaState.initial,
				previous: ctaState.previous,
			};
			const dispatch = Object.assign(
				augmentedDispatcher,
				{
					state,
				},
			);
			return [
				ctaState.current,
				dispatch as unknown as UseCTAReturnType<Initial, Actions>[1],
			];
		},
		[
			ctaState,
			augmentedDispatcher,
		],
	);
}
