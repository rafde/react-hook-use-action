import type { BuiltInActions, } from './BuiltInActions';
import type { CTAState, } from './CTAState';
import type { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

export type UseCTAParameterActionsOptionalDefaultRecord<Payload extends CTAState, > = Pick<
	UseCTAParameterActionsRecordProp<Payload>,
	BuiltInActions
>;
