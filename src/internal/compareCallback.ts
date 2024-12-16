import { strictDeepEqual, } from 'fast-equals';
import type { CTAState, } from '../types/CTAState';
import { UseCTAParameter, } from '../types/UseCTAParameter';

type StrictDeepEqualParameters = Parameters<typeof strictDeepEqual>;

export function compareCallback<Initial extends CTAState,>( compare?: UseCTAParameter<Initial, undefined>['compare'], ) {
	if ( typeof compare !== 'function' ) {
		return function cmp( previousValue: StrictDeepEqualParameters[0], nextValue: StrictDeepEqualParameters[1], ) {
			return strictDeepEqual( previousValue, nextValue, );
		};
	}

	return function cmp( previousValue: StrictDeepEqualParameters[0], nextValue: StrictDeepEqualParameters[1], key: keyof Initial, ) {
		return Boolean( compare(
			previousValue,
			nextValue,
			{
				cmp: strictDeepEqual,
				key,
			},
		), );
	};
}

export type CompareCallbackReturnType = ReturnType<typeof compareCallback>;
