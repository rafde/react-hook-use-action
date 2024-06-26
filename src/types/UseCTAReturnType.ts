import type { CTAInitial, } from './CTAInitial';
import {
	UseCTAParameterActionsRecordProp,
} from './UseCTAParameterActionsRecordProp';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

export type UseCTAReturnType<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined,
> = [
	Initial,
	UseCTAReturnTypeDispatch<Initial, Actions>,
];
