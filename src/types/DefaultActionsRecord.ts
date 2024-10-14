import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';

export type DefaultActionsRecord<
	Initial extends CTAInitial,
> = {
	replace( ctaState: CTAState<Initial>, payload: Initial ): Initial | undefined
	replaceInitial( ctaState: CTAState<Initial>, payload: Initial ): Initial | undefined
	reset( ctaState: CTAState<Initial>, payload?: Initial ): Initial | undefined
	update( ctaState: CTAState<Initial>, payload: Partial<Initial> ): Partial<Initial> | undefined
	updateInitial( ctaState: CTAState<Initial>, payload: Partial<Initial> ): Partial<Initial> | undefined
};
