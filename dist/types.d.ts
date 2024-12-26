import { strictDeepEqual } from "fast-equals";
import React from "react";
export type CTAState = Record<string | number, unknown>;
type CTAHistory<Initial extends CTAState> = Readonly<{
    current: Readonly<Initial>;
    previous: Readonly<Initial> | null;
    changes: Readonly<Partial<Initial>> | null;
    initial: Readonly<Initial>;
    previousInitial: Readonly<Initial> | null;
}>;
type DefaultActionsRecord<Payload extends CTAState> = {
    replace(ctaHistory: CTAHistory<Payload>, payload: Payload): Payload | undefined;
    replaceInitial(ctaHistory: CTAHistory<Payload>, payload: Payload): Payload | undefined;
    reset(ctaHistory: CTAHistory<Payload>, payload?: Payload): Payload | undefined;
    update(ctaHistory: CTAHistory<Payload>, payload: Partial<Payload>): Partial<Payload> | undefined;
    updateInitial(ctaHistory: CTAHistory<Payload>, payload: Partial<Payload>): Partial<Payload> | undefined;
};
export type UseCTAParameterCompare<Initial extends CTAState> = (previousValue: unknown, nextValue: unknown, extra: {
    cmp: typeof strictDeepEqual;
    key: keyof Initial;
}) => boolean;
type UseCTAParameterOnInit<Initial extends CTAState> = (initial: Initial) => Initial;
type UseCTAParameter<Initial extends CTAState, Actions> = Actions extends undefined ? {
    actions?: undefined;
    initial: Initial;
    onInit?: UseCTAParameterOnInit<Initial>;
    compare?: UseCTAParameterCompare<Initial>;
} : {
    actions: Actions;
    initial: Initial;
    onInit?: UseCTAParameterOnInit<Initial>;
    compare?: UseCTAParameterCompare<Initial>;
};
type ActionTypeOptions = {
    useDefault?: boolean;
};
type ActionTypeConstructParam<Payload extends CTAState, Type extends keyof DefaultActionsRecord<Payload>> = {
    actionTypeOptions?: ActionTypeOptions;
    hasAugmentedAction: boolean;
    payload: Parameters<DefaultActionsRecord<Payload>[Type]>[1];
    type: Type;
};
declare class ActionType<Payload extends CTAState, Type extends keyof DefaultActionsRecord<Payload>> {
    readonly type: ActionTypeConstructParam<Payload, Type>['type'];
    readonly payload: Readonly<ActionTypeConstructParam<Payload, Type>['payload']>;
    readonly actionTypeOptions: ActionTypeOptions;
    constructor(param: ActionTypeConstructParam<Payload, Type>);
}
declare class UpdateInitialActionType<Payload extends CTAState> extends ActionType<Payload, 'updateInitial'> {
    constructor(param: Pick<ActionTypeConstructParam<Payload, 'updateInitial'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>);
}
declare class ResetActionType<Payload extends CTAState> extends ActionType<Payload, 'reset'> {
    constructor(param: Pick<ActionTypeConstructParam<Payload, 'reset'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>);
}
declare class UpdateActionType<Payload extends CTAState> extends ActionType<Payload, 'update'> {
    constructor(param: Pick<ActionTypeConstructParam<Payload, 'update'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>);
}
declare class ReplaceActionType<Payload extends CTAState> extends ActionType<Payload, 'replace'> {
    constructor(param: Pick<ActionTypeConstructParam<Payload, 'replace'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>);
}
declare class ReplaceInitialActionType<Payload extends CTAState> extends ActionType<Payload, 'replaceInitial'> {
    constructor(param: Pick<ActionTypeConstructParam<Payload, 'replaceInitial'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>);
}
type Immutable<T> = T extends (infer R)[] ? ReadonlyArray<Immutable<R>> : T extends Function ? T : T extends object ? {
    readonly [P in keyof T]: Immutable<T[P]>;
} : T;
type CustomCTAHistory<Payload extends CTAState> = CTAHistory<Payload> & Immutable<{
    replaceAction: (payload: Payload, actionTypeOptions?: ActionTypeOptions) => ReplaceActionType<Payload>;
    replaceInitialAction: (payload: Payload, actionTypeOptions?: ActionTypeOptions) => ReplaceInitialActionType<Payload>;
    resetAction: (payload?: (Payload | undefined), actionTypeOptions?: ActionTypeOptions) => ResetActionType<Payload>;
    updateAction: (payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions) => UpdateActionType<Payload>;
    updateInitialAction: (payload: Partial<Payload>, actionTypeOptions?: ActionTypeOptions) => UpdateInitialActionType<Payload>;
}>;
type CustomCTAReturnType<Initial extends CTAState> = undefined | ReplaceActionType<Initial> | ReplaceInitialActionType<Initial> | ResetActionType<Initial> | UpdateActionType<Initial> | UpdateInitialActionType<Initial> | Partial<Initial>;
type UseCTAParameterActionsCustomRecord<Initial extends CTAState> = {
    [customAction: string | number]: ((ctaState: CustomCTAHistory<Initial>, ...args: any[]) => CustomCTAReturnType<Initial>) | (() => Partial<Initial>);
};
type UseCTAParameterActionsRecordProp<Initial extends CTAState> = Partial<DefaultActionsRecord<Initial>> & UseCTAParameterActionsCustomRecord<Initial>;
type CustomActionsRecord<Initial extends CTAState, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>>]: ((ctaState: CustomCTAHistory<Initial>, ...args: any[]) => CustomCTAReturnType<Initial>) | (() => Partial<Initial>);
};
type ActionsRecordProp<Initial extends CTAState, Actions extends Partial<DefaultActionsRecord<Initial>>> = Partial<DefaultActionsRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
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
type PayloadValues<Initial extends CTAState, ActionType extends keyof DefaultActionsRecord<Initial>, Payload = Parameters<DefaultActionsRecord<Initial>[ActionType]>[1]> = Payload | ((ctaPayloadCallbackParameter: CTAHistory<Initial>) => Payload | undefined);
type DispatchCTAFlatUpdateRecord<Initial extends CTAState, ReturnValue = void> = {
    update(payload: PayloadValues<Initial, 'update'>): ReturnValue;
};
type DispatchCTABaseDefaultRecord<Initial extends CTAState, ReturnValue = void> = Readonly<{
    reset(payload?: PayloadValues<Initial, 'reset'>): ReturnValue;
    updateInitial(payload: PayloadValues<Initial, 'updateInitial'>): ReturnValue;
    replace(payload: PayloadValues<Initial, 'replace'>): ReturnValue;
    replaceInitial(payload: PayloadValues<Initial, 'replaceInitial'>): ReturnValue;
}>;
type DispatchCTADefaultRecord<Initial extends CTAState, ReturnValue = void> = DispatchCTABaseDefaultRecord<Initial, ReturnValue> & Readonly<{
    update(key: keyof Initial, value: Initial[keyof Initial]): ReturnValue;
    update(payload: PayloadValues<Initial, 'update'>, value?: never): ReturnValue;
}>;
type UpdateInitialCTAProps<Initial extends CTAState> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['updateInitial']>> & {
    type: 'updateInitial';
    args?: never;
};
type ResetCTAProps<Initial extends CTAState> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['reset']>> & {
    type: 'reset';
    args?: never;
};
type UpdateCTAProps<Initial extends CTAState> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTAFlatUpdateRecord<Initial>['update']>> & {
    type: 'update';
    args?: never;
};
type ReplaceCTAProps<Initial extends CTAState> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['replace']>> & {
    type: 'replace';
    args?: never;
};
type ReplaceInitialCTAProps<Initial extends CTAState> = DispatchValueActionPayloadArgsProps<Parameters<DispatchCTADefaultRecord<Initial>['replaceInitial']>> & {
    type: 'replaceInitial';
    args?: never;
};
type DefaultCTAProps<Initial extends CTAState> = UpdateInitialCTAProps<Initial> | ResetCTAProps<Initial> | UpdateCTAProps<Initial> | ReplaceCTAProps<Initial> | ReplaceInitialCTAProps<Initial>;
type CustomCTARecord<Initial extends CTAState, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>> as Actions[Action] extends (...args: infer Args) => CustomCTAReturnType<Initial> ? (Args extends [] ? Action : ([
        undefined
    ] extends Args ? Action : (Args extends [...infer A] ? (A[0] extends CustomCTAHistory<Initial> ? Action : never) : never))) : never]: Actions[Action];
};
type DispatchCustomCTARecordValues<Initial extends CTAState, ActionValue, ReturnValue = void> = ActionValue extends ((ctaParam: any, ...args: infer Args) => CustomCTAReturnType<Initial>) ? (Args extends [] ? (() => ReturnValue) : (Args extends [unknown?, ...infer A] ? ((payload?: Args[0], ...args: A) => ReturnValue) : Args extends [infer Payload, ...infer A] ? (Payload extends undefined ? ((payload?: Payload, ...args: A) => ReturnValue) : (payload: Payload, ...args: A) => ReturnValue) : never)) : never;
type DispatchCustomCTARecord<Initial extends CTAState, Actions, ReturnValue = void, CustomActions = CustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: DispatchCustomCTARecordValues<Initial, CustomActions[Action], ReturnValue>;
};
type UseCTAReturnTypeDispatchCTA<Initial extends CTAState, Actions, ReturnValue = void> = Readonly<OmitEmptyRecord<DispatchCustomCTARecord<Initial, Actions, ReturnValue> & DispatchCTADefaultRecord<Initial, ReturnValue>>>;
type CustomDispatchValueRecord<Initial extends CTAState, Actions, CustomActions = DispatchCustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: (CustomActions[Action] extends ((...args: infer Args) => void) ? DispatchValueActionPayloadArgsProps<Args> : never) & {
        type: Action;
    };
};
type CustomDispatchValueRecordValues<Initial extends CTAState, Actions, CustomActions = CustomDispatchValueRecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];
type DispatchCTA<Initial extends CTAState, Actions, ReturnValue = void> = (value: Exclude<CustomDispatchValueRecordValues<Initial, Actions> | DefaultCTAProps<Initial>, never>) => ReturnValue;
export type UseCTAReturnTypeDispatch<Initial extends CTAState, Actions, ReturnValue = void> = Immutable<DispatchCTA<Initial, Actions, ReturnValue> & {
    cta: UseCTAReturnTypeDispatchCTA<Initial, Actions, ReturnValue>;
    history: CTAHistory<Initial>;
}>;
export type UseCTAReturnType<Initial extends CTAState, Actions, ReturnValue = void> = [
    CTAHistory<Initial>,
    UseCTAReturnTypeDispatch<Initial, Actions, ReturnValue>
];
export function useCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(useCTAParameter: UseCTAParameter<Initial, ActionsRecord>): UseCTAReturnType<Initial, ActionsRecord>;
export function returnCTAParameter<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial>, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(params: UseCTAParameter<Initial, ActionsRecord>): UseCTAParameter<Initial, ActionsRecord>;
/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 */
export function createCTAContext<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(contextParams: UseCTAParameter<Initial, Actions>): {
    CTAProvider: React.FC<React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'onInit' | 'compare'>>>>;
    useCTAHistoryContext: () => UseCTAReturnType<Initial, Actions>[0];
    useCTADispatchContext: () => UseCTAReturnType<Initial, ActionsRecord>[1] | null;
};
type CreateCTAProps<Initial extends CTAState, Actions> = Actions extends undefined ? {
    actions?: undefined;
    initial: Initial;
    compare?: UseCTAParameterCompare<Initial>;
} : {
    actions: Actions;
    initial: Initial;
    compare?: UseCTAParameterCompare<Initial>;
};
export function createCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions>(useCTAParameter: CreateCTAProps<Initial, ActionsRecord>): UseCTAReturnType<Initial, ActionsRecord, CTAHistory<Initial>>;

//# sourceMappingURL=types.d.ts.map
