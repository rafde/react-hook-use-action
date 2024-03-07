import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';

import type { CTAInitial, } from './types/CTAInitial';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

export function useCTA<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
>(
	useCTAParameter: UseCTAParameter<Initial, Actions>,
): UseCTAReturnType<Initial, Actions> {
	const stateDispatcher = usePrivateCTA( useCTAParameter, );
	return usePublicCTA( {
		actions: useCTAParameter.actions,
		stateDispatcher,
	}, );
}

export type { CTAInitial, } from './types/CTAInitial';

export type { CustomCTAParam, } from './types/CustomCTAParam';

export type { CustomCTAReturnType, } from './types/CustomCTAReturnType';

export type { UseCTAParameter, } from './types/UseCTAParameter';

export type { UseCTAReturnTypeDispatch, UseCTAReturnTypeDispatchState, } from './types/UseCTAReturnTypeDispatch';

export type { UseCTAReturnType, } from './types/UseCTAReturnType';
