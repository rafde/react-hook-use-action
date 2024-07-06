import { ReplaceActionType, ReplaceInitialActionType, ResetActionType, UpdateActionType, } from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<Initial extends CTAInitial, Actions = undefined,> = undefined |
	ReplaceActionType<Initial, Actions> |
	ReplaceInitialActionType<Initial, Actions> |
	ResetActionType<Initial, Actions> |
	UpdateActionType<Initial, Actions> |
	Partial<Initial>;
