import {
	ActionTypeConstructParam,
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';
import type { UseCTAReturnTypeDispatchState, } from './UseCTAReturnTypeDispatch';

export type CustomCTAParam<Initial extends CTAInitial,> = UseCTAReturnTypeDispatchState<Initial> & {
	replaceAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ReplaceActionType<Initial>
	replaceInitialAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ReplaceInitialActionType<Initial>
	resetAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ResetActionType<Initial>
	updateAction( result: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options'] ): UpdateActionType<Initial>
};
