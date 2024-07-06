import type { CTAInitial, } from './CTAInitial';
import type { CustomCTAStateParam, } from './CustomCTAStateParam';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import { DefaultActionsRecord, } from './DefaultActionsRecord';

export type UseCTAParameterActionsCustomRecord<
	Initial extends CTAInitial,
> = {
	[customAction: string | number]: (
		(
			ctaParam: CustomCTAStateParam<Initial, undefined>,
			// Needs to be `any` in order to take any type.
			payload?: any, // eslint-disable-line
			...args: never[]
		) => CustomCTAReturnType<Initial>
	)
};

export type UseCTAParameterActionsRecordProp<
	Initial extends CTAInitial,
> = Partial<DefaultActionsRecord<Initial>> & UseCTAParameterActionsCustomRecord<Initial>;

type CustomActionsRecord<
	Initial extends CTAInitial,
	Actions extends Partial<DefaultActionsRecord<Initial>>,
> = {
	[customAction: string | number]: (
		(
			ctaParam: CustomCTAStateParam<Initial, Actions>,
			// Needs to be `any` in order to take any type.
			payload?: any, // eslint-disable-line
			...args: never[]
		) => CustomCTAReturnType<Initial, Actions>
	)
};

export type ActionsRecordProp<
	Initial extends CTAInitial,
	Actions extends Partial<DefaultActionsRecord<Initial>>,
> = Partial<DefaultActionsRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
