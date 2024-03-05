import type { CTAInitial, } from './CTAInitial';
import type { CTAParam, } from './CTAParam';

type OmitEmptyRecord<T> = {
	[K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K]
};

type ReplaceCTAProps<Initial extends CTAInitial> = {
	type: 'replace',
	payload: Initial | (
		( ctaParam: CTAParam<Initial> ) => Initial | undefined
	)
}

type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
	type: 'replaceInitial',
	payload: Initial | (
		( ctaParam: CTAParam<Initial> ) => Initial | undefined
	)
}

type ResetCTAProps<Initial extends CTAInitial> = {
	type: 'reset',
	payload?: Initial | (
		( ctaParam: CTAParam<Initial> ) => Initial | undefined
	)
}

type UpdateCTAProps<Initial extends CTAInitial> = {
	type: 'update',
	payload: Partial<Initial> | (
		( ctaParam: CTAParam<Initial> ) => Partial<Initial> | undefined
	)
}

type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> |
	ReplaceInitialCTAProps<Initial> |
	ResetCTAProps<Initial> |
	UpdateCTAProps<Initial>;

export type CustomCTAWithoutPayloadRecord<
	Initial extends CTAInitial,
	Actions = undefined,
> = {
	[
	Action in Exclude<
		keyof Actions,
		keyof DispatchDefaultCTARecord<Initial>
	> as Actions[Action] extends (
			( ctaParam: CTAParam<Initial>, payload: never ) => Partial<Initial> | undefined
			) ?
		( Parameters<Actions[Action]>['length'] extends 1 ? Action : never ) :
		never
	]: ( ( ctaParam: CTAParam<Initial>, payload: never ) => Partial<Initial> | undefined );
}

export type CustomCTAWithoutPayloadProps<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>
> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
		type: keyof CustomActionsWithoutPayloadRecord,
		payload?: never
	};

export type CTAWithOptionalPayloadRecordParameters<
	Initial extends CTAInitial,
	CTA
> = CTA extends ( ( ctaParam: CTAParam<Initial>, payload?: infer P ) => Partial<Initial> | undefined ) ?
	P :
	never;

export type CustomCTAWithOptionalPayloadRecord<
	Initial extends CTAInitial,
	Actions = undefined,
> = {
	[
	Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends (
			( ctaParam: CTAParam<Initial>, payload?: infer U ) => Partial<Initial> | undefined
			) ?
		( undefined extends U ? never : Action ) :
		never
	]: (
		ctaParam: CTAParam<Initial>,
		payload?: CTAWithOptionalPayloadRecordParameters<Initial, Actions[Action]>
	) => Partial<Initial> | undefined;
}

export type CustomCTAWithOptionalPayloadProps<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>,
	CustomActionsWithOptionalPayloadParameter = CTAWithOptionalPayloadRecordParameters<
		Initial,
		CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]
	>
> = CustomCTAWithOptionalPayloadRecord<Initial, Actions> extends Record<string | number | symbol, never> ? never : {
		type: keyof CustomActionsWithOptionalPayloadRecord,
		payload?: CustomActionsWithOptionalPayloadParameter |
			( ( ctaParam: CTAParam<Initial> ) => CustomActionsWithOptionalPayloadParameter | undefined )
	};

export type CTAWithPayloadParameter<
	Initial extends CTAInitial,
	CTA
> = CTA extends ( ( ctaParam: CTAParam<Initial>, payload: infer P ) => Partial<Initial> | undefined ) ?
	P :
	never;

export type CustomCTAWithPayloadRecord<
	Initial extends CTAInitial,
	Actions = undefined,
> = {
	[
	Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends (
			( ctaParam: CTAParam<Initial>, payload: infer U ) => Partial<Initial> | undefined ) ?
		( undefined extends U ? never : Action ) :
		never
	]: (
		ctaParam: CTAParam<Initial>,
		payload: CTAWithPayloadParameter<Initial, Actions[Action]>
	) => Partial<Initial> | undefined
}

export type CustomCTAWithPayloadProps<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>,
	CustomActionsWithPayloadParameter = CTAWithPayloadParameter<
		Initial,
		CustomActionsWithPayload[keyof CustomActionsWithPayload]
	>
> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never: {
		type: keyof CustomActionsWithPayload,
		payload: CustomActionsWithPayloadParameter | (
			( ctaParam: CTAParam<Initial> ) => CustomActionsWithPayloadParameter | undefined
		)
	};

export type DispatchCTA<
	Initial extends CTAInitial,
	Actions = undefined
> = ( value: Exclude<
	CustomCTAWithOptionalPayloadProps<Initial, Actions> |
	CustomCTAWithoutPayloadProps<Initial, Actions> |
	CustomCTAWithPayloadProps<Initial, Actions> |
	DefaultCTAProps<Initial>,
	never
> ) => void;

export type DispatchCustomCTAWithoutPayload<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>
> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithoutPayloadRecord : {
		[Action in keyof CustomActionsWithoutPayloadRecord]: () => void;
	};

export type DispatchCustomCTAWithOptionalPayload<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>,
	CustomActionsWithOptionalPayloadParameters = CTAWithOptionalPayloadRecordParameters<
		Initial,
		CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]
	>
> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithOptionalPayloadRecord : Readonly<{
		[Action in keyof CustomActionsWithOptionalPayloadRecord]: (
			payload?: CustomActionsWithOptionalPayloadParameters |
				( ( ctaParam: CTAParam<Initial> ) => CustomActionsWithOptionalPayloadParameters | undefined )
		) => void;
	}>;

export type DispatchCustomCTAWithPayload<
	Initial extends CTAInitial,
	Actions = undefined,
	CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>,
	CustomActionsWithPayloadParameters = CTAWithPayloadParameter<
		Initial,
		CustomActionsWithPayloadRecord[keyof CustomActionsWithPayloadRecord]
	>
> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ?
	CustomActionsWithPayloadRecord : {
		[Action in keyof CustomActionsWithPayloadRecord]: (
			payload: CustomActionsWithPayloadParameters |
				( ( ctaParam: CTAParam<Initial> ) => CustomActionsWithPayloadParameters | undefined )
		) => void;
	};

export type DispatchDefaultCTARecord<Initial extends CTAInitial> = Readonly<{
	replace( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	replaceInitial( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	reset( payload?: ResetCTAProps<Initial>['payload'] ): void;
	update( payload: UpdateCTAProps<Initial>['payload'], value?: undefined ): void;
	update( payload: keyof Initial, value: Initial[keyof Initial] ): void;
}>;

export type UseCTAReturnTypeDispatchCTA<
	Initial extends CTAInitial,
	Actions = undefined,
> = Readonly<
	OmitEmptyRecord<
		DispatchCustomCTAWithOptionalPayload<Initial, Actions> &
		DispatchCustomCTAWithoutPayload<Initial, Actions> &
		DispatchCustomCTAWithPayload<Initial, Actions> &
		DispatchDefaultCTARecord<Initial>
	>
>;

export type UseCTAReturnTypeDispatchState<Initial extends CTAInitial> = Readonly<{
	changes: Readonly<Partial<Initial>> | null,
	current: Readonly<Initial>,
	initial: Readonly<Initial>,
	previous: Readonly<Initial>,
}>

export type UseCTAReturnTypeDispatch<
	Initial extends CTAInitial,
	Actions = undefined
> = DispatchCTA<Initial, Actions> & {
	readonly cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>,
} & {
	readonly state: UseCTAReturnTypeDispatchState<Initial>
};
