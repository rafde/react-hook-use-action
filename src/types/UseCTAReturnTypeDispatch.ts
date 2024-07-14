import type { CTAInitial, } from './CTAInitial';
import type { CTAState, } from './CTAState';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { CustomCTAStateParam, } from './CustomCTAStateParam';
import { DefaultActionsRecord, } from './DefaultActionsRecord';
import { Immutable, } from './Immutable';
import { RestAfterFirst, } from './RestAfterFirst';
import { RestOfArgs, } from './RestOfArgs';

type OmitEmptyRecord<T,> = {
	[K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K]
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RestOfActionParameters<T,> = T extends ( ( first: any, second: any, ...args: infer P ) => any ) ? P : never[];

export type DispatchDefaultCTARecord<
	Initial extends CTAInitial,
	Actions,
> = Readonly<{
	replaceInitial(
		payload: Initial | (
			( ctaPayloadCallbackParameter: CTAState<Initial> ) => Initial | undefined
		),
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'replaceInitial'> ? RestOfArgs<Actions['replaceInitial']> : never[]
	): void
	reset(
		payload?: undefined | Initial | (
			( ctaPayloadCallbackParameter: CTAState<Initial> ) => Initial | undefined
		),
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'reset'> ? RestOfArgs<Actions['reset']> : never[]
	): void
	update(
		key: keyof Initial,
		value: Initial[keyof Initial],
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']> : never[]
	): void
	update(
		payload: Partial<Initial> | (
			( ctaPayloadCallbackParameter: CTAState<Initial> ) => Partial<Initial> | undefined
		),
		value?: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']>[0] : never,
		...args: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestAfterFirst<RestOfArgs<Actions['update']>> : never[]
	): void
}>;

type ReplaceInitialCTAProps<
	Initial extends CTAInitial,
	Actions,
> = {
	args?: Actions extends Pick<DefaultActionsRecord<Initial>, 'replaceInitial'> ? RestOfArgs<Actions['replaceInitial']> : never
	options?: Actions extends Pick<DefaultActionsRecord<Initial>, 'replaceInitial'> ? Parameters<Actions['replaceInitial']>[2] : never
	payload: Initial | (
		( ctaPayloadCallbackParameter: CTAState<Initial> ) => Initial | undefined
	)
	type: 'replaceInitial'
};

type ResetCTAProps<
	Initial extends CTAInitial,
	Actions,
> = {
	args?: Actions extends Pick<DefaultActionsRecord<Initial>, 'reset'> ? RestOfArgs<Actions['reset']> : never
	options?: Actions extends Pick<DefaultActionsRecord<Initial>, 'reset'> ? Parameters<Actions['reset']>[2] : never
	payload?: undefined | Initial | (
		( ctaPayloadCallbackParameter: CTAState<Initial> ) => Initial | undefined
	)
	type: 'reset'
};

type UpdateCTAProps<
	Initial extends CTAInitial,
	Actions,
> = {
	args?: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? RestOfArgs<Actions['update']> : never
	options?: Actions extends Pick<DefaultActionsRecord<Initial>, 'update'> ? Parameters<Actions['update']>[2] : never
	payload: Partial<Initial> | (
		( ctaPayloadCallbackParameter: CTAState<Initial> ) => Partial<Initial> | undefined
	)
	type: 'update'
};

type DefaultCTAProps<
	Initial extends CTAInitial,
	Actions,
> = ReplaceInitialCTAProps<Initial, Actions> |
ResetCTAProps<Initial, Actions> |
UpdateCTAProps<Initial, Actions>;

export type CustomCTAWithoutArgumentsRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	[
	Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends (
		() => Partial<Initial>
	) ?
		( Parameters<Actions[Action]>['length'] extends 0 ? Action : never ) :
		never
	]: ( () => Partial<Initial> );
};

export type CustomCTAWithoutArgumentsProps<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithoutPayloadRecord = CustomCTAWithoutArgumentsRecord<Initial, Actions>,
> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
	args?: never
	options?: never
	payload?: never
	type: keyof CustomActionsWithoutPayloadRecord
};

export type DispatchCustomCTAWithoutArguments<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithoutArgumentsRecord = CustomCTAWithoutArgumentsRecord<Initial, Actions>,
> = CustomActionsWithoutArgumentsRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithoutArgumentsRecord : {
		[Action in keyof CustomActionsWithoutArgumentsRecord]: () => void;
	};

export type CustomCTAWithoutPayloadRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ctaParam: infer C, ) => CustomCTAReturnType<Initial, Actions> ?
		( C extends CustomCTAStateParam<Initial, Actions> ? Action : never ) :
		never
	]: Actions[Action];
};

export type CustomCTAWithoutPayloadProps<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>,
> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
	args?: never
	options?: never
	payload?: never
	type: keyof CustomActionsWithoutPayloadRecord
};

export type DispatchCustomCTAWithoutPayload<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>,
> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithoutPayloadRecord : {
		[Action in keyof CustomActionsWithoutPayloadRecord]: () => void;
	};

export type CustomCTAWithPayloadRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ctaParam: infer C, ...args: infer Args ) => CustomCTAReturnType<Initial, Actions> ?
		( C extends CustomCTAStateParam<Initial, Actions> ? ( Args['length'] extends 0 ? never : Action ) : never ) :
		never
	]: Actions[Action];
};

export type CTAWithPayloadParameter<
	CTA,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = CTA extends ( ( ...args: any[] ) => any ) ?
	Parameters<CTA>[1] :
	never;

export type CustomCTAWithPayloadProps<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>,
> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never : {
	args?: RestOfArgs<CustomActionsWithPayload[keyof CustomActionsWithPayload]>
	options?: never
	payload: CTAWithPayloadParameter<
		CustomActionsWithPayload[keyof CustomActionsWithPayload]
	> | (
		( ctaPayloadCallbackParameter: CTAState<Initial> ) => CTAWithPayloadParameter<
			CustomActionsWithPayload[keyof CustomActionsWithPayload]
		> | undefined
		)
	type: keyof CustomActionsWithPayload
};

export type DispatchCustomCTAWithPayload<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>,
> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithPayloadRecord : {
		[Action in keyof CustomActionsWithPayloadRecord]: (
			payload: CTAWithPayloadParameter<
				CustomActionsWithPayloadRecord[Action]
			> | (
				( ctaPayloadCallbackParameter: CTAState<Initial> ) => CTAWithPayloadParameter<
					CustomActionsWithPayloadRecord[Action]
				> | undefined
				),
			...args: RestOfActionParameters<CustomActionsWithPayloadRecord[Action]>
		) => void;
	};

export type CTAWithOptionalPayloadRecordParameters<
	Initial extends CTAInitial,
	CTA,
	Actions,
> = CTA extends ( ( ctaParam: CustomCTAStateParam<Initial, Actions>, payload?: infer P ) => unknown ) ?
	P :
	never;

export type CustomCTAWithOptionalPayloadRecord<
	Initial extends CTAInitial,
	Actions,
> = {
	[
	Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends (
		( ctaParam: CustomCTAStateParam<Initial, Actions>, payload?: infer U, ...args: never[] ) => CustomCTAReturnType<Initial, Actions>
	) ?
		( undefined extends U ? never : Action ) :
		never
	]: (
		ctaParam: CustomCTAStateParam<Initial, Actions>,
		payload?: CTAWithOptionalPayloadRecordParameters<Initial, Actions[Action], Actions>,
		...args: RestOfActionParameters<Actions[Action]>
	) => CustomCTAReturnType<Initial, Actions>
};

export type CustomCTAWithOptionalPayloadProps<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>,
> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ? never : {
	args?: RestOfArgs<CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>
	options?: never
	payload?: CTAWithOptionalPayloadRecordParameters<
		Initial,
		CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord],
		Actions
	> | (
		( ctaPayloadCallbackParameter: CTAState<Initial> ) => CTAWithOptionalPayloadRecordParameters<
			Initial,
			CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord],
			Actions
		> | undefined
		)
	type: keyof CustomActionsWithOptionalPayloadRecord
};

export type DispatchCustomCTAWithOptionalPayload<
	Initial extends CTAInitial,
	Actions,
	CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>,
> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithOptionalPayloadRecord : Readonly<{
		[Action in keyof CustomActionsWithOptionalPayloadRecord]: (
			payload?: CTAWithOptionalPayloadRecordParameters<
				Initial,
				CustomActionsWithOptionalPayloadRecord[Action],
				Actions
			> | (
				( ctaPayloadCallbackParameter: CTAState<Initial> ) => CTAWithOptionalPayloadRecordParameters<
					Initial,
					CustomActionsWithOptionalPayloadRecord[Action],
					Actions
				> | undefined
				),
			...args: RestOfActionParameters<CustomActionsWithOptionalPayloadRecord[Action]>
		) => void;
	}>;

export type DispatchCTA<
	Initial extends CTAInitial,
	Actions,
> = ( value: Exclude<
	CustomCTAWithoutArgumentsProps<Initial, Actions> |
	CustomCTAWithoutPayloadProps<Initial, Actions> |
	CustomCTAWithOptionalPayloadProps<Initial, Actions> |
	CustomCTAWithPayloadProps<Initial, Actions> |
	DefaultCTAProps<Initial, Actions>,
	never
> ) => void;

export type UseCTAReturnTypeDispatchCTA<
	Initial extends CTAInitial,
	Actions,
> = Readonly<
	OmitEmptyRecord<
		DispatchCustomCTAWithoutArguments<Initial, Actions> &
		DispatchCustomCTAWithoutPayload<Initial, Actions> &
		DispatchCustomCTAWithOptionalPayload<Initial, Actions> &
		DispatchCustomCTAWithPayload<Initial, Actions> &
		DispatchDefaultCTARecord<Initial, Actions>
	>
>;

export type UseCTAReturnTypeDispatch<
	Initial extends CTAInitial,
	Actions,
> = Immutable<
	DispatchCTA<Initial, Actions> & {
		cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>
		state: CTAState<Initial>
	}
>;
