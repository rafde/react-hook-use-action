import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';

export type DefaultActionsRecord<
	Initial extends CTAInitial,
> = {
	replaceInitial( ctaState: CTAState<Initial>, payload: Initial, options?: Record<never, never> ): Initial | undefined
	reset( ctaState: CTAState<Initial>, payload?: Initial, options?: Record<never, never> ): Initial | undefined
	update( ctaState: CTAState<Initial>, payload: Partial<Initial>, options?: Record<never, never> ): Partial<Initial> | undefined
};
