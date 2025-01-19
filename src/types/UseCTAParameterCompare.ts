import { strictDeepEqual, } from 'fast-equals';
import type { NestedKeys, } from './NestedKeys';
import type { CTAState, } from './CTAState';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './CTAHistory';

/**
 * A `function` type for custom comparing the previous and next values of a hook state key.
 * Useful for the following scenarios:
 * - Custom equality logic by comparing only specific properties to optimize re-renders.
 * - Handle complex nested objects that need special comparison handling.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param previousValue - A previous value of the {@link CTAHistory}.`current` key.
 * @param nextValue - A next value for a {@link CTAHistory}.`current` key.
 * @param extra - An object containing additional parameters for the comparison:
 * @param extra.cmp - A comparison function using {@link import('fast-equals').strictDeepEqual strictDeepEqual}
 * from {@link import('fast-equals') fast-equals} library.
 * @param extra.key - The corresponding {@link CTAState} key associated with `previousValue` and `nextValue`.
 * @returns `true` if the previous and next values are considered equal, `false` otherwise.
 */
export type UseCTAParameterCompare<State extends CTAState,> = (
	previousValue: unknown,
	nextValue: unknown,
	extra: {
		cmp: typeof strictDeepEqual
		key: NestedKeys<State> | keyof State
	}
) => boolean;
