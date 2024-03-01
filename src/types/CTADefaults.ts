import { CTARecord, } from './CTARecord';

export type DefaultCTARecord<Initial> = Required<
	Pick<
		CTARecord<Initial>,
		'replace' | 'replaceInitial' | 'reset' | 'update'
	>
>
