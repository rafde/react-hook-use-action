import { useMemo, } from 'react';
import type { CTAState, } from '../types/CTAState';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import usePrivateCTA from './usePrivateCTA';
import usePublicCTA from './usePublicCTA';

export function useCTA<
	Initial extends CTAState,
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
