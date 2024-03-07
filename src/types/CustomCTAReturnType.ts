import { ReplaceActionType, ReplaceInitialActionType, ResetActionType, UpdateActionType, } from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<Initial extends CTAInitial,> = undefined |
	ReplaceActionType<Initial> |
	ReplaceInitialActionType<Initial> |
	ResetActionType<Initial> |
	UpdateActionType<Initial> |
	Partial<Initial>;
