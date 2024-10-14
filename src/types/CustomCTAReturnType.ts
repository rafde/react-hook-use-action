import type {
	UpdateInitialActionType,
	ResetActionType,
	UpdateActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';

export type CustomCTAReturnType<
	Initial extends CTAInitial,
> = undefined | UpdateInitialActionType<Initial> |
ResetActionType<Initial> |
UpdateActionType<Initial> |
Partial<Initial>;
