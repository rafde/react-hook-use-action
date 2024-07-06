import type { CTAInitial, } from './CTAInitial';
import { CTAStateParam, } from './CTAStateParam';

export type DefaultActionsRecord<Initial extends CTAInitial,> = {
	replace( ctaState: CTAStateParam<Initial>, payload: Initial, ...args: never[] ): Initial | undefined
	replaceInitial( ctaState: CTAStateParam<Initial>, payload: Initial, ...args: never[] ): Initial | undefined
	reset( ctaState: CTAStateParam<Initial>, payload?: Initial, ...args: never[] ): Initial | undefined
	update( ctaState: CTAStateParam<Initial>, payload: Partial<Initial>, ...args: never[] ): Partial<Initial> | undefined
};
