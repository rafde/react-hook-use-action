import {
	ActionTypeOptions,
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
	UpdateInitialActionType,
} from '../internal/ActionTypes';
import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { Immutable, } from './Immutable';

export type CustomCTAHistory<
	Payload extends CTAState,
> = CTAHistory<Payload> & Immutable<{
	replaceAction: ( payload: Payload, actionTypeOptions?: ActionTypeOptions ) => ReplaceActionType<Payload>
	replaceInitialAction: ( payload: Payload, actionTypeOptions?: ActionTypeOptions ) => ReplaceInitialActionType<Payload>
	resetAction: ( payload?: ( Payload | undefined ), actionTypeOptions?: ActionTypeOptions ) => ResetActionType<Payload>
	updateAction: ( payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions ) => UpdateActionType<Payload>
	updateInitialAction: ( payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions ) => UpdateInitialActionType<Payload>
}>;
