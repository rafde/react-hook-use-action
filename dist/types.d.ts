import React from "react";
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
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class ReplaceInitialActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceInitialActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class ResetActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Initial;
    });
}
declare class UpdateActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    static create<Initial extends CTAInitial>(nextState: Initial, options?: ActionTypeConstructParam<Initial>['options']): UpdateActionType<{
        [x: string]: any;
    }>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState: Partial<Initial>;
    });
}
type OptionsParams = Record<string | number, unknown>;
export type CustomCTAStateParam<Initial extends CTAInitial> = Readonly<{
    initial: Readonly<Initial>;
    current: Readonly<Initial>;
    previous: Readonly<Initial>;
    changes: Readonly<Partial<Initial>> | null;
    options?: Readonly<OptionsParams>;
    updateAction(result: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options']): UpdateActionType<Initial>;
    replaceAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceActionType<Initial>;
    replaceInitialAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ReplaceInitialActionType<Initial>;
    resetAction(result: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
}>;
export type CustomCTAReturnType<Initial extends CTAInitial> = undefined | ReplaceActionType<Initial> | ReplaceInitialActionType<Initial> | ResetActionType<Initial> | UpdateActionType<Initial> | Partial<Initial>;
export type CTAStateParam<Initial extends CTAInitial> = Readonly<Pick<CustomCTAStateParam<Initial>, 'changes' | 'current' | 'initial' | 'previous' | 'options'>>;
type UseCTAParameterActionsPredefinedRecord<Initial extends CTAInitial> = {
    replace?: (ctaState: CTAStateParam<Initial>, payload: Initial) => Initial | undefined;
    replaceInitial?: (ctaState: CTAStateParam<Initial>, payload: Initial) => Initial | undefined;
    reset?: (ctaState: CTAStateParam<Initial>, payload?: Initial) => Initial | undefined;
    update?: (ctaState: CTAStateParam<Initial>, payload: Partial<Initial>) => Partial<Initial> | undefined;
};
type UseCTAParameterActionsCustomRecord<Initial extends CTAInitial> = {
    [customAction: string | number]: ((ctaParam: CustomCTAStateParam<Initial>, payload?: any) => CustomCTAReturnType<Initial>);
};
type UseCTAParameterActionsRecordProp<Initial extends CTAInitial> = UseCTAParameterActionsCustomRecord<Initial> & UseCTAParameterActionsPredefinedRecord<Initial>;
type OmitEmptyRecord<T> = {
    [K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K];
};
type ReplaceCTAProps<Initial extends CTAInitial> = {
    type: 'replace';
    payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
    type: 'replaceInitial';
    payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type ResetCTAProps<Initial extends CTAInitial> = {
    type: 'reset';
    payload?: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type UpdateCTAProps<Initial extends CTAInitial> = {
    type: 'update';
    payload: Partial<Initial> | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Partial<Initial> | undefined);
    options?: OptionsParams;
};
type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial>;
type CustomCTAWithoutPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAStateParam<Initial>, payload: never) => CustomCTAReturnType<Initial>) ? (Parameters<Actions[Action]>['length'] extends 1 ? Action : never) : never]: ((ctaParam: CustomCTAStateParam<Initial>, payload: never) => CustomCTAReturnType<Initial>);
};
type CustomCTAWithoutPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithoutPayloadRecord;
    payload?: never;
    options?: OptionsParams;
};
type CTAWithOptionalPayloadRecordParameters<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CustomCTAStateParam<Initial>, payload?: infer P) => Partial<Initial> | undefined) ? P : never;
type CustomCTAWithOptionalPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAStateParam<Initial>, payload?: infer U) => CustomCTAReturnType<Initial>) ? (undefined extends U ? never : Action) : never]: (ctaParam: CustomCTAStateParam<Initial>, payload?: CTAWithOptionalPayloadRecordParameters<Initial, Actions[Action]>) => CustomCTAReturnType<Initial>;
};
type CustomCTAWithOptionalPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameter = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomCTAWithOptionalPayloadRecord<Initial, Actions> extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithOptionalPayloadRecord;
    payload?: CustomActionsWithOptionalPayloadParameter | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithOptionalPayloadParameter | undefined);
    options?: OptionsParams;
};
type CTAWithPayloadParameter<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CustomCTAStateParam<Initial>, payload: infer P) => CustomCTAReturnType<Initial>) ? P : never;
type CustomCTAWithPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAStateParam<Initial>, payload: infer U) => CustomCTAReturnType<Initial>) ? (undefined extends U ? never : Action) : never]: (ctaParam: CustomCTAStateParam<Initial>, payload: CTAWithPayloadParameter<Initial, Actions[Action]>) => CustomCTAReturnType<Initial>;
};
type CustomCTAWithPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameter = CTAWithPayloadParameter<Initial, CustomActionsWithPayload[keyof CustomActionsWithPayload]>> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithPayload;
    payload: CustomActionsWithPayloadParameter | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithPayloadParameter | undefined);
    options?: OptionsParams;
};
type DispatchCTA<Initial extends CTAInitial, Actions = undefined> = (value: Exclude<CustomCTAWithOptionalPayloadProps<Initial, Actions> | CustomCTAWithoutPayloadProps<Initial, Actions> | CustomCTAWithPayloadProps<Initial, Actions> | DefaultCTAProps<Initial>, never>) => void;
type DispatchCustomCTAWithoutPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithoutPayloadRecord : {
    [Action in keyof CustomActionsWithoutPayloadRecord]: (payload?: undefined, options?: OptionsParams) => void;
};
type DispatchCustomCTAWithOptionalPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameters = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithOptionalPayloadRecord : Readonly<{
    [Action in keyof CustomActionsWithOptionalPayloadRecord]: (payload?: CustomActionsWithOptionalPayloadParameters | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithOptionalPayloadParameters | undefined), options?: OptionsParams) => void;
}>;
type DispatchCustomCTAWithPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameters = CTAWithPayloadParameter<Initial, CustomActionsWithPayloadRecord[keyof CustomActionsWithPayloadRecord]>> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithPayloadRecord : {
    [Action in keyof CustomActionsWithPayloadRecord]: (payload: CustomActionsWithPayloadParameters | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => CustomActionsWithPayloadParameters | undefined), options?: OptionsParams) => void;
};
type DispatchDefaultCTARecord<Initial extends CTAInitial> = Readonly<{
    replace(payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined), options?: OptionsParams): void;
    replaceInitial(payload: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined), options?: OptionsParams): void;
    reset(payload?: Initial | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Initial | undefined), options?: OptionsParams): void;
    update(payload: Partial<Initial> | ((ctaState: UseCTAReturnTypeDispatchState<Initial>) => Partial<Initial> | undefined), options?: OptionsParams): void;
    update(key: keyof Initial, value: Initial[keyof Initial], options?: OptionsParams): void;
}>;
type UseCTAReturnTypeDispatchCTA<Initial extends CTAInitial, Actions = undefined> = Readonly<OmitEmptyRecord<DispatchCustomCTAWithOptionalPayload<Initial, Actions> & DispatchCustomCTAWithoutPayload<Initial, Actions> & DispatchCustomCTAWithPayload<Initial, Actions> & DispatchDefaultCTARecord<Initial>>>;
type UseCTAReturnTypeDispatchState<Initial extends CTAInitial> = Readonly<Pick<CustomCTAStateParam<Initial>, 'changes' | 'current' | 'initial' | 'previous'>>;
export type UseCTAReturnTypeDispatch<Initial extends CTAInitial, Actions = undefined> = DispatchCTA<Initial, Actions> & {
    readonly cta: UseCTAReturnTypeDispatchCTA<Initial, Actions>;
    readonly state: UseCTAReturnTypeDispatchState<Initial>;
};
/**
 * @template Initial - Initial state of the CTA.
 * @template Actions - Record of action functions to be used in the context of the CTA.
 * @typedef {Object} UseCTAParameter
 * @property {Actions | undefined} [actions] - Record of action functions to be used in the context of the CTA.
 * @property {Initial} initial - Initial state of the CTA.
 * @property {((initial: Initial) => Initial) | undefined} [onInit] - Function to be called when the CTA is initialized.
 */
export type UseCTAParameter<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined> = {
    actions?: Actions;
    initial: Initial;
    onInit?: ((initial: Initial) => Initial);
};
export type UseCTAReturnType<Initial extends CTAInitial, Actions = undefined> = [
    Initial,
    UseCTAReturnTypeDispatch<Initial, Actions>
];
/**
 * @link https://react.dev/reference/react/useContext#updating-data-passed-via-context
 * @param contextParams
 */
export function createCTAContext<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined>(contextParams: UseCTAParameter<Initial, Actions>): {
    CTAProvider(props: React.PropsWithChildren): import("react/jsx-runtime").JSX.Element;
    useCTAStateContext(): Initial;
    useCTADispatchContext(): import("index").UseCTAReturnTypeDispatch<Initial, Actions> | null;
};
export function useCTA<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined>(useCTAParameter: UseCTAParameter<Initial, Actions>): UseCTAReturnType<Initial, Actions>;

//# sourceMappingURL=types.d.ts.map
