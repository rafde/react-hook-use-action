import type { DefaultCTARecord, } from './CTADefaults';
import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';

export type CustomCTARecord<
	Initial extends CTAInitial
> = Omit<
	CTARecord<Initial>,
	keyof DefaultCTARecord<Initial>
>
