import type { CTAInitial, } from './CTAInitial';
import type { CustomCTAStateParam, } from './CustomCTAStateParam';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';

export type UseCTAParameterActionsCustomRecord<
	Initial extends CTAInitial,
> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[customAction: string | number]: ( ctaState: CustomCTAStateParam<Initial, undefined>, ...args: any[] ) => CustomCTAReturnType<Initial>
};

export type UseCTAParameterActionsRecordProp<
	Initial extends CTAInitial,
> = Partial<DefaultActionsRecord<Initial>> & UseCTAParameterActionsCustomRecord<Initial>;

type CustomActionsRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>>]: ( ctaState: CustomCTAStateParam<Initial, Actions>, ...args: any[] ) => CustomCTAReturnType<Initial, Actions>
};

export type ActionsRecordProp<
	Initial extends CTAInitial,
	Actions extends Partial<DefaultActionsRecord<Initial>>,
> = Partial<DefaultActionsRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
