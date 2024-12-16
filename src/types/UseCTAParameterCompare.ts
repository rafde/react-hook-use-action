import { strictDeepEqual, } from 'fast-equals';
import type { CTAInitial, } from './CTAInitial';

export type UseCTAParameterCompare<Initial extends CTAInitial,> = (
	a: unknown,
	b: unknown,
	extra: {
		cmp: typeof strictDeepEqual
		key: keyof Initial
	}
) => boolean;
