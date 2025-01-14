import { useMemo, } from 'react';
import type { UseCTAParameterCreateFunc, } from '../types/UseCTAParameterCreateFunc';
import { UseCTAParameterCreateFuncReturnRecord, } from '../types/UseCTAParameterCreateFuncReturnRecord';

import createCTAHistory from './createCTAHistory';
import createDispatchInterface from './createDispatchInterface';

import type { CTAState, } from '../types/CTAState';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import type { UsePrivateCTAReturnType, } from './usePrivateCTA';

export default function usePublicCTA<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>
	createFunc: UseCTAParameterCreateFunc<Initial, Actions, FR, void>
}, ): UseCTAReturnType<Initial, Actions, FR, void> {
	const {
		actions,
		createFunc,
	} = params;
	const [
		ctaState,
		ctaDispatch,
	] = params.stateDispatcher;

	const dispatch = useMemo(
		() => createDispatchInterface(
			( ...args ) => {
				ctaDispatch( ...args, );
			},
			ctaState,
			createFunc,
			actions,
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
		],
	);

	return useMemo(
		() => {
			const history = createCTAHistory( ctaState, );
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
