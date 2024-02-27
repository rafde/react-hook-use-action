import { DefaultCTARecord, } from './CTADefaults';
import { CTAGenericRecord, } from './CTAGenericRecord';

export type CTARecord<
	Initial
> = CTAGenericRecord<Initial> & Partial<DefaultCTARecord<Initial>>;
