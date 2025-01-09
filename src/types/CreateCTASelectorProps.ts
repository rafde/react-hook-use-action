import type { CTAState, } from './CTAState';
import { UseCTAParameterDefaults, } from './UseCTAParameterDefaults';

export type CreateCTASelectorProps<
	Initial extends CTAState,
	Actions,
> = {
	actions?: Actions
} & Pick<
	UseCTAParameterDefaults<Initial>,
	'initial' | 'compare' | 'afterActionChange' | 'transform'
>;
