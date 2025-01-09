import { useMemo, } from 'react';

import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { createDispatchInterface, } from './createDispatchInterface';
import type { UsePrivateCTAReturnType, } from './usePrivateCTA';

export default function usePublicCTA<
	Initial extends CTAState,
	Actions,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>
}, ): UseCTAReturnType<Initial, Actions> {
	const {
		actions,
	} = params;
	const [
		ctaState,
		ctaDispatch,
	] = params.stateDispatcher;

	const dispatch = useMemo(
		() => createDispatchInterface<Initial, Actions>(
			( ...args ) => {
				ctaDispatch( ...args, );
			},
			actions,
		),
		[
			ctaDispatch,
			actions,
		],
	);

	return useMemo(
		() => {
			const history: CTAHistory<Initial> = {
				changes: ctaState.changes,
				current: ctaState.current,
				initial: ctaState.initial,
				previous: ctaState.previous,
				previousInitial: ctaState.previousInitial,
			};
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
