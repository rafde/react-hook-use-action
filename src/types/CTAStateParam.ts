import type { CTAInitial, } from './CTAInitial';
import { CustomCTAStateParam, } from './CustomCTAStateParam';

export type CTAStateParam<Initial extends CTAInitial,> = Readonly<
	Pick<
		CustomCTAStateParam<Initial>,
		'changes' | 'current' | 'initial' | 'previous' | 'options'
	>
>;
