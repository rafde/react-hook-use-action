import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';
import { CTAInitial, } from './types/CTAInitial';
import type { CTARecord, } from './types/CTARecord';

export function useCTA<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
>(
	ctaParameters: Parameters<typeof usePrivateCTA<Initial, Actions>>[0],
) {
	const stateDispatcher = usePrivateCTA( ctaParameters, );
	return usePublicCTA( {
		actions: ctaParameters.actions,
		stateDispatcher,
	}, );
}

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
> = ReturnType<typeof useCTA<Initial, Actions>>;

export type UseCTAReturnTypeState<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
> = UseCTAReturnType<Initial, Actions>[0];

export type UseCTAReturnTypeDispatcher<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial>
> = UseCTAReturnType<Initial, Actions>[1];

export type { CTARecord, } from './types/CTARecord';

export type { CTAParams, } from './types/CTAParams';
