import { CTAState, } from './CTAState';

export type UseCTAParameterOnInit<Initial extends CTAState, > = ( initial: Initial ) => Initial;
