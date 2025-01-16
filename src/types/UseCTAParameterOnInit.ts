import { CTAState, } from './CTAState';

/**
 * A `function` than runs once on component mount.
 * Useful when you need to perform calculations or transformations on your {@link CTAHistory}.`initial` state before your component starts using it.
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @param {CTAState} initial - The {@link CTAHistory}.`initial` state.
 * @returns A new {@link CTAHistory}.`initial` state.
 */
export type UseCTAParameterOnInit<
	Initial extends CTAState,
> = ( initial: Initial ) => Initial;
