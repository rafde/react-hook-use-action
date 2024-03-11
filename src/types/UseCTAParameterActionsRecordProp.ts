import type { CTAInitial, } from './CTAInitial';
import type { CustomCTAParam, } from './CustomCTAParam';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { UseCTAParameterActionsPredefinedRecord, } from './UseCTAParameterActionsPredefinedRecord';

export type UseCTAParameterActionsCustomRecord<Initial extends CTAInitial,> = {
	[customAction: string | number]: (
		(
			ctaParam: CustomCTAParam<Initial>,
			// Needs to be `any` in order to take any type.
			payload?: any // eslint-disable-line
		) => CustomCTAReturnType<Initial>
	)
};

export type UseCTAParameterActionsRecordProp<Initial extends CTAInitial,> = UseCTAParameterActionsCustomRecord<Initial> &
	UseCTAParameterActionsPredefinedRecord<Initial>;
