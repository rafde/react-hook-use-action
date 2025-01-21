export default function createObjectFromArray<
	T,
	CleanKey extends ( ( key: string ) => string ) = ( key: string ) => string ,
>(
	segments: string[],
	value: T,
	cleanKey?: CleanKey,
) {
	const _cleanKey = typeof cleanKey === 'function' ? cleanKey : ( key: string, ) => key;
	const result = {} as Record<string, Record<string, unknown> | T>;
	const lastIndex = segments.length - 1;

	let current = result;
	let index = 0;
	for ( const key of segments ) {
		const cleanKey = _cleanKey( key, );
		if ( lastIndex === index ) {
			current[ cleanKey ] = value as T;
			break;
		}
		index++;
		current[ cleanKey ] = {};
		current = current[ cleanKey ] as Record<string, Record<string, unknown> | T>;
	}

	return result;
}
