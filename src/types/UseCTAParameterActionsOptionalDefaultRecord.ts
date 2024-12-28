import type { CTAState, } from './CTAState';
import { UseCTAParameterActionsOptionalRecordProp, } from './UseCTAParameterActionsOptionalRecordProp';

export type UseCTAParameterActionsOptionalDefaultRecord<Payload extends CTAState, > = Pick<
	UseCTAParameterActionsOptionalRecordProp<Payload>,
	'update' | 'replace' | 'reset' | 'updateInitial' | 'replaceInitial'
>;
