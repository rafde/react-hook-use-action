import { DefaultCTARecord, } from './CTADefaults';
import { CTARecord, } from './CTARecord';

export type CustomCTARecord<
	Initial
> = Omit<
	CTARecord<Initial>,
	keyof DefaultCTARecord<Initial>
>
