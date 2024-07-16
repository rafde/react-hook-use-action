import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';

export type DefaultActionsRecord<
	Initial extends CTAInitial,
> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reset( ctaState: CTAState<Initial>, payload?: Initial, ...args: any[] ): Initial | undefined
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	update( ctaState: CTAState<Initial>, payload: Partial<Initial>, ...args: any[] ): Partial<Initial> | undefined
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateInitial( ctaState: CTAState<Initial>, payload: Partial<Initial>, ...args: any[] ): Partial<Initial> | undefined
};
