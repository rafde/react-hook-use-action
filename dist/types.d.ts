export type CTAInitial = Record<string | number, unknown>;
type PredefinedActions = 'replace' | 'replaceInitial' | 'reset' | 'update';
type ActionTypeConstructParam<Initial extends CTAInitial> = {
    type: PredefinedActions;
    nextState: Initial | Partial<Initial>;
    options?: {
        useCustom: boolean;
    };
};
declare class ActionType<Initial extends CTAInitial> {
    readonly type: ActionTypeConstructParam<Initial>['type'];
    readonly nextState: Readonly<ActionTypeConstructParam<Initial>['nextState']>;
    readonly options: Readonly<Exclude<ActionTypeConstructParam<Initial>['options'], undefined>>;
    constructor(param: ActionTypeConstructParam<Initial>);
}
declare class ReplaceActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    readonly type = "replace";
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class ReplaceInitialActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    readonly type = "replaceInitial";
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceInitialActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class ResetActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    readonly type = "reset";
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class UpdateActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    readonly type = "update";
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): UpdateActionType<{
        [x: string]: any;
    }>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Partial<Initial>;
    });
}
export type CustomCTAReturnType<Initial extends CTAInitial> = undefined | ReplaceActionType<Initial> | ReplaceInitialActionType<Initial> | ResetActionType<Initial> | UpdateActionType<Initial> | Partial<Initial>;
type OmitEmptyRecord<T> = {
    [K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K];
};
type ReplaceCTAProps<Initial extends CTAInitial> = {
    type: 'replace';
    payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
};
type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
    type: 'replaceInitial';
    payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
};
type ResetCTAProps<Initial extends CTAInitial> = {
    type: 'reset';
    payload?: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
};
type UpdateCTAProps<Initial extends CTAInitial> = {
    type: 'update';
    payload: Partial<Initial> | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Partial<Initial> | undefined);
};
type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial>;
type CustomCTAWithoutPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAParam<Initial>, payload: never) => CustomCTAReturnType<Initial>) ? (Parameters<Actions[Action]>['length'] extends 1 ? Action : never) : never]: ((ctaParam: CustomCTAParam<Initial>, payload: never) => CustomCTAReturnType<Initial>);
};
type CustomCTAWithoutPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithoutPayloadRecord;
    payload?: never;
};
type CTAWithOptionalPayloadRecordParameters<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CustomCTAParam<Initial>, payload?: infer P) => Partial<Initial> | undefined) ? P : never;
type CustomCTAWithOptionalPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAParam<Initial>, payload?: infer U) => CustomCTAReturnType<Initial>) ? (undefined extends U ? never : Action) : never]: (ctaParam: CustomCTAParam<Initial>, payload?: CTAWithOptionalPayloadRecordParameters<Initial, Actions[Action]>) => CustomCTAReturnType<Initial>;
};
type CustomCTAWithOptionalPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameter = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomCTAWithOptionalPayloadRecord<Initial, Actions> extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithOptionalPayloadRecord;
    payload?: CustomActionsWithOptionalPayloadParameter | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithOptionalPayloadParameter | undefined);
};
type CTAWithPayloadParameter<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CustomCTAParam<Initial>, payload: infer P) => CustomCTAReturnType<Initial>) ? P : never;
type CustomCTAWithPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAParam<Initial>, payload: infer U) => CustomCTAReturnType<Initial>) ? (undefined extends U ? never : Action) : never]: (ctaParam: CustomCTAParam<Initial>, payload: CTAWithPayloadParameter<Initial, Actions[Action]>) => CustomCTAReturnType<Initial>;
};
type CustomCTAWithPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameter = CTAWithPayloadParameter<Initial, CustomActionsWithPayload[keyof CustomActionsWithPayload]>> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithPayload;
    payload: CustomActionsWithPayloadParameter | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithPayloadParameter | undefined);
};
type DispatchCTA<Initial extends CTAInitial, Actions = undefined> = (value: Exclude<CustomCTAWithOptionalPayloadProps<Initial, Actions> | CustomCTAWithoutPayloadProps<Initial, Actions> | CustomCTAWithPayloadProps<Initial, Actions> | DefaultCTAProps<Initial>, never>) => void;
type DispatchCustomCTAWithoutPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithoutPayloadRecord : {
    [Action in keyof CustomActionsWithoutPayloadRecord]: () => void;
};
type DispatchCustomCTAWithOptionalPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameters = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithOptionalPayloadRecord : Readonly<{
    [Action in keyof CustomActionsWithOptionalPayloadRecord]: (payload?: CustomActionsWithOptionalPayloadParameters | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithOptionalPayloadParameters | undefined)) => void;
}>;
type DispatchCustomCTAWithPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameters = CTAWithPayloadParameter<Initial, CustomActionsWithPayloadRecord[keyof CustomActionsWithPayloadRecord]>> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithPayloadRecord : {
    [Action in keyof CustomActionsWithPayloadRecord]: (payload: CustomActionsWithPayloadParameters | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithPayloadParameters | undefined)) => void;
};
type DispatchDefaultCTARecord<Initial extends CTAInitial> = Readonly<{
    replace(payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined)): void;
    replaceInitial(payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined)): void;
    reset(payload?: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined)): void;
    update(payload: Partial<Initial> | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Partial<Initial> | undefined), value?: undefined): void;
    update(key: keyof Initial, value: Initial[keyof Initial]): void;
}>;
type UseCTAReturnTypeDispatchCTA<Initial extends CTAInitial, Actions = undefined> = Readonly<OmitEmptyRecord<DispatchCustomCTAWithOptionalPayload<Initial, Actions> & DispatchCustomCTAWithoutPayload<Initial, Actions> & DispatchCustomCTAWithPayload<Initial, Actions> & DispatchDefaultCTARecord<Initial>>>;
export type UseCTAReturnTypeDispatchState<Initial extends CTAInitial> = Readonly<{
    changes: Readonly<Partial<Initial>> | null;
    current: Readonly<Initial>;
    initial: Readonly<Initial>;
    previous: Readonly<Initial>;
}>;
export type UseCTAReturnTypeDispatch<Initial extends CTAInitial, Actions = undefined> = DispatchCTA<Initial, Actions> & {
    readonly cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>;
    readonly state: UseCTAReturnTypeDispatchState<Initial>;
};
export type CustomCTAParam<Initial extends CTAInitial> = UseCTAReturnTypeDispatchState<Initial> & {
    replaceAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceActionType<Initial>;
    replaceInitialAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceInitialActionType<Initial>;
    resetAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
    updateAction(result: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options']): UpdateActionType<Initial>;
};
type UseCTAParameterActionsPredefinedRecord<Initial extends CTAInitial> = {
    replace?: (ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Initial) => Initial | undefined;
    replaceInitial?: (ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Initial) => Initial | undefined;
    reset?: (ctaState: UseCTAReturnTypeDispatchState<Initial>, payload?: Initial) => Initial | undefined;
    update?: (ctaState: UseCTAReturnTypeDispatchState<Initial>, payload: Partial<Initial>) => Partial<Initial> | undefined;
};
type UseCTAParameterActionsCustomRecord<Initial extends CTAInitial> = {
    [customAction: string | number]: ((ctaParam: CustomCTAParam<Initial>, payload?: any) => CustomCTAReturnType<Initial>);
};
type UseCTAParameterActionsRecordProp<Initial extends CTAInitial> = UseCTAParameterActionsCustomRecord<Initial> & UseCTAParameterActionsPredefinedRecord<Initial>;
export type UseCTAParameter<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined> = {
    actions?: Actions;
    initial: Initial;
    onInit?: ((initial: Initial) => Initial);
};
export type UseCTAReturnType<Initial extends CTAInitial, Actions = undefined> = [
    Initial,
    UseCTAReturnTypeDispatch<Initial, Actions>
];
export function useCTA<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined>(useCTAParameter: UseCTAParameter<Initial, Actions>): UseCTAReturnType<Initial, Actions>;

//# sourceMappingURL=types.d.ts.map
