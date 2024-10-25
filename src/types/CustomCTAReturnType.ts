import {
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
	UpdateInitialActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<
	Initial extends CTAInitial,
> = undefined |
ReplaceActionType<Initial> |
ReplaceInitialActionType<Initial> |
ResetActionType<Initial> |
UpdateActionType<Initial> |
UpdateInitialActionType<Initial> |
Partial<Initial>;
