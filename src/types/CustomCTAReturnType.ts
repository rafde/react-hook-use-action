import { ReplaceInitialActionType, ResetActionType, UpdateActionType, } from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<
	Initial extends CTAInitial,
	Actions = undefined,
> = undefined | ReplaceInitialActionType<Initial, Actions> |
ResetActionType<Initial, Actions> |
UpdateActionType<Initial, Actions> |
Partial<Initial>;
