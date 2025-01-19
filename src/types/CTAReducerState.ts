import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { BuiltInActions, } from './BuiltInActions';

export type CTAReducerState<Initial extends CTAState, > = CTAHistory<Initial> & {
	changesMap: Map<string | number, unknown>
	actionType: BuiltInActions
	customAction?: string | number
};
