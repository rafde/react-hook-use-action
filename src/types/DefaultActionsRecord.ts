import type { CTAState, } from './CTAState';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './UseCTAParameterActionsOptionalDefaultRecord';

export type DefaultActionsRecord<
	Payload extends CTAState,
> = Required<UseCTAParameterActionsOptionalDefaultRecord<Payload>>;
