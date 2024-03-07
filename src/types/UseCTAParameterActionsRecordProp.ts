import type { CTAInitial, } from './CTAInitial';
import type { CustomCTAParam, } from './CustomCTAParam';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { UseCTAReturnTypeDispatchState, } from './UseCTAReturnTypeDispatch';

type UseCTAParameterPredefinedActionsRecord<Initial extends CTAInitial,> = {
	replace?: ( ctaParam: UseCTAReturnTypeDispatchState<Initial>, payload: Initial ) => Initial | undefined
	replaceInitial?: ( CTAParam: UseCTAReturnTypeDispatchState<Initial>, payload: Initial ) => Initial | undefined
	reset?: ( CTAParam: UseCTAReturnTypeDispatchState<Initial>, payload?: Initial ) => Initial | undefined
	update?: ( CTAParam: UseCTAReturnTypeDispatchState<Initial>, payload: Partial<Initial> ) => Partial<Initial> | undefined
};

export type UseCTAParameterCustomActionsRecord<Initial extends CTAInitial,> = {
	[customAction: string | number]: (
		(
			ctaParam: CustomCTAParam<Initial>,
			// Needs to be `any` in order to take any type.
			payload?: any // eslint-disable-line
		) => CustomCTAReturnType<Initial>
	)
};

export type UseCTAParameterActionsRecordProp<Initial extends CTAInitial,> = UseCTAParameterCustomActionsRecord<Initial> &
	UseCTAParameterPredefinedActionsRecord<Initial>;
