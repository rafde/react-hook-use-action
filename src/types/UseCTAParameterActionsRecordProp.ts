import type { CTAState, } from './CTAState';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';

export type UseCTAParameterActionsCustomRecord<
	Initial extends CTAState,
> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[customAction: string | number]: ( ( ctaState: CustomCTAHistory<Initial>, ...args: any[] ) => CustomCTAReturnType<Initial> ) | ( () => Partial<Initial> )
};

export type UseCTAParameterActionsRecordProp<
	Initial extends CTAState,
> = Partial<DefaultActionsRecord<Initial>> & UseCTAParameterActionsCustomRecord<Initial>;

type CustomActionsRecord<
	Initial extends CTAState,
	Actions,
> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>>]: ( ( ctaState: CustomCTAHistory<Initial>, ...args: any[] ) => CustomCTAReturnType<Initial> ) | ( () => Partial<Initial> )
};

export type ActionsRecordProp<
	Initial extends CTAState,
	Actions extends Partial<DefaultActionsRecord<Initial>>,
> = Partial<DefaultActionsRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
