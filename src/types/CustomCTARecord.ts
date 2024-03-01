import type { DefaultCTARecord, } from './CTADefaults';
import type { CTARecord, } from './CTARecord';

export type CustomCTARecord<
	Initial
> = Omit<
	CTARecord<Initial>,
	keyof DefaultCTARecord<Initial>
>
