import { useReducer, } from 'react';
import { CTAInitial, } from '../types/CTAInitial';
import { CTARecord, } from '../types/CTARecord';
import { NextCTAProps, } from '../types/NextCTAProps';
import { UseCTAParameter, } from '../types/UseCTAParameter';
import ctaReducer from './ctaReducer';
import { PrivateCTAState, } from '../types/PrivateCTAState';
import { CTATypeRecord, } from '../types/CTATypeRecord';

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
