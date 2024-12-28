import type { CTAState, } from './CTAState';
import { UseCTAParameterActionsOptionalDefaultRecord, } from './UseCTAParameterActionsOptionalDefaultRecord';

type CustomActionsRecord<
	Initial extends CTAState,
	Actions,
> = Pick<
	Actions,
	Exclude<
		keyof Actions,
		keyof UseCTAParameterActionsOptionalDefaultRecord<Initial>
	>
>;
export type ActionsRecordProp<
	Initial extends CTAState,
	Actions extends Partial<UseCTAParameterActionsOptionalDefaultRecord<Initial>>,
> = Partial<UseCTAParameterActionsOptionalDefaultRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
