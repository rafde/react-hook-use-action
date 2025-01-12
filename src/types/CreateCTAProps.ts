import type { CTAState, } from './CTAState';
import type { UseCTAParameter, } from './UseCTAParameter';

export type CreateCTAProps<
	Initial extends CTAState,
	Actions,
> = Pick<
	UseCTAParameter<Initial, Actions>,
	'initial' | 'compare' | 'afterActionChange' | 'transform' | 'actions'
>;
