import type { CTAState, } from '../types/CTAState';
import type { GetArrayValue, } from '../types/GetArrayValue';
import type { NestedKeyArray, } from '../types/NestedKeyArray';
import isPlainObject from './isPlainObject';

export default function deepGetArrayPath<
	State extends CTAState,
	ArrayPath extends NestedKeyArray<State> | Array<string | number>,
	CleanKey extends ( ( key: string ) => string ) = ( key: string ) => string,
>(
	state: State,
	arrayPath: ArrayPath,
	cleanKey?: CleanKey,
) {
	const _cleanKey = typeof cleanKey === 'function' ? cleanKey : ( key: string | number, ) => key;
	let memo = state;
	for ( const key of arrayPath ) {
		if ( isPlainObject( memo, ) || Array.isArray( memo, ) ) {
			memo = memo[ _cleanKey( key as string, ) ] as never;
			continue;
		}
		break;
	}

	return memo as GetArrayValue<State, ArrayPath>;
}
