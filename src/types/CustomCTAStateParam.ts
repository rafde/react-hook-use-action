import {
	createReplaceActionType,
	createReplaceInitialActionType,
	createResetActionType,
	createUpdateActionType,
	createUpdateInitialActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { Immutable, } from './Immutable';

export type CustomCTAStateParam<
	Initial extends CTAInitial,
	Actions,
> = CTAState<Initial> & Immutable<{
	replaceAction: ReturnType<typeof createReplaceActionType<Initial, Actions>>
	replaceInitialAction: ReturnType<typeof createReplaceInitialActionType<Initial, Actions>>
	resetAction: ReturnType<typeof createResetActionType<Initial, Actions>>
	updateAction: ReturnType<typeof createUpdateActionType<Initial, Actions>>
	updateInitialAction: ReturnType<typeof createUpdateInitialActionType<Initial, Actions>>
}>;
