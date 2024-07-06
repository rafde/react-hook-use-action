import type { CTAInitial, } from './CTAInitial';
import { DefaultActionsRecord, } from './DefaultActionsRecord';

export type UseCTAParameterActionsPredefinedRecord<Initial extends CTAInitial,> = Partial<DefaultActionsRecord<Initial>>;
