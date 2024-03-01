import { useReducer, } from 'react';

import ctaReducer from './ctaReducer';

import type { CTAInitial, } from '../types/CTAInitial';
import type { CTARecord, } from '../types/CTARecord';
import type { NextCTAProps, } from '../types/NextCTAProps';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { PrivateCTAState, } from '../types/PrivateCTAState';
import type { CTATypeRecord, } from '../types/CTATypeRecord';

function _init<Initial>(
	privateCTAState: PrivateCTAState<Initial>,
	init?: UseCTAParameter<Initial>['onInit'],
): PrivateCTAState<Initial> {
	const changesMap = new Map() as PrivateCTAState<Initial>['changesMap'];
	if ( typeof init !== 'function' ) {
		return {
			...privateCTAState,
			changesMap,
		};
	}

	const initial = init( privateCTAState.current, );
	return {
		...privateCTAState,
		changesMap,
		current: initial,
		initial,
	};
}

export default function usePrivateCTA<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
>(
	params: UseCTAParameter<Initial, Actions>,
) {
	return useReducer(
		function reducerCallback( privateCTAState: PrivateCTAState<Initial>, nextCTAProps: NextCTAProps<Initial, Actions>, ) {
			return ctaReducer( {
				privateCTAState,
				actions: params.actions,
				nextCTAProps,
			}, );
		},
		{
			changes: null,
			// Set changesMap in init to avoid re-instantiating a new Map everytime this is called
			changesMap: undefined as unknown as PrivateCTAState<Initial>['changesMap'],
			current: params.initial,
			initial: params.initial,
			previous: params.initial,
		},
		function _onInit( privateCTAState: PrivateCTAState<Initial>, ) {
			return _init( privateCTAState, params.onInit, );
		},
	);
}

export type UsePrivateCTAReturnType<
	Initial extends CTAInitial,
	Actions extends CTATypeRecord<Initial> = undefined
> = ReturnType<typeof usePrivateCTA<Initial, Actions>>

export type UsePrivateCTADispatcher<
	Initial extends CTAInitial,
	Actions extends CTATypeRecord<Initial> = undefined
> = UsePrivateCTAReturnType<Initial, Actions>[1];
