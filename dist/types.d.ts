import React from "react";
export type CTAInitial = Record<string | number, unknown>;
type PredefinedActions = 'replace' | 'replaceInitial' | 'reset' | 'update';
type ActionTypeConstructParam<Initial extends CTAInitial> = {
    type: PredefinedActions;
    nextState?: Initial | Partial<Initial>;
    options?: {
        useDefault: boolean;
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
    static create<Initial extends CTAInitial>(nextState?: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
    constructor(param: Pick<ActionTypeConstructParam<Initial>, 'options'> & {
        nextState?: Initial;
    });
}
declare class UpdateActionType<Initial extends CTAInitial> extends ActionType<Initial> {
    static create<Initial extends CTAInitial>(nextState: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options']): UpdateActionType<Initial>;
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
    resetAction(result?: Initial, options?: ActionTypeConstructParam<Initial>['options']): ResetActionType<Initial>;
}>;
type CustomCTAReturnType<Initial extends CTAInitial> = undefined | ReplaceActionType<Initial> | ReplaceInitialActionType<Initial> | ResetActionType<Initial> | UpdateActionType<Initial> | Partial<Initial>;
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
export type CTAPayloadCallbackParameter<Initial extends CTAInitial> = Readonly<Pick<CustomCTAStateParam<Initial>, 'changes' | 'current' | 'initial' | 'previous'>>;
type ReplaceCTAProps<Initial extends CTAInitial> = {
    type: 'replace';
    payload: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
    type: 'replaceInitial';
    payload: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type ResetCTAProps<Initial extends CTAInitial> = {
    type: 'reset';
    payload?: undefined;
    options?: OptionsParams;
} | {
    type: 'reset';
    payload?: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined);
    options?: OptionsParams;
};
type UpdateCTAProps<Initial extends CTAInitial> = {
    type: 'update';
    payload: Partial<Initial> | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Partial<Initial> | undefined);
    options?: OptionsParams;
};
type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial>;
type CustomCTAWithoutArgumentsRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends (() => Partial<Initial>) ? (Parameters<Actions[Action]>['length'] extends 0 ? Action : never) : never]: (() => Partial<Initial>);
};
type CustomCTAWithoutArgumentsProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutArgumentsRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithoutPayloadRecord;
    payload?: never;
    options?: never;
};
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
    payload?: CustomActionsWithOptionalPayloadParameter | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => CustomActionsWithOptionalPayloadParameter | undefined);
    options?: OptionsParams;
};
type CTAWithPayloadParameter<Initial extends CTAInitial, CTA> = CTA extends ((ctaParam: CustomCTAStateParam<Initial>, payload: infer P) => CustomCTAReturnType<Initial>) ? P : never;
type CustomCTAWithPayloadRecord<Initial extends CTAInitial, Actions = undefined> = {
    [Action in Exclude<keyof Actions, keyof DispatchDefaultCTARecord<Initial>> as Actions[Action] extends ((ctaParam: CustomCTAStateParam<Initial>, payload: infer U) => CustomCTAReturnType<Initial>) ? (undefined extends U ? never : Action) : never]: (ctaParam: CustomCTAStateParam<Initial>, payload: CTAWithPayloadParameter<Initial, Actions[Action]>) => CustomCTAReturnType<Initial>;
};
type CustomCTAWithPayloadProps<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayload = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameter = CTAWithPayloadParameter<Initial, CustomActionsWithPayload[keyof CustomActionsWithPayload]>> = CustomActionsWithPayload extends Record<string | number | symbol, never> ? never : {
    type: keyof CustomActionsWithPayload;
    payload: CustomActionsWithPayloadParameter | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => CustomActionsWithPayloadParameter | undefined);
    options?: OptionsParams;
};
type DispatchCTA<Initial extends CTAInitial, Actions = undefined> = (value: Exclude<CustomCTAWithoutArgumentsProps<Initial, Actions> | CustomCTAWithoutPayloadProps<Initial, Actions> | CustomCTAWithOptionalPayloadProps<Initial, Actions> | CustomCTAWithPayloadProps<Initial, Actions> | DefaultCTAProps<Initial>, never>) => void;
type DispatchCustomCTAWithoutArguments<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutArgumentsRecord = CustomCTAWithoutArgumentsRecord<Initial, Actions>> = CustomActionsWithoutArgumentsRecord extends Record<string | number | symbol, never> ? CustomActionsWithoutArgumentsRecord : {
    [Action in keyof CustomActionsWithoutArgumentsRecord]: () => void;
};
type DispatchCustomCTAWithoutPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithoutPayloadRecord = CustomCTAWithoutPayloadRecord<Initial, Actions>> = CustomActionsWithoutPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithoutPayloadRecord : {
    [Action in keyof CustomActionsWithoutPayloadRecord]: (payload?: undefined, options?: OptionsParams) => void;
};
type DispatchCustomCTAWithOptionalPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithOptionalPayloadRecord = CustomCTAWithOptionalPayloadRecord<Initial, Actions>, CustomActionsWithOptionalPayloadParameters = CTAWithOptionalPayloadRecordParameters<Initial, CustomActionsWithOptionalPayloadRecord[keyof CustomActionsWithOptionalPayloadRecord]>> = CustomActionsWithOptionalPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithOptionalPayloadRecord : Readonly<{
    [Action in keyof CustomActionsWithOptionalPayloadRecord]: (payload?: CustomActionsWithOptionalPayloadParameters | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => CustomActionsWithOptionalPayloadParameters | void), options?: OptionsParams) => void;
}>;
type DispatchCustomCTAWithPayload<Initial extends CTAInitial, Actions = undefined, CustomActionsWithPayloadRecord = CustomCTAWithPayloadRecord<Initial, Actions>, CustomActionsWithPayloadParameters = CTAWithPayloadParameter<Initial, CustomActionsWithPayloadRecord[keyof CustomActionsWithPayloadRecord]>> = CustomActionsWithPayloadRecord extends Record<string | number | symbol, never> ? CustomActionsWithPayloadRecord : {
    [Action in keyof CustomActionsWithPayloadRecord]: (payload: CustomActionsWithPayloadParameters | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => CustomActionsWithPayloadParameters | void), options?: OptionsParams) => void;
};
type DispatchDefaultCTARecord<Initial extends CTAInitial> = Readonly<{
    replace(payload: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined), options?: OptionsParams): void;
    replaceInitial(payload: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined), options?: OptionsParams): void;
    reset(payload?: undefined, options?: OptionsParams): void;
    reset(payload?: Initial | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Initial | undefined), options?: OptionsParams): void;
    update(payload: Partial<Initial> | ((ctaPayloadCallbackParameter: CTAPayloadCallbackParameter<Initial>) => Partial<Initial> | undefined), options?: OptionsParams): void;
    update(key: keyof Initial, value: Initial[keyof Initial], options?: OptionsParams): void;
}>;
type UseCTAReturnTypeDispatchCTA<Initial extends CTAInitial, Actions = undefined> = Readonly<OmitEmptyRecord<DispatchCustomCTAWithoutArguments<Initial, Actions> & DispatchCustomCTAWithOptionalPayload<Initial, Actions> & DispatchCustomCTAWithoutPayload<Initial, Actions> & DispatchCustomCTAWithPayload<Initial, Actions> & DispatchDefaultCTARecord<Initial>>>;
type UseCTAReturnTypeDispatchState<Initial extends CTAInitial> = Readonly<Pick<CustomCTAStateParam<Initial>, 'changes' | 'current' | 'initial' | 'previous'>>;
export type UseCTAReturnTypeDispatch<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined> = DispatchCTA<Initial, Actions> & {
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
export type UseCTAReturnType<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined> = [
    Initial,
    UseCTAReturnTypeDispatch<Initial, Actions>
];
/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 * @param contextParams
 */
export function createCTAContext<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined>(contextParams: UseCTAParameter<Initial, Actions>): {
    CTAProvider(props: React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, "initial" | "onInit">>>): import("react/jsx-runtime").JSX.Element;
    useCTAStateContext(): Initial;
    useCTADispatchContext(): UseCTAReturnTypeDispatch<Initial, Actions> | null;
};
export function useCTA<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined>(useCTAParameter: UseCTAParameter<Initial, Actions>): UseCTAReturnType<Initial, Actions>;
export function returnActionsType<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial>>(initial: Initial, actions: Actions): Actions;

//# sourceMappingURL=types.d.ts.map
