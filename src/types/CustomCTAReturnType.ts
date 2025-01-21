import {
	DeepUpdateActionType,
	DeepUpdateInitialActionType,
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
	UpdateInitialActionType,
} from '../internal/ActionTypes';
import type { CTAState, } from './CTAState';

export type CustomCTAReturnType<
	Initial extends CTAState,
> = undefined |
	DeepUpdateActionType<Initial> |
	DeepUpdateInitialActionType<Initial> |
	ReplaceActionType<Initial> |
	ReplaceInitialActionType<Initial> |
	ResetActionType<Initial> |
	UpdateActionType<Initial> |
	UpdateInitialActionType<Initial> |
	Partial<Initial>;
