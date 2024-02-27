import { CTAState, } from './CTAState';

export type CTAParams<Initial> = Pick<CTAState<Initial>, 'changes' | 'initial' | 'previous'>;
