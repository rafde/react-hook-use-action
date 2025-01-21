import {
	ReplaceActionType,
	ReplaceInitialActionType,
	ResetActionType,
	UpdateActionType,
	UpdateInitialActionType,
} from '../internal/ActionTypes';
import { ActionTypeOptions, } from './ActionTypeConstructParam';
import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { DeepUpdateActionRecord, } from './DeepUpdateActionRecord';
import { DeepUpdateInitialActionRecord, } from './DeepUpdateInitialActionRecord';
import type { Immutable, } from './Immutable';

export type CustomCTAHistory<
	Payload extends CTAState,
> = CTAHistory<Payload> & Immutable<
	DeepUpdateActionRecord<Payload>
	&
	DeepUpdateInitialActionRecord<Payload>
	&
	{
		replaceAction: ( payload: Payload, actionTypeOptions?: ActionTypeOptions ) => ReplaceActionType<Payload>
		replaceInitialAction: ( payload: Payload, actionTypeOptions?: ActionTypeOptions ) => ReplaceInitialActionType<Payload>
		resetAction: ( payload?: ( Payload | undefined ), actionTypeOptions?: ActionTypeOptions ) => ResetActionType<Payload>
		updateAction: ( payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions ) => UpdateActionType<Payload>
		updateInitialAction: ( payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions ) => UpdateInitialActionType<Payload>
	}
>;
