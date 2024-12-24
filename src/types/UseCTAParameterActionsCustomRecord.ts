import type { CTAState, } from './CTAState';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';

export type UseCTAParameterActionsCustomRecord<
	Initial extends CTAState,
> = {
	[customAction: string | number]: (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		( ctaState: CustomCTAHistory<Initial>, ...args: any[] ) => CustomCTAReturnType<Initial>
	)
	| ( () => Partial<Initial> )
};
