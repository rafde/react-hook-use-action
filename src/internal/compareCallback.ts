import { strictDeepEqual, } from 'fast-equals';
import { UseCTAParameter, } from '../types/UseCTAParameter';

export function compareCallback( compare?: UseCTAParameter<Record<string, unknown>, undefined>['compare'], ): typeof strictDeepEqual {
	if ( typeof compare !== 'function' ) {
		return strictDeepEqual;
	}

	return function cmp( previousValue, nextValue, ) {
		return Boolean( compare( previousValue, nextValue, strictDeepEqual, ), );
	};
}

export type CompareCallbackReturnType = ReturnType<typeof compareCallback>;
