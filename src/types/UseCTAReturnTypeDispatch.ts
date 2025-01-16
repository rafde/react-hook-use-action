import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { DispatchCTA, } from './DispatchCTA';
import type { DispatchValueActionPayloadArgsProps, } from './DispatchValueActionPayloadArgsProps';
import type { Immutable, } from './Immutable';

import type { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFunc';

type CustomCTARecord<
	Initial extends CTAState,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ...args: infer Args ) => CustomCTAReturnType<Initial> ? (
		Args extends []
			// Action without arguments.
			? Action
			: (
				Args extends [...infer A,]
					? (
						// Represents cta with at least one argument that is CustomCTAHistory
						A[0] extends CustomCTAHistory<Initial> ? Action : never
					)
					: never
			)
	) : never]: Actions[Action];
};

type DispatchCustomCTARecordValues<
	Initial extends CTAState,
	ActionValue,
	ReturnValue,
> = ActionValue extends ( ( ctaParam: CustomCTAHistory<Initial>, ...args: infer Args ) => CustomCTAReturnType<Initial> ) ? (
	Args extends []
		// Represents CTA without arguments.
		? ( () => ReturnValue )
		: ( ( ...args: Args ) => ReturnValue )
) : never;

type DispatchCustomCTARecord<
	Initial extends CTAState,
	Actions,
	ReturnValue,
	CustomActions = CustomCTARecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ?
	CustomActions : {
		[Action in keyof CustomActions]: DispatchCustomCTARecordValues<
			Initial,
			CustomActions[Action],
			ReturnValue
		>
	};

type CustomDispatchValueRecord<
	Initial extends CTAState,
	Actions,
	ReturnValue,
	CustomActions = DispatchCustomCTARecord<Initial, Actions, ReturnValue>,
> = CustomActions extends Record<string | number | symbol, never> ?
	CustomActions : {
		[Action in keyof CustomActions]: (
			CustomActions[Action] extends ( ( ...args: infer Args ) => void )
				? DispatchValueActionPayloadArgsProps<Args>
				: never
		) & {
			type: Action
		}
	};

type CustomDispatchValueRecordValues<
	Initial extends CTAState,
	Actions,
	ReturnValue,
	CustomActions = CustomDispatchValueRecord<Initial, Actions, ReturnValue>,
> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];

export type Dispatch<
	Payload extends CTAState,
	Actions,
	ReturnValue,
> = ( // dispatch
	value: Exclude<
		{
			type: 'replaceInitial' | 'replace'
			payload: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
			args?: never
		}
		| {
			type: 'update' | 'updateInitial'
			payload: Partial<Payload> | ( ( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined )
			args?: never
		}
		| {
			type: 'reset'
			payload?: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
			args?: never
		}
		// Custom action without args
		// {type: 'Your Action without args'}

		// Custom action with one arg
		// {type: 'Your Action without args', payload: 'your payload'}

		// Custom action with multiple args
		// {type: 'Your Action without args', payload: 'your payload', args:['more args']}
		| CustomDispatchValueRecordValues<Payload, Actions, ReturnValue>,
		never
	>
) => ReturnValue;

/**
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * @template {CTAState} State - CTAState type.
 * @template Actions - CTA actions type.
 * @template ReturnValue - Return value type.
 */
export type UseCTAReturnTypeDispatch<
	State extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnValue,
> = Immutable<
	DispatchCTA<State, Actions, ReturnValue> & {
		func: FR
	}
>;
