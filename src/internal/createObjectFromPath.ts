import createObjectFromArray from './createObjectFromArray';

function cleanPath( path: string, ) {
	return path.replace( /\\\./g, '.', );
}

export default function createObjectFromPath<T,>( path: string, value: T, ) {
	const segments = path.split( /(?<!\\)\./, );
	return createObjectFromArray( segments, value, cleanPath, );
}
