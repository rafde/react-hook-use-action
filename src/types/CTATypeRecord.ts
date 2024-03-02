import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';

export type CTATypeRecord<Initial extends CTAInitial> = undefined | CTARecord<Initial>;
