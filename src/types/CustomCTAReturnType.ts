import { UpdateInitialActionType, ResetActionType, UpdateActionType, } from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<
	Initial extends CTAInitial,
	Actions = undefined,
> = undefined | UpdateInitialActionType<Initial, Actions> |
ResetActionType<Initial, Actions> |
UpdateActionType<Initial, Actions> |
Partial<Initial>;
