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
	updateAction: ReturnType<typeof createUpdateActionType<Initial, Actions>>
	updateInitialAction: ReturnType<typeof createUpdateInitialActionType<Initial, Actions>>
	resetAction: ReturnType<typeof createResetActionType<Initial, Actions>>
}>;
