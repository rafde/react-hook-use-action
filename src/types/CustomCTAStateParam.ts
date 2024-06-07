import {
	ActionTypeConstructParam,
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
} from '../internal/ActionTypes';
import type { CTAInitial, } from './CTAInitial';
import { OptionsParams, } from './OptionsParams';

export type CustomCTAStateParam<Initial extends CTAInitial,> = Readonly<{
	initial: Readonly<Initial>
	current: Readonly<Initial>
	previous: Readonly<Initial>
	changes: Readonly<Partial<Initial>> | null
	options?: Readonly<OptionsParams>
	updateAction( result: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options'] ): UpdateActionType<Initial>
	replaceAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ReplaceActionType<Initial>
	replaceInitialAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ReplaceInitialActionType<Initial>
	resetAction( result: Initial, options?: ActionTypeConstructParam<Initial>['options'] ): ResetActionType<Initial>
}>;
