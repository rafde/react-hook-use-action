import type { CompareCallbackReturnType, } from './compareCallback';
import escapeDots from './escapeDots';
import isPlainObject from './isPlainObject';

function objectToArray<T,>( obj: Record<number, T> | T[], ): T[] | undefined {
	if ( obj == null ) {
		return;
	}
	if ( Array.isArray( obj, ) ) {
		return obj;
	}
	const a: T[] = [];
	for ( const key in obj ) {
		a[ key ] = obj[ key ];
	}
	return a;
}

function _merge( {
	targetValue,
	sourceValue,
	keys,
	targetKey,
	compare,
	result,
	source,
}: {
	targetValue: unknown
	sourceValue: unknown
	keys: Array<string | number>
	targetKey: string | number
	compare: CompareCallbackReturnType
	result: Record<string | number | symbol, unknown> | Array<unknown>
	source: Record<string | number | symbol, unknown> | Array<unknown>
}, ) {
	const keyPath = [...keys, escapeDots( targetKey, ),].join( '.', );

	if ( Array.isArray( targetValue, ) ) {
		const mergeResult = deepObjectChangeMerge(
			targetValue,
			sourceValue as Array<unknown>,
			compare,
			keyPath,
		);
		if ( mergeResult != null ) {
			result[ targetKey as number ] = mergeResult;
			return true;
		}
	}

	if ( isPlainObject( sourceValue, ) && isPlainObject( targetValue, ) ) {
		const mergeResult = deepObjectChangeMerge(
			targetValue,
			sourceValue,
			compare,
			keyPath,
		);
		if ( mergeResult != null ) {
			result[ targetKey as number ] = mergeResult;
			return true;
		}
	}
	else if ( targetKey in source && !compare( targetValue, sourceValue, keyPath, ) ) {
		result[ targetKey as number ] = sourceValue as never;
		return true;
	}

	result[ targetKey as number ] = targetValue;
}

function mergeArray(
	target: Array<unknown>,
	source: Record<string | number | symbol, unknown> | Array<unknown>,
	keys: Array<string | number>,
	compare: CompareCallbackReturnType,
) {
	let hasChanges = false;
	let result = [] as Array<unknown>;
	const sourceArray = objectToArray( source, );
	if ( sourceArray == null ) {
		return;
	}

	const tLength = target.length;
	const sLength = sourceArray.length;
	for ( let index = 0; index < tLength || index < sLength; index += 1 ) {
		if ( index > tLength ) {
			result = [
				...result,
				...sourceArray.slice( index, ),
			];
			hasChanges = true;
			break;
		}
		if ( index > sLength ) {
			result = [
				...result,
				...target.slice( index, ),
			];
			hasChanges = true;
			break;
		}
		const hasNewMerge = _merge( {
			targetValue: target[ index ],
			sourceValue: source[ index ],
			keys,
			targetKey: index,
			compare,
			result,
			source,
		}, );

		if ( hasNewMerge ) {
			hasChanges = true;
		}
	}

	if ( !hasChanges ) {
		return;
	}

	return result;
}

function mergeObject(
	target: Record<string | number | symbol, unknown>,
	source: Record<string | number | symbol, unknown>,
	keys: Array<string | number>,
	compare: CompareCallbackReturnType,
) {
	let hasChanges = false;
	const result = {};
	for ( const targetKey in target ) {
		const hasNewMerge = _merge( {
			targetValue: target[ targetKey ],
			sourceValue: source[ targetKey ],
			keys,
			targetKey,
			compare,
			result,
			source,
		}, );
		if ( hasNewMerge ) {
			hasChanges = true;
		}
	}

	if ( !hasChanges ) {
		return;
	}

	return result;
}

export default function deepObjectChangeMerge(
	target: Record<string | number | symbol, unknown> | Array<unknown>,
	source: Record<string | number | symbol, unknown> | Array<unknown>,
	compare: CompareCallbackReturnType,
	key?: string | number,
): Record<string | number | symbol, unknown> | Array<unknown> | undefined {
	const keys = key == null ? [] : [key,];

	if ( Array.isArray( target, ) ) {
		return mergeArray(
			target,
			source,
			keys,
			compare,
		);
	}

	return mergeObject(
		target as Record<string | number | symbol, unknown>,
		source as Record<string | number | symbol, unknown>,
		keys,
		compare,
	);
}
