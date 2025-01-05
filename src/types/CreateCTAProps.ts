import type { CTAState, } from './CTAState';
import { UseCTAParameterDefaults, } from './UseCTAParameterDefaults';

type CreateCTAPropsDefaults<Initial extends CTAState,> = Pick<
	UseCTAParameterDefaults<Initial>,
	'initial' | 'compare' | 'afterActionChange' | 'transform'
>;

export type CreateCTAProps<
	Initial extends CTAState,
	Actions,
> = Actions extends undefined ? (
	CreateCTAPropsDefaults<Initial> & {
		actions?: undefined
	}
) : (
	CreateCTAPropsDefaults<Initial> & {
		actions: Actions
	}
);
