import { useMemo, } from 'react';

import createCTAHistory from './createCTAHistory';
import createDispatchInterface from './createDispatchInterface';

import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import type { UsePrivateCTAReturnType, } from './usePrivateCTA';

export default function usePublicCTA<
	Initial extends CTAState,
	Actions,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>
}, ): UseCTAReturnType<Initial, Actions, void> {
	const {
		actions,
	} = params;
	const [
		ctaState,
		ctaDispatch,
	] = params.stateDispatcher;

	const dispatch = useMemo(
		() => createDispatchInterface<Initial, Actions, void>(
			( ...args ) => {
				ctaDispatch( ...args, );
			},
			ctaState,
			actions,
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
		],
	);

	return useMemo(
		() => {
			const history: CTAHistory<Initial> = createCTAHistory( ctaState, );
			dispatch.history = history;

			return [
				history,
				dispatch,
			];
		},
		[
			ctaState,
			dispatch,
		],
	);
}
