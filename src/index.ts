import { useMemo, } from 'react';
import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';

import type { CTAInitial, } from './types/CTAInitial';
import type { DefaultActionsRecord, } from './types/DefaultActionsRecord';
import type {
	ActionsRecordProp,
	UseCTAParameterActionsRecordProp,
} from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

export function useCTA<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	useCTAParameter: UseCTAParameter<Initial, ActionsRecord>,
): UseCTAReturnType<Initial, ActionsRecord> {
	const actions = useMemo(
		() => {
			if ( useCTAParameter.actions && typeof useCTAParameter.actions === 'object' ) {
				return {
					...useCTAParameter.actions,
				};
			}

			return useCTAParameter.actions;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const stateDispatcher = usePrivateCTA<Initial, ActionsRecord>( useCTAParameter, actions, );
	return usePublicCTA( {
		actions,
		stateDispatcher,
	}, );
}

export function returnUseCTAParameter<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial>,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>( params: UseCTAParameter<Initial, ActionsRecord>, ) {
	return params;
}

export { createCTAContext, } from './internal/createCTAContext';

export type { CTAInitial, } from './types/CTAInitial';

export type { UseCTAParameter, } from './types/UseCTAParameter';

export type { UseCTAReturnType, } from './types/UseCTAReturnType';

export type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

export type { CustomCTAStateParam, } from './types/CustomCTAStateParam';

export type { CTAState, } from './types/CTAState';
