import { useCallback, useMemo, useReducer, } from 'react';
import compareCallback from './compareCallback';
import ctaReducer from './ctaReducer';

import type { CTAReducerState, } from '../types/CTAReducerState';
import type { UseCTAParameterOnInit, } from '../types/UseCTAParameterOnInit';
import type { CTAState, } from '../types/CTAState';
import type { UseCTAParameter, } from '../types/UseCTAParameter';

function _init<
	Initial extends CTAState,
>(
	privateCTAState: CTAReducerState<Initial>,
	init?: UseCTAParameterOnInit<Initial>,
): CTAReducerState<Initial> {
	const changesMap = new Map() as CTAReducerState<Initial>['changesMap'];
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
	Initial extends CTAState,
	Actions,
>(
	params: UseCTAParameter<Initial, Actions>,
	actions?: UseCTAParameter<Initial, Actions>['actions'],
) {
	const compare = useMemo(
		() => compareCallback( params.compare, ),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
		],
	);
	const init = useMemo<CTAReducerState<Initial>>(
		() => ( {
			actionType: '' as CTAReducerState<Initial>['actionType'],
			customAction: undefined,
			changes: null,
			// Set changesMap in init to avoid re-instantiating a new Map everytime this is called
			changesMap: undefined as unknown as CTAReducerState<Initial>['changesMap'],
			current: params.initial,
			initial: params.initial,
			previous: null,
			previousInitial: null,
		} ),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
		],
	);
	const reducerCallback = useCallback(
		(
			ctaReducerState: CTAReducerState<Initial>,
			nextCTAProps: Parameters<typeof ctaReducer<Initial, Actions, void>>[0]['nextCTAProps'],
		) => ctaReducer( {
			actions,
			compare,
			ctaReducerState,
			nextCTAProps,
			transform: params.transform,
		}, ),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	const onInit = useCallback(
		( privateCTAState: CTAReducerState<Initial>, ) => _init( privateCTAState, params.onInit, ),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return useReducer(
		reducerCallback,
		init,
		onInit,
	);
}

export type UsePrivateCTAReturnType<
	Initial extends CTAState,
	Actions,
> = ReturnType<typeof usePrivateCTA<Initial, Actions>>;
