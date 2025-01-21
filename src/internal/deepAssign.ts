import escapeDots from './escapeDots';
import isPlainObject from './isPlainObject';

export default function deepAssign<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string | number | symbol, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends Record<string | number | symbol, any>,
>(
	target: T,
	source: S,
	key?: string | number,
): ( T & S ) {
	const result = target;
	const keys = key == null ? [] : [key,];

	for ( const sourceKey in source ) {
		const sourceValue = source[ sourceKey ];
		const targetValue = target[ sourceKey ];
		const keyPath = [...keys, escapeDots( sourceKey, ),].join( '.', );

		if ( isPlainObject( sourceValue, ) && isPlainObject( targetValue, ) ) {
			result[ sourceKey ] = deepAssign(
				targetValue,
				sourceValue,
				keyPath,
			);
		}
		else if ( !( sourceKey in result ) ) {
			result[ sourceKey ] = sourceValue;
		}
	}

	return result;
}
