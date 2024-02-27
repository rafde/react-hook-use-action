import { CTAParams, } from './CTAParams';

export type CTAGenericCallback<Initial> = ( (
	ctaParams: CTAParams<Initial>,
	// Needs to be any in order to take any param.
	payload: any // eslint-disable-line
) => Partial<Initial> | undefined );
