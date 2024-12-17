import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';

export type DefaultActionsRecord<
	Payload extends CTAState,
> = {
	replace( ctaHistory: CTAHistory<Payload>, payload: Payload ): Payload | undefined
	replaceInitial( ctaHistory: CTAHistory<Payload>, payload: Payload ): Payload | undefined
	reset( ctaHistory: CTAHistory<Payload>, payload?: Payload ): Payload | undefined
	update( ctaHistory: CTAHistory<Payload>, payload: Partial<Payload> ): Partial<Payload> | undefined
	updateInitial( ctaHistory: CTAHistory<Payload>, payload: Partial<Payload> ): Partial<Payload> | undefined
};
