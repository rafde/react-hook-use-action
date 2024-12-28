import type { CTAState, } from './CTAState';

/**
 * An `object` representing the history of hook state changes.
 *
 * @readonly
 * @template {CTAState} State - The state type extending CTAState
 * @property {CTAState} current - The current hook state
 * @property {CTAState | null} previous - The previous `current` hook state, `null` if no previous state exists.
 * @property {CTAState | null} changes - The changes between the `initial` and `current` state.
 * Tracks only modified properties. `null` if no changes.
 * @property {CTAState} initial - The initial hook state when it was first rendered.
 * @property {CTAState | null} previousInitial - The previous `initial` state. `null` if never no previous initial exists
 */
export type CTAHistory<State extends CTAState,> = Readonly<{
	current: Readonly<State>
	previous: Readonly<State> | null
	changes: Readonly<Partial<State>> | null
	initial: Readonly<State>
	previousInitial: Readonly<State> | null
}>;
