import type { CTAInitial, } from './CTAInitial';
import { UseCTAParameterActionsCustomRecord, } from './UseCTAParameterActionsRecordProp';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsCustomRecord<Initial> | undefined = undefined,
> = [
	Initial,
	UseCTAReturnTypeDispatch<Initial, Actions>,
];
