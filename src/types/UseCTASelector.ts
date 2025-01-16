import type { CTAHistory, } from './CTAHistory';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';
import type { CTAState, } from './CTAState';

import type { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFunc';
import type { UseCTAReturnType, } from './UseCTAReturnType';

export type CTASelector<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	R = unknown,
> = (
	props: {
		dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>
	} & CTAHistory<Initial>
) => R;

export type UseCTASelector<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
> = (
		<Selector extends CTASelector<
			Initial,
			Actions,
			FR
		> = CTASelector<
			Initial,
			Actions,
			FR,
			UseCTAReturnType<Initial, Actions, FR, void>>,
		>( selector?: Selector ) => ReturnType<Selector>
	) & {
		dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>
		getHistory: () => CTAHistory<Initial>
	};
