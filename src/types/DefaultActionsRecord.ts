import type { CTAInitial, } from './CTAInitial';
import type { CTAHistory, } from './CTAHistory';

export type DefaultActionsRecord<
	Initial extends CTAInitial,
> = {
	replace( ctaState: CTAHistory<Initial>, payload: Initial ): Initial | undefined
	replaceInitial( ctaState: CTAHistory<Initial>, payload: Initial ): Initial | undefined
	reset( ctaState: CTAHistory<Initial>, payload?: Initial ): Initial | undefined
	update( ctaState: CTAHistory<Initial>, payload: Partial<Initial> ): Partial<Initial> | undefined
	updateInitial( ctaState: CTAHistory<Initial>, payload: Partial<Initial> ): Partial<Initial> | undefined
};
