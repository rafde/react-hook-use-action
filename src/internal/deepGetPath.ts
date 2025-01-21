import type { CTAState, } from '../types/CTAState';
import type { GetPathValue, } from '../types/GetPathValue';
import type { NestedKeyArray, } from '../types/NestedKeyArray';
import type { NestedKeys, } from '../types/NestedKeys';
import deepGetArrayPath from './deepGetArrayPath';
import splitPath from './splitPath';
import unescapeDots from './unescapeDots';

export default function deepGetPath<
	State extends CTAState,
	Path extends NestedKeys<State> | string | number,
>( state: State, path: Path, ) {
	const segments = splitPath( path as string, );

	return deepGetArrayPath(
		state,
		segments as NestedKeyArray<State>,
		unescapeDots,
	) as GetPathValue<State, Path>;
}
