import { Dispatch, useMemo, } from 'react';
import { DefaultCTARecord, } from '../types/CTADefaults';
import { CTAGenericCallback, } from '../types/CTAGenericCallback';
import { CTAGenericRecord, } from '../types/CTAGenericRecord';
import { CTAInitial, } from '../types/CTAInitial';
import { CTAState, } from '../types/CTAState';
import { CTATypeRecord, } from '../types/CTATypeRecord';
import { NextCTAProps, PayloadValue, ReplaceCTAProps, ResetCTAProps, UpdateCTAProps, } from '../types/NextCTAProps';
import { UsePrivateCTADispatcher, UsePrivateCTAReturnType, } from './usePrivateCTA';

type DefaultDispatchRecord<Initial> = {
	replace( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	replaceInitial( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	reset( payload?: ResetCTAProps<Initial>['payload'] ): void;
	update( payload: UpdateCTAProps<Initial>['payload'], value?: undefined ): void;
	update( payload: keyof Initial, value: Initial[keyof Initial] ): void;
};

type PublicDispatcher<Initial, Actions> = ( cta: NextCTAProps<Initial, Actions> ) => void;

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
		const cta = actions[ action ] as CTAGenericCallback<Initial>;

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
	) as UsePublicCTAReturnDispatcher<Initial, Actions>;

	const customActions = returnCustomActions( commonActions, commonDispatcher, actions, );

	if ( customActions ) {
		return Object.assign(
			commonDispatcher,
			customActions,
		);
	}

	return commonDispatcher;
}

type CustomCTAProps<Initial, TActions extends CTAGenericRecord<Initial>> = Record<
	keyof TActions,
	( ( payload?: PayloadValue<Initial, Parameters<TActions[keyof TActions]>[1]> ) => void )
>

type UsePublicCTAReturnDispatchHandleRecord<Initial, Actions = undefined> = Actions extends CTAGenericRecord<Initial> ? (
	keyof Omit<Actions, keyof DefaultCTARecord<Initial>> extends never ?
		DefaultDispatchRecord<Initial> :
		CustomCTAProps<Initial, Omit<Actions, keyof DefaultDispatchRecord<Initial>>> &
		DefaultDispatchRecord<Initial>
	) :
	DefaultDispatchRecord<Initial>;

type UsePublicCTAReturnDispatcher<
	Initial,
	Actions = undefined
> = Dispatch<NextCTAProps<Initial, Actions>> & UsePublicCTAReturnDispatchHandleRecord<Initial, Actions>;

type UsePublicCTAReturn<Initial, Actions = undefined> = [
	Readonly<Omit<CTAState<Initial>, 'changesMap'>>,
	UsePublicCTAReturnDispatcher<Initial, Actions>,
]

export default function usePublicCTA<
	Initial extends CTAInitial,
	Actions extends CTATypeRecord<Initial>
>( params: {
	actions?: Actions,
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>,
}, ): UsePublicCTAReturn<Initial, Actions> {
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
