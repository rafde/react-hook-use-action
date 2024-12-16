import { strictDeepEqual, } from 'fast-equals';
import type { CTAState, } from './CTAState';

export type UseCTAParameterCompare<Initial extends CTAState,> = (
	a: unknown,
	b: unknown,
	extra: {
		cmp: typeof strictDeepEqual
		key: keyof Initial
	}
) => boolean;
