import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';
import { CTAInitial, } from './types/CTAInitial';
import type { CTARecord, } from './types/CTARecord';
import { UseCTAParameter, } from './types/UseCTAParameter';

export function useCTA<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
>(
	ctaParameter: UseCTAParameter<Initial, Actions>,
) {
	const stateDispatcher = usePrivateCTA( ctaParameter, );
	return usePublicCTA( {
		actions: ctaParameter.actions,
		stateDispatcher,
	}, );
}

export type { CTAInitial, } from './types/CTAInitial';

export type { CTARecord, } from './types/CTARecord';

export type { CTAParam, } from './types/CTAParam';

export type { UseCTAParameter, } from './types/UseCTAParameter';

export type { UseCTAReturnTypeState, } from './types/UseCTAReturnTypeState';

export type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

export type { UseCTAReturnType, } from './types/UseCTAReturnType';
