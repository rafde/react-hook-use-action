import { CTAGenericCallback, } from './CTAGenericCallback';

export type CTAGenericRecord<
	Initial
> = Record<
	string | number,
	CTAGenericCallback<Initial>
>;
