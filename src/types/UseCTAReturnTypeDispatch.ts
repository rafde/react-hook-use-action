import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { CustomCTAStateParam, } from './CustomCTAStateParam';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { DispatchValueActionPayloadArgsProps, } from './DispatchValueActionPayloadArgsProps';
import type { Immutable, } from './Immutable';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';
import type { RestAfterFirst, } from './RestAfterFirst';
import type { RestOfArgs, } from './RestOfArgs';

type PayloadValues<
	Initial extends CTAInitial,
	ActionType extends keyof DefaultActionsRecord<Initial>,
	Payload = Parameters<DefaultActionsRecord<Initial>[ActionType]>[1],
> = Payload | (
	( ctaPayloadCallbackParameter: CTAState<Initial> ) => Payload | undefined
);

type DispatchCTAFlatUpdateRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	update(
		payload: PayloadValues<Initial, 'update'>,
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']> : RestOfArgs<DefaultActionsRecord<Initial>['updateInitial']>
	): void
};

type DispatchCTABaseDefaultRecord<
	Initial extends CTAInitial,
	Actions,
> = Readonly<{
	reset(
		payload?: PayloadValues<Initial, 'reset'>,
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'reset'> ? RestOfArgs<Actions['reset']> : RestOfArgs<DefaultActionsRecord<Initial>['reset']>
	): void
	updateInitial(
		payload: PayloadValues<Initial, 'updateInitial'>,
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'updateInitial'> ? RestOfArgs<Actions['updateInitial']> : RestOfArgs<DefaultActionsRecord<Initial>['updateInitial']>
	): void
}>;

export type DispatchCTADefaultRecord<
	Initial extends CTAInitial,
	Actions,
> = DispatchCTABaseDefaultRecord<
	Initial,
	Actions
> & Readonly<{
	update(
		key: keyof Initial,
		value: Initial[keyof Initial],
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']> : never[]
	): void
	update(
		payload: PayloadValues<Initial, 'update'>,
		value?: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']>[0] : never,
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestAfterFirst<RestOfArgs<Actions['update']>> : never[]
	): void
}>;

export type UpdateInitialCTAProps<
	Initial extends CTAInitial,
	Actions,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial, Actions>['updateInitial']
	>
> & {
	type: 'updateInitial'
};

export type ResetCTAProps<
	Initial extends CTAInitial,
	Actions,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTADefaultRecord<Initial, Actions>['reset']
	>
> & {
	type: 'reset'
};

export type UpdateCTAProps<
	Initial extends CTAInitial,
	Actions,
> = DispatchValueActionPayloadArgsProps<
	Parameters<
		DispatchCTAFlatUpdateRecord<Initial, Actions>['update']
	>
> & {
	type: 'update'
};

export type DefaultCTAProps<
	Initial extends CTAInitial,
	Actions,
> = UpdateInitialCTAProps<Initial, Actions> |
ResetCTAProps<Initial, Actions> |
UpdateCTAProps<Initial, Actions>;

type CustomCTARecord<
	Initial extends CTAInitial,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ...args: infer Args ) => CustomCTAReturnType<Initial, Actions> ? (
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
								A[0] extends CustomCTAStateParam<Initial, Actions> ? Action : never
							)
							: never
					)
			)
	) : never]: Actions[Action];
};

type DispatchCustomCTARecordValues<
	Initial extends CTAInitial,
	Actions,
	ActionValue,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ActionValue extends ( ( ctaParam: any, ...args: infer Args ) => CustomCTAReturnType<Initial, Actions> ) ? (
	Args extends []
		// Represents CTA object without arguments.
		? ( () => void )
		: (
			Args extends [unknown?, ...infer A,]
				? ( ( payload?: Args[0] | ( ( payloadParameter: CTAState<Initial> ) => Args[0] | undefined ), ...args: A ) => void )
				: Args extends [infer Payload, ...infer A,] ? (
					Payload extends undefined
					// Represents CTA object optional payload.
						? ( ( payload?: Payload | ( ( payloadParameter: CTAState<Initial> ) => Payload | undefined ), ...args: A ) => void )
					// Represents CTA object a payload.
						: ( payload: Payload | ( ( payloadParameter: CTAState<Initial> ) => Payload | undefined ), ...args: A ) => void
				) : never
		)
) : never;

type DispatchCustomCTARecord<
	Initial extends CTAInitial,
	Actions,
	CustomActions = CustomCTARecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ?
	CustomActions : {
		[Action in keyof CustomActions]: DispatchCustomCTARecordValues<
			Initial,
			Actions,
			CustomActions[Action]
		>
	};

export type UseCTAReturnTypeDispatchCTA<
	Initial extends CTAInitial,
	Actions,
> = Readonly<
	OmitEmptyRecord<
		DispatchCustomCTARecord<Initial, Actions> &
		DispatchCTADefaultRecord<Initial, Actions>
	>
>;

type CustomDispatchValueRecord<
	Initial extends CTAInitial,
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

type CustomDispatchValueRecordValues<
	Initial extends CTAInitial,
	Actions,
	CustomActions = CustomDispatchValueRecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];

export type DispatchCTA<
	Initial extends CTAInitial,
	Actions,
> = ( value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial, Actions>, never> ) => void;

export type UseCTAReturnTypeDispatch<
	Initial extends CTAInitial,
	Actions,
> = Immutable<
	DispatchCTA<Initial, Actions> & {
		ResetCTAProps: ResetCTAProps<Initial, Actions>
		cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>
		state: CTAState<Initial>
	}
>;
