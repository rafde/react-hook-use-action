import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { CustomCTAHistoryParam, } from './CustomCTAHistoryParam';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { DispatchValueActionPayloadArgsProps, } from './DispatchValueActionPayloadArgsProps';
import type { Immutable, } from './Immutable';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';

type PayloadValues<
	Initial extends CTAState,
	ActionType extends keyof DefaultActionsRecord<Initial>,
	Payload = Parameters<DefaultActionsRecord<Initial>[ActionType]>[1],
> = Payload | (
	( ctaPayloadCallbackParameter: CTAHistory<Initial> ) => Payload | undefined
);

export type DispatchCTAFlatUpdateRecord<
	Initial extends CTAState,
	ReturnValue = void,
> = {
	update(
		payload: PayloadValues<Initial, 'update'>,
	): ReturnValue
};

export type DispatchCTABaseDefaultRecord<
	Initial extends CTAState,
	ReturnValue = void,
> = Readonly<{
	reset(
		payload?: PayloadValues<Initial, 'reset'>,
	): ReturnValue
	updateInitial(
		payload: PayloadValues<Initial, 'updateInitial'>,
	): ReturnValue
	replace(
		payload: PayloadValues<Initial, 'replace'>,
	): ReturnValue
	replaceInitial(
		payload: PayloadValues<Initial, 'replaceInitial'>,
	): ReturnValue
}>;

export type DispatchCTADefaultRecord<
	Initial extends CTAState,
	ReturnValue = void,
> = DispatchCTABaseDefaultRecord<
	Initial,
	ReturnValue
> & Readonly<{
	update(
		key: keyof Initial,
		value: Initial[keyof Initial],
	): ReturnValue
	update(
		payload: PayloadValues<Initial, 'update'>,
		value?: never,
	): ReturnValue
}>;

export type UpdateInitialCTAProps<
	Initial extends CTAState,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial>['updateInitial']
	>
> & {
	type: 'updateInitial'
	args?: never
};

export type ResetCTAProps<
	Initial extends CTAState,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial>['reset']
	>
> & {
	type: 'reset'
	args?: never
};

export type UpdateCTAProps<
	Initial extends CTAState,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTAFlatUpdateRecord<Initial>['update']
	>
> & {
	type: 'update'
	args?: never
};

export type ReplaceCTAProps<
	Initial extends CTAState,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial>['replace']
	>
> & {
	type: 'replace'
	args?: never
};

export type ReplaceInitialCTAProps<
	Initial extends CTAState,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial>['replaceInitial']
	>
> & {
	type: 'replaceInitial'
	args?: never
};

export type DefaultCTAProps<
	Initial extends CTAState,
> = UpdateInitialCTAProps<Initial> |
ResetCTAProps<Initial> |
UpdateCTAProps<Initial> |
ReplaceCTAProps<Initial> |
ReplaceInitialCTAProps<Initial>;

type CustomCTARecord<
	Initial extends CTAState,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ...args: infer Args ) => CustomCTAReturnType<Initial> ? (
		Args extends []
			// Represents CTA object without arguments.
			? Action
			: (
				// Represents CTA object optional CustomCTAStateParam.
				[undefined,] extends Args
					? Action
					: (
						Args extends [...infer A,]
							? (
								// Represents CustomCTAStateParam with at least one argument
								A[0] extends CustomCTAHistoryParam<Initial, Actions> ? Action : never
							)
							: never
					)
			)
	) : never]: Actions[Action];
};

type DispatchCustomCTARecordValues<
	Initial extends CTAState,
	ActionValue,
	ReturnValue = void,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ActionValue extends ( ( ctaParam: any, ...args: infer Args ) => CustomCTAReturnType<Initial> ) ? (
	Args extends []
		// Represents CTA object without arguments.
		? ( () => ReturnValue )
		: (
			Args extends [unknown?, ...infer A,]
				? ( ( payload?: Args[0] | ( ( payloadParameter: CTAHistory<Initial> ) => Args[0] | undefined ), ...args: A ) => ReturnValue )
				: Args extends [infer Payload, ...infer A,] ? (
					Payload extends undefined
					// Represents CTA object optional payload.
						? ( ( payload?: Payload | ( ( payloadParameter: CTAHistory<Initial> ) => Payload | undefined ), ...args: A ) => ReturnValue )
					// Represents CTA object a payload.
						: ( payload: Payload | ( ( payloadParameter: CTAHistory<Initial> ) => Payload | undefined ), ...args: A ) => ReturnValue
				) : never
		)
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

export type UseCTAReturnTypeDispatchCTA<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
> = Readonly<
	OmitEmptyRecord<
		DispatchCustomCTARecord<Initial, Actions, ReturnValue> &
		DispatchCTADefaultRecord<Initial, ReturnValue>
	>
>;

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
> = ( value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial>, never> ) => ReturnValue;

export type UseCTAReturnTypeDispatch<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
> = Immutable<
	DispatchCTA<Initial, Actions, ReturnValue> & {
		cta: UseCTAReturnTypeDispatchCTA<Initial, Actions, ReturnValue>
		state: CTAHistory<Initial>
	}
>;
