import {
	createReplaceActionType,
	createReplaceInitialActionType,
	createResetActionType,
	createUpdateActionType,
	createUpdateInitialActionType,
} from '../internal/ActionTypes';
import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { Immutable, } from './Immutable';

export type CustomCTAHistoryParam<
	Initial extends CTAState,
	Actions,
> = CTAHistory<Initial> & Immutable<{
	replaceAction: ReturnType<typeof createReplaceActionType<Initial, Actions>>
	replaceInitialAction: ReturnType<typeof createReplaceInitialActionType<Initial, Actions>>
	resetAction: ReturnType<typeof createResetActionType<Initial, Actions>>
	updateAction: ReturnType<typeof createUpdateActionType<Initial, Actions>>
	updateInitialAction: ReturnType<typeof createUpdateInitialActionType<Initial, Actions>>
}>;
