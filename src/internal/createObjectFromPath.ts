import createObjectFromArray from './createObjectFromArray';
import splitPath from './splitPath';
import unescapeDots from './unescapeDots';

export default function createObjectFromPath<T,>( path: string, value: T, ) {
	const segments = splitPath( path, );
	return createObjectFromArray( segments, value, unescapeDots, );
}
