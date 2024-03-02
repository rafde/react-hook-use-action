import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';

export type DefaultCTARecord<Initial extends CTAInitial> = Required<
	Pick<
		CTARecord<Initial>,
		'replace' | 'replaceInitial' | 'reset' | 'update'
	>
>
