import type { CTAState, } from './CTAState';
import { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

export type UseCTAParameterActionsOptionalDefaultRecord<Payload extends CTAState, > = Pick<
	UseCTAParameterActionsRecordProp<Payload>,
	'update' | 'replace' | 'reset' | 'updateInitial' | 'replaceInitial'
>;
