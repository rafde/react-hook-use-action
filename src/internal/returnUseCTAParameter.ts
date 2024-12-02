import type { CTAInitial, } from '../types/CTAInitial';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';

export function returnUseCTAParameter<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial>,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>( params: UseCTAParameter<Initial, ActionsRecord>, ) {
	return params;
}
