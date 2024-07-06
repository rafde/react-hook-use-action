import {
	createReplaceActionType,
	createReplaceInitialActionType,
	createResetActionType,
	createUpdateActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';
import { OptionsParams, } from './OptionsParams';

export type CustomCTAStateParam<
	Initial extends CTAInitial,
	Actions = undefined,
> = Readonly<{
	initial: Readonly<Initial>
	current: Readonly<Initial>
	previous: Readonly<Initial>
	changes: Readonly<Partial<Initial>> | null
	options?: Readonly<OptionsParams>
	updateAction: typeof createUpdateActionType<Initial, Actions>
	replaceAction: typeof createReplaceActionType<Initial, Actions>
	replaceInitialAction: typeof createReplaceInitialActionType<Initial, Actions>
	resetAction: typeof createResetActionType<Initial, Actions>
}>;
