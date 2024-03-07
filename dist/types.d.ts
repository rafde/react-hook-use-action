export type CTAInitial = Record<string | number, unknown>;
export type CTAParam<Initial extends CTAInitial> = {
    readonly changes: Readonly<Partial<Initial>> | null;
    readonly initial: Readonly<Initial>;
    readonly previous: Readonly<Initial>;
};
type UseCTAParameterPredefinedActionsRecord<Initial extends CTAInitial> = {
    replace?: (ctaParam: CTAParam<Initial>, payload: Initial) => Initial | undefined;
    replaceInitial?: (ctaParam: CTAParam<Initial>, payload: Initial) => Initial | undefined;
    reset?: (ctaParam: CTAParam<Initial>, payload?: Initial) => Initial | undefined;
    update?: (ctaParam: CTAParam<Initial>, payload: Partial<Initial>) => Partial<Initial> | undefined;
};
type UseCTAParameterCustomActionsRecord<Initial extends CTAInitial> = {
    [customAction: string | number]: ((ctaParam: CTAParam<Initial>, payload?: any) => Partial<Initial> | undefined);
};
type UseCTAParameterActionsRecordProp<Initial extends CTAInitial> = UseCTAParameterCustomActionsRecord<Initial> & UseCTAParameterPredefinedActionsRecord<Initial>;
type OmitEmptyRecord<T> = {
    [K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K];
};
type ReplaceCTAProps<Initial extends CTAInitial> = {
    type: 'replace';
    payload: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined);
};
type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
    type: 'replaceInitial';
    payload: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined);
};
type ResetCTAProps<Initial extends CTAInitial> = {
    type: 'reset';
    payload?: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined);
};
type UpdateCTAProps<Initial extends CTAInitial> = {
    type: 'update';
    payload: Partial<Initial> | ((ctaParam: CTAParam<Initial>) => Partial<Initial> | undefined);
};
type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial>;
type CustomCTAWithoutPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CTAParam<Initial>, payload: never) => Partial<Initial> | undefined) ? (Parameters<Actions[Action]>['length'] extends 1 ? Action : never) : never]: ((ctaParam: CTAParam<Initial>, payload: never) => Partial<Initial> | undefined);
};
type CustomCTAWithoutPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithoutPayloadRecord;
    payload?: never;
};
type CTAWithOptionalPayloadRecordParameters<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CTAParam<Initial>, payload?: infer P) => Partial<Initial> | undefined) ? P : never;
type CustomCTAWithOptionalPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CTAParam<Initial>, payload?: infer U) => Partial<Initial> | undefined) ? (undefined extends U ? never : Action) : never]: (ctaParam: CTAParam<Initial>, payload?: CTAWithOptionalPayloadRecordParameters<Initial, Actions[Action]>) => Partial<Initial> | undefined;
};
type CustomCTAWithOptionalPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameter = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomCTAWithOptionalPayloadRecord<Initial, Actions> extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithOptionalPayloadRecord;
    payload?: CustomActionsWithOptionalPayloadParameter | ((ctaParam: CTAParam<Initial>) => CustomActionsWithOptionalPayloadParameter | undefined);
};
type CTAWithPayloadParameter<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CTAParam<Initial>, payload: infer P) => Partial<Initial> | undefined) ? P : never;
type CustomCTAWithPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CTAParam<Initial>, payload: infer U) => Partial<Initial> | undefined) ? (undefined extends U ? never : Action) : never]: (ctaParam: CTAParam<Initial>, payload: CTAWithPayloadParameter<Initial, Actions[Action]>) => Partial<Initial> | undefined;
};
type CustomCTAWithPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameter = CTAWithPayloadParameter<Initial, CustomActionsWithPayload[keyof CustomActionsWithPayload]>> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithPayload;
    payload: CustomActionsWithPayloadParameter | ((ctaParam: CTAParam<Initial>) => CustomActionsWithPayloadParameter | undefined);
};
type DispatchCTA<Initial extends CTAInitial, Actions = undefined> = (value: Exclude<CustomCTAWithOptionalPayloadProps<Initial, Actions> | CustomCTAWithoutPayloadProps<Initial, Actions> | CustomCTAWithPayloadProps<Initial, Actions> | DefaultCTAProps<Initial>, never>) => void;
type DispatchCustomCTAWithoutPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithoutPayloadRecord : {
    [Action in keyof CustomActionsWithoutPayloadRecord]: () => void;
};
type DispatchCustomCTAWithOptionalPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameters = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithOptionalPayloadRecord : Readonly<{
    [Action in keyof CustomActionsWithOptionalPayloadRecord]: (payload?: CustomActionsWithOptionalPayloadParameters | ((ctaParam: CTAParam<Initial>) => CustomActionsWithOptionalPayloadParameters | undefined)) => void;
}>;
type DispatchCustomCTAWithPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameters = CTAWithPayloadParameter<Initial, CustomActionsWithPayloadRecord[keyof CustomActionsWithPayloadRecord]>> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithPayloadRecord : {
    [Action in keyof CustomActionsWithPayloadRecord]: (payload: CustomActionsWithPayloadParameters | ((ctaParam: CTAParam<Initial>) => CustomActionsWithPayloadParameters | undefined)) => void;
};
type DispatchDefaultCTARecord<Initial extends CTAInitial> = Readonly<{
    replace(payload: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined)): void;
    replaceInitial(payload: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined)): void;
    reset(payload?: Initial | ((ctaParam: CTAParam<Initial>) => Initial | undefined)): void;
    update(payload: Partial<Initial> | ((ctaParam: CTAParam<Initial>) => Partial<Initial> | undefined), value?: undefined): void;
    update(key: keyof Initial, value: Initial[keyof Initial]): void;
}>;
type UseCTAReturnTypeDispatchCTA<Initial extends CTAInitial, Actions = undefined> = Readonly<OmitEmptyRecord<DispatchCustomCTAWithOptionalPayload<Initial, Actions> & DispatchCustomCTAWithoutPayload<Initial, Actions> & DispatchCustomCTAWithPayload<Initial, Actions> & DispatchDefaultCTARecord<Initial>>>;
type UseCTAReturnTypeDispatchState<Initial extends CTAInitial> = Readonly<{
    changes: Readonly<Partial<Initial>> | null;
    current: Readonly<Initial>;
    initial: Readonly<Initial>;
    previous: Readonly<Initial>;
}>;
export type UseCTAReturnTypeDispatch<Initial extends CTAInitial, Actions = undefined> = DispatchCTA<Initial, Actions> & {
    readonly cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>;
    readonly state: UseCTAReturnTypeDispatchState<Initial>;
};
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
