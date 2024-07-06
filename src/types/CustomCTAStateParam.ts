import {
	createReplaceActionType,
	createReplaceInitialActionType,
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
	replaceAction: typeof createReplaceActionType<Initial, Actions>
	replaceInitialAction: typeof createReplaceInitialActionType<Initial, Actions>
	resetAction: typeof createResetActionType<Initial, Actions>
}>;
