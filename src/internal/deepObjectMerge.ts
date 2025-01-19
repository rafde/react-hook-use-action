import type { CompareCallbackReturnType, } from 'src/internal/compareCallback';
import isPlainObject from './isPlainObject';

function wrapDotKey( key: string, ): string {
	return key.includes( '.', ) ? `[${key}]` : key;
}

export default function deepObjectMerge<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string | number | symbol, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends Record<string | number | symbol, any>,
	Compare extends CompareCallbackReturnType,
>(
	target: T,
	source: S,
	compare: Compare,
	key = '',
): ( T & S ) | undefined {
	let hasChanges = false;
	const result = {} as T;

	for ( const targetKey in target ) {
		const targetValue = target[ targetKey ];
		const sourceValue = source[ targetKey as unknown as keyof S ];
		const keyPath = [wrapDotKey( key, ), wrapDotKey( targetKey, ),].join( '.', );

		if ( isPlainObject( sourceValue, ) && isPlainObject( targetValue, ) ) {
			const mergeResult = deepObjectMerge( targetValue, sourceValue, compare, keyPath, );
			if ( mergeResult != null ) {
				hasChanges = true;
				result[ targetKey ] = mergeResult;
				continue;
			}
		}
		else if ( targetKey in source && !compare( targetValue, sourceValue, keyPath, ) ) {
			hasChanges = true;
			result[ targetKey ] = sourceValue as never;
			continue;
		}

		result[ targetKey ] = targetValue;
	}

	return hasChanges ? result : undefined;
}
