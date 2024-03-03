import type { CTAInitial, } from './CTAInitial';
import type { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

export type DefaultCTARecord<Initial extends CTAInitial> = Required<
	Pick<
		UseCTAParameterActionsRecordProp<Initial>,
		'replace' | 'replaceInitial' | 'reset' | 'update'
	>
>
