import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { DispatchValueActionPayloadArgsProps, } from './DispatchValueActionPayloadArgsProps';
import type { Immutable, } from './Immutable';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';

export type DispatchCTADefaultRecord<
	Initial extends CTAState,
	ReturnValue = void,
> = UseCTAReturnTypeDispatch<Initial, undefined, ReturnValue>['cta'];

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
	ReturnValue = void,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ActionValue extends ( ( ctaParam: CustomCTAHistory<Initial>, ...args: infer Args ) => CustomCTAReturnType<Initial> ) ? (
	Args extends []
		// Represents CTA without arguments.
		? ( () => ReturnValue )
		: ( ( ...args: Args ) => ReturnValue )
) : never;

export type DispatchCustomCTARecord<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
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
	CustomActions = DispatchCustomCTARecord<Initial, Actions>,
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

export type CustomDispatchValueRecordValues<
	Initial extends CTAState,
	Actions,
	CustomActions = CustomDispatchValueRecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];

export type DispatchCTA<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
> = ( // dispatch
	value: Exclude<
		{
			type: 'replaceInitial' | 'replace'
			payload: Initial | ( ( ctaHistory: CTAHistory<Initial> ) => Initial | undefined )
			args?: never
		}
		| {
			type: 'update' | 'updateInitial'
			payload: Partial<Initial> | ( ( ctaHistory: CTAHistory<Initial> ) => Partial<Initial> | undefined )
			args?: never
		}
		| {
			type: 'reset'
			payload?: Initial | ( ( ctaHistory: CTAHistory<Initial> ) => Initial | undefined )
			args?: never
		}
		// Custom action without args
		// {type: 'Your Action without args'}

		// Custom action with one arg
		// {type: 'Your Action without args', payload: 'your payload'}

		// Custom action with multiple args
		// {type: 'Your Action without args', payload: 'your payload', args:['more args']}
		| CustomDispatchValueRecordValues<Initial, Actions>,
		never
	>
) => ReturnValue;

export type UseCTAReturnTypeDispatch<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
> = Immutable<
	DispatchCTA<Initial, Actions, ReturnValue> & {
		// CTAHistory reference
		history: CTAHistory<Initial>

		cta: OmitEmptyRecord<{
			// built-in actions
			update( payload: Partial<Initial> | ( ( ctaHistory: CTAHistory<Initial> ) => Partial<Initial> | undefined ), _?: never ): ReturnValue
			update<K extends keyof Initial,>( key: K, value: Initial[K] ): ReturnValue

			replace( payload: Initial | ( ( ctaHistory: CTAHistory<Initial> ) => Initial | undefined ) ): ReturnValue

			updateInitial( payload: Partial<Initial> | ( ( ctaHistory: CTAHistory<Initial> ) => Partial<Initial> | undefined ), _?: never ): ReturnValue
			updateInitial<K extends keyof Initial,>( key: K, value: Initial[K] ): void

			replaceInitial( payload: Initial | ( ( ctaHistory: CTAHistory<Initial> ) => Initial | undefined ) ): ReturnValue

			reset( payload?: Initial | ( ( ctaHistory: CTAHistory<Initial> ) => Initial | undefined ) ): ReturnValue

		} & {
			// Custom actions
			[p in keyof Omit<Actions, keyof DefaultActionsRecord<Initial>>]: Actions[p] extends ( ( ctaParam: CustomCTAHistory<Initial>, ...args: infer Args ) => CustomCTAReturnType<Initial> ) ? (
				( ...args: Args ) => ReturnValue
			) : never
		}>
	}
>;
