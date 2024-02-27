import { useReducer, } from 'react';
import { CTAInitial, } from '../types/CTAInitial';
import { CTARecord, } from '../types/CTARecord';
import { NextCTAProps, } from '../types/NextCTAProps';
import ctaReducer from './ctaReducer';
import { CTAState, } from '../types/CTAState';
import { CTATypeRecord, } from '../types/CTATypeRecord';

function _init<Initial>(
	ctaState: CTAState<Initial>,
	init?: UseCTAStateDispatchParameters<Initial>['onInit'],
): CTAState<Initial> {
	const changesMap = new Map() as CTAState<Initial>['changesMap'];
	if ( typeof init !== 'function' ) {
		return {
			...ctaState,
			changesMap,
		};
	}

	const initial = init( ctaState.current, );
	return {
		...ctaState,
		changesMap,
		current: initial,
		initial,
	};
}

export type UseCTAStateDispatchParameters<
	Initial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = {
	actions?: Actions,
	initial: Initial,
	onInit?: ( ( initial: Initial ) => Initial )
}

export default function usePrivateCTA<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
>(
	params: UseCTAStateDispatchParameters<Initial, Actions>,
) {
	return useReducer(
		function reducerCallback( ctaState: CTAState<Initial>, nextCTAProps: NextCTAProps<Initial, Actions>, ) {
			return ctaReducer( {
				ctaState,
				actions: params.actions,
				nextCTAProps,
			}, );
		},
		{
			changes: null,
			// Set changesMap in init to avoid re-instantiating a new Map everytime this is called
			changesMap: undefined as unknown as CTAState<Initial>['changesMap'],
			current: params.initial,
			initial: params.initial,
			previous: params.initial,
		},
		function _onInit( ctaState: CTAState<Initial>, ) {
			return _init( ctaState, params.onInit, );
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
