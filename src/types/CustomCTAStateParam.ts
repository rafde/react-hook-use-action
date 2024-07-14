import {
	createUpdateInitialActionType,
	createResetActionType,
	createUpdateActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { Immutable, } from './Immutable';

export type CustomCTAStateParam<
	Initial extends CTAInitial,
	Actions,
> = CTAState<Initial> & Immutable<{
	updateAction: typeof createUpdateActionType<Initial, Actions>
	updateInitialAction: typeof createUpdateInitialActionType<Initial, Actions>
	resetAction: typeof createResetActionType<Initial, Actions>
}>;
