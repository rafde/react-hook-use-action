import { strictDeepEqual } from "fast-equals";
import React from "react";
import { JSX } from "react/jsx-runtime";
export type CTAInitial = Record<string | number, unknown>;
export type CTAState<Initial extends CTAInitial> = Readonly<{
    initial: Readonly<Initial>;
    previousInitial: Readonly<Initial> | null;
    current: Readonly<Initial>;
    previous: Readonly<Initial> | null;
    changes: Readonly<Partial<Initial>> | null;
}>;
type DefaultActionsRecord<Initial extends CTAInitial> = {
    replace(ctaState: CTAState<Initial>, payload: Initial): Initial | undefined;
    replaceInitial(ctaState: CTAState<Initial>, payload: Initial): Initial | undefined;
    reset(ctaState: CTAState<Initial>, payload?: Initial): Initial | undefined;
    update(ctaState: CTAState<Initial>, payload: Partial<Initial>): Partial<Initial> | undefined;
    updateInitial(ctaState: CTAState<Initial>, payload: Partial<Initial>): Partial<Initial> | undefined;
};
export type UseCTAParameterCompare = (a: unknown, b: unknown, cmp: typeof strictDeepEqual) => boolean;
export type UseCTAParameterOnInit<Initial> = (initial: Initial) => Initial;
export type UseCTAParameter<Initial extends CTAInitial, Actions> = Actions extends undefined ? {
    actions?: undefined;
    initial: Initial;
    onInit?: UseCTAParameterOnInit<Initial>;
    compare?: UseCTAParameterCompare;
} : {
    actions: Actions;
    initial: Initial;
    onInit?: UseCTAParameterOnInit<Initial>;
    compare?: UseCTAParameterCompare;
};
type ActionTypeOptionsNoAugmentedActionDefined = {
    useDefault: true;
};
type ActionTypeOptions = {
    useDefault?: false;
} | ActionTypeOptionsNoAugmentedActionDefined;
type ActionTypeConstructParam<Initial extends CTAInitial, Type extends keyof DefaultActionsRecord<Initial>> = {
    actionTypeOptions?: ActionTypeOptions;
    hasAugmentedAction: boolean;
    nextState: Parameters<DefaultActionsRecord<Initial>[Type]>[1];
    type: Type;
};
declare class ActionType<Initial extends CTAInitial, Type extends keyof DefaultActionsRecord<Initial>> {
    readonly type: ActionTypeConstructParam<Initial, Type>['type'];
    readonly nextState: Readonly<ActionTypeConstructParam<Initial, Type>['nextState']>;
    readonly actionTypeOptions: ActionTypeOptions;
    constructor(param: ActionTypeConstructParam<Initial, Type>);
}
declare class UpdateInitialActionType<Initial extends CTAInitial> extends ActionType<Initial, 'updateInitial'> {
    constructor(param: Pick<ActionTypeConstructParam<Initial, 'updateInitial'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>);
}
declare function createUpdateInitialActionType<Initial extends CTAInitial, Actions>(actions: Actions): (nextState: ActionTypeConstructParam<Initial, "updateInitial">["nextState"], actionTypeOptions?: ActionTypeOptions) => UpdateInitialActionType<Initial>;
declare class ResetActionType<Initial extends CTAInitial> extends ActionType<Initial, 'reset'> {
    constructor(param: Pick<ActionTypeConstructParam<Initial, 'reset'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>);
}
declare function createResetActionType<Initial extends CTAInitial, Actions>(actions: Actions): (nextState?: ActionTypeConstructParam<Initial, "reset">["nextState"], actionTypeOptions?: ActionTypeOptions) => ResetActionType<Initial>;
declare class UpdateActionType<Initial extends CTAInitial> extends ActionType<Initial, 'update'> {
    constructor(param: Pick<ActionTypeConstructParam<Initial, 'update'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>);
}
declare function createUpdateActionType<Initial extends CTAInitial, Actions>(actions: Actions): (nextState: ActionTypeConstructParam<Initial, "update">["nextState"], actionTypeOptions?: ActionTypeOptions) => UpdateActionType<Initial>;
declare class ReplaceActionType<Initial extends CTAInitial> extends ActionType<Initial, 'replace'> {
    constructor(param: Pick<ActionTypeConstructParam<Initial, 'replace'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>);
}
declare function createReplaceActionType<Initial extends CTAInitial, Actions>(actions: Actions): (nextState: ActionTypeConstructParam<Initial, "replace">["nextState"], actionTypeOptions?: ActionTypeOptions) => ReplaceActionType<Initial>;
declare class ReplaceInitialActionType<Initial extends CTAInitial> extends ActionType<Initial, 'replaceInitial'> {
    constructor(param: Pick<ActionTypeConstructParam<Initial, 'replaceInitial'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>);
}
declare function createReplaceInitialActionType<Initial extends CTAInitial, Actions>(actions: Actions): (nextState: ActionTypeConstructParam<Initial, "replaceInitial">["nextState"], actionTypeOptions?: ActionTypeOptions) => ReplaceInitialActionType<Initial>;
type Immutable<T> = T extends (infer R)[] ? ReadonlyArray<Immutable<R>> : T extends Function ? T : T extends object ? {
    readonly [P in keyof T]: Immutable<T[P]>;
} : T;
export type CustomCTAStateParam<Initial extends CTAInitial, Actions> = CTAState<Initial> & Immutable<{
    replaceAction: ReturnType<typeof createReplaceActionType<Initial, Actions>>;
    replaceInitialAction: ReturnType<typeof createReplaceInitialActionType<Initial, Actions>>;
    resetAction: ReturnType<typeof createResetActionType<Initial, Actions>>;
    updateAction: ReturnType<typeof createUpdateActionType<Initial, Actions>>;
    updateInitialAction: ReturnType<typeof createUpdateInitialActionType<Initial, Actions>>;
}>;
type CustomCTAReturnType<Initial extends CTAInitial> = undefined | ReplaceActionType<Initial> | ReplaceInitialActionType<Initial> | ResetActionType<Initial> | UpdateActionType<Initial> | UpdateInitialActionType<Initial> | Partial<Initial>;
type UseCTAParameterActionsCustomRecord<Initial extends CTAInitial> = {
    [customAction: string | number]: (ctaState: CustomCTAStateParam<Initial, undefined>, ...args: any[]) => CustomCTAReturnType<Initial>;
};
type UseCTAParameterActionsRecordProp<Initial extends CTAInitial> = Partial<DefaultActionsRecord<Initial>> & UseCTAParameterActionsCustomRecord<Initial>;
type CustomActionsRecord<Initial extends CTAInitial, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>>]: (ctaState: CustomCTAStateParam<Initial, Actions>, ...args: any[]) => CustomCTAReturnType<Initial>;
};
type ActionsRecordProp<Initial extends CTAInitial, Actions extends Partial<DefaultActionsRecord<Initial>>> = Partial<DefaultActionsRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
type ArgsProp<Args extends unknown[]> = Args extends [] ? {
    args?: undefined;
} : ([
    undefined
] extends Args ? {
    args?: Args;
} : {
    args: Args;
});
type DispatchValueActionPayloadArgsProps<Args extends unknown[]> = Args extends [infer Payload, ...infer A] ? ({
    payload: Payload;
} & ArgsProp<A>) : Args extends [] ? {
    payload?: undefined;
    args?: undefined;
} : ([
    undefined
] extends Args ? ({
    payload?: Args[0];
} & (Args extends [unknown?, ...infer Options] ? ArgsProp<Options> : {
    args?: undefined;
})) : never);
type OmitEmptyRecord<T> = {
    [K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K];
};
type PayloadValues<Initial extends CTAInitial, ActionType extends keyof DefaultActionsRecord<Initial>, Payload = Parameters<DefaultActionsRecord<Initial>[ActionType]>[1]> = Payload | ((ctaPayloadCallbackParameter: CTAState<Initial>) => Payload | undefined);
type DispatchCTAFlatUpdateRecord<Initial extends CTAInitial, ReturnValue = void> = {
    update(payload: PayloadValues<Initial, 'update'>): ReturnValue;
};
type DispatchCTABaseDefaultRecord<Initial extends CTAInitial, ReturnValue = void> = Readonly<{
    reset(payload?: PayloadValues<Initial, 'reset'>): ReturnValue;
    updateInitial(payload: PayloadValues<Initial, 'updateInitial'>): ReturnValue;
    replace(payload: PayloadValues<Initial, 'replace'>): ReturnValue;
    replaceInitial(payload: PayloadValues<Initial, 'replaceInitial'>): ReturnValue;
}>;
type DispatchCTADefaultRecord<Initial extends CTAInitial, ReturnValue = void> = DispatchCTABaseDefaultRecord<Initial, ReturnValue> & Readonly<{
    update(key: keyof Initial, value: Initial[keyof Initial]): ReturnValue;
    update(payload: PayloadValues<Initial, 'update'>, value?: never): ReturnValue;
}>;
type UpdateInitialCTAProps<Initial extends CTAInitial> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['updateInitial']>> & {
    type: 'updateInitial';
    args?: never;
};
type ResetCTAProps<Initial extends CTAInitial> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['reset']>> & {
    type: 'reset';
    args?: never;
};
type UpdateCTAProps<Initial extends CTAInitial> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTAFlatUpdateRecord<Initial>['update']>> & {
    type: 'update';
    args?: never;
};
type ReplaceCTAProps<Initial extends CTAInitial> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['replace']>> & {
    type: 'replace';
    args?: never;
};
type ReplaceInitialCTAProps<Initial extends CTAInitial> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['replaceInitial']>> & {
    type: 'replaceInitial';
    args?: never;
};
type DefaultCTAProps<Initial extends CTAInitial> = UpdateInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial> | ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial>;
type CustomCTARecord<Initial extends CTAInitial, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>> as Actions[Action] extends (...args: infer Args) => CustomCTAReturnType<Initial> ? (Args extends [] ? Action : ([
        undefined
    ] extends Args ? Action : (Args extends [...infer A] ? (A[0] extends CustomCTAStateParam<Initial, Actions> ? Action : never) : never))) : never]: Actions[Action];
};
type DispatchCustomCTARecordValues<Initial extends CTAInitial, ActionValue, ReturnValue = void> = ActionValue extends ((ctaParam: any, ...args: infer Args) => CustomCTAReturnType<Initial>) ? (Args extends [] ? (() => ReturnValue) : (Args extends [unknown?, ...infer A] ? ((payload?: Args[0] | ((payloadParameter: CTAState<Initial>) => Args[0] | undefined), ...args: A) => ReturnValue) : Args extends [infer Payload, ...infer A] ? (Payload extends undefined ? ((payload?: Payload | ((payloadParameter: CTAState<Initial>) => Payload | undefined), ...args: A) => ReturnValue) : (payload: Payload | ((payloadParameter: CTAState<Initial>) => Payload | undefined), ...args: A) => ReturnValue) : never)) : never;
type DispatchCustomCTARecord<Initial extends CTAInitial, Actions, ReturnValue = void, CustomActions = CustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: DispatchCustomCTARecordValues<Initial, CustomActions[Action], ReturnValue>;
};
type UseCTAReturnTypeDispatchCTA<Initial extends CTAInitial, Actions, ReturnValue = void> = Readonly<OmitEmptyRecord<DispatchCustomCTARecord<Initial, Actions, ReturnValue> & DispatchCTADefaultRecord<Initial, ReturnValue>>>;
type CustomDispatchValueRecord<Initial extends CTAInitial, Actions, CustomActions = DispatchCustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: (CustomActions[Action] extends ((...args: infer Args) => void) ? DispatchValueActionPayloadArgsProps<Args> : never) & {
        type: Action;
    };
};
type CustomDispatchValueRecordValues<Initial extends CTAInitial, Actions, CustomActions = CustomDispatchValueRecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];
type DispatchCTA<Initial extends CTAInitial, Actions, ReturnValue = void> = (value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial>, never>) => ReturnValue;
export type UseCTAReturnTypeDispatch<Initial extends CTAInitial, Actions, ReturnValue = void> = Immutable<DispatchCTA<Initial, Actions, ReturnValue> & {
    cta: UseCTAReturnTypeDispatchCTA<Initial, Actions, ReturnValue>;
    state: CTAState<Initial>;
}>;
export type UseCTAReturnType<Initial extends CTAInitial, Actions, ReturnValue = void> = [
    CTAState<Initial>,
    UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>
];
export function useCTA<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(useCTAParameter: UseCTAParameter<Initial, ActionsRecord>): UseCTAReturnType<Initial, ActionsRecord>;
export function returnUseCTAParameter<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial>, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(params: UseCTAParameter<Initial, ActionsRecord>): UseCTAParameter<Initial, ActionsRecord>;
/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 */
export function createCTAContext<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(contextParams: UseCTAParameter<Initial, Actions>): {
    CTAProvider(props: React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, "initial" | "onInit">>>): JSX.Element;
    useCTAStateContext(): Readonly<{
        initial: Readonly<Initial>;
        previousInitial: Readonly<Initial> | null;
        current: Readonly<Initial>;
        previous: Readonly<Initial> | null;
        changes: Readonly<Partial<Initial>> | null;
    }>;
    useCTADispatchContext(): UseCTAReturnTypeDispatch<Initial, ActionsRecord, void> | null;
};
export function ctaCallback<Initial extends CTAInitial, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(useCTAParameter: ActionsRecord extends undefined ? {
    actions?: undefined;
    initial: Initial;
    compare?: ((a: unknown, b: unknown, cmp: typeof strictDeepEqual) => boolean);
} : {
    actions: ActionsRecord;
    initial: Initial;
    compare?: ((a: unknown, b: unknown, cmp: typeof strictDeepEqual) => boolean);
}): UseCTAReturnType<Initial, ActionsRecord, CTAState<Initial>>;

//# sourceMappingURL=types.d.ts.map
