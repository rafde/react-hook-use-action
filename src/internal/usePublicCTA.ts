import { useMemo, } from 'react';
import { CustomCTARecord, } from '../types/CustomCTARecord';
import { CTAInitial, } from '../types/CTAInitial';
import { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { UseCTAReturnTypeDispatch, } from '../types/UseCTAReturnTypeDispatch';
import { CTATypeRecord, } from '../types/CTATypeRecord';
import { NextCTAProps, PayloadValue, } from '../types/NextCTAProps';
import { UsePrivateCTADispatcher, UsePrivateCTAReturnType, } from './usePrivateCTA';

type PublicDispatcher<Initial, Actions> = ( cta: NextCTAProps<Initial, Actions> ) => void;

type DefaultDispatchRecord<Initial> = Pick<
	UseCTAReturnTypeDispatch<Initial>,
	'replace' | 'replaceInitial' | 'reset' | 'update'
>;

function returnCustomActions<Initial, Actions extends CTATypeRecord<Initial> = undefined>(
	commonActions: DefaultDispatchRecord<Initial>,
	commonDispatcher: PublicDispatcher<Initial, Actions>,
	actions?: Actions,
) {
	if ( !actions || typeof actions !== 'object' ) {
		return;
	}

	type ActionsRecord = Exclude<Actions, undefined>;
	type CustomActionKeys = Exclude<keyof ActionsRecord, keyof DefaultDispatchRecord<Initial>>;
	let hasCustomAction = false;
	const customActions = {} as Record<
		CustomActionKeys,
		( payload?: Parameters<ActionsRecord[CustomActionKeys]> ) => void
	>;
	for ( const action in actions ) {
		if ( action in commonActions || typeof actions[ action ] !== 'function' ) {
			continue;
		}
		const cta = actions[ action ] as CustomCTARecord<Initial>[keyof CustomCTARecord<Initial>];

		customActions[ action as unknown as keyof typeof customActions ] = ( payload?: PayloadValue<Initial, Parameters<typeof cta>[1]>, ) => {
			commonDispatcher( {
				action,
				payload,
			} as unknown as NextCTAProps<Initial, Actions>, );
		};

		hasCustomAction = true;
	}

	if ( !hasCustomAction ) {
		return;
	}

	return customActions;
}

function wrapPrivateDispatcher<
	Initial extends CTAInitial,
	Actions extends CTATypeRecord<Initial>,
>(
	dispatcher: UsePrivateCTADispatcher<Initial, Actions>,
	actions?: Actions,
) {
	const publicDispatcher: PublicDispatcher<Initial, Actions> = ( cta, ) => {
		dispatcher( cta, );
	};
	const commonActions: DefaultDispatchRecord<Initial> = {
		replace( payload, ) {
			publicDispatcher( {
				action: 'replace',
				payload,
			} as NextCTAProps<Initial, Actions>, );
		},
		replaceInitial( payload, ) {
			publicDispatcher( {
				action: 'replaceInitial',
				payload,
			} as NextCTAProps<Initial, Actions>, );
		},
		reset( payload, ) {
			publicDispatcher( {
				action: 'reset',
				payload,
			} as NextCTAProps<Initial, Actions>, );
		},
		update( payload, value, ) {
			switch ( typeof payload ) {
			case 'number':
			case 'string':
				publicDispatcher( {
					action: 'update',
					payload: {
						[ payload ]: value,
					},
				} as NextCTAProps<Initial, Actions>, );
				break;
			default:
				publicDispatcher( {
					action: 'update',
					payload,
				} as NextCTAProps<Initial, Actions>, );
				break;
			}
		},
	};
	const commonDispatcher = Object.assign(
		publicDispatcher,
		commonActions,
	) as UseCTAReturnTypeDispatch<Initial, Actions>;

	const customActions = returnCustomActions( commonActions, commonDispatcher, actions, );

	if ( customActions ) {
		return Object.assign(
			commonDispatcher,
			customActions,
		);
	}

	return commonDispatcher;
}

export default function usePublicCTA<
	Initial extends CTAInitial,
	Actions extends CTATypeRecord<Initial>
>( params: {
	actions?: Actions,
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>,
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
			actions,
			ctaDispatch,
		],
	);

	return useMemo(
		() => [
			{
				changes: ctaState.changes,
				current: ctaState.current,
				initial: ctaState.initial,
				previous: ctaState.previous,
			},
			augmentedDispatcher,
		],
		[
			ctaState,
			augmentedDispatcher,
		],
	);
}
