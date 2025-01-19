import createObjectFromArray from './createObjectFromArray';

export default function createObjectFromArrayPath<T,>(
	segments: string[],
	value: T,
) {
	return createObjectFromArray( segments, value, );
}
