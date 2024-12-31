import { strictDeepEqual } from "fast-equals";
import { FC, PropsWithChildren } from "react";
/**
 * Represents the hook state.
 * The state is a record where the keys can be strings or numbers, and the values can be of any type.
 */
export type CTAState = Record<string | number, unknown>;
type DefaultActionsRecord<Payload extends CTAState> = Required<UseCTAParameterActionsOptionalDefaultRecord<Payload>>;
/**
 * Options for configuring action type behavior
 * @prop {boolean} [useDefault=] - When true, bypasses the use of an overridden action.
 */
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
/**
 * An `object` representing the history of hook state changes.
 *
 * @readonly
 * @template {CTAState} State - The state type extending CTAState
 * @property {CTAState} current - The current hook state
 * @property {CTAState | null} previous - The previous `current` hook state, `null` if no previous state exists.
 * @property {CTAState | null} changes - The changes between the `initial` and `current` state.
 * Tracks only modified properties. `null` if no changes.
 * @property {CTAState} initial - The initial hook state when it was first rendered.
 * @property {CTAState | null} previousInitial - The previous `initial` state. `null` if never no previous initial exists
 */
type CTAHistory<State extends CTAState> = Readonly<{
    current: Readonly<State>;
    previous: Readonly<State> | null;
    changes: Readonly<Partial<State>> | null;
    initial: Readonly<State>;
    previousInitial: Readonly<State> | null;
}>;
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
/**
 * `object` type for defining custom and/or overridden state management actions. It gives you access to the following capabilities:
 * - Gives you a clean, type-safe way to encapsulate your state logic while keeping your component code focused on presentation.
 * - Maintains full TypeScript type safety.
 * - Defines reusable state operations.
 * - Can be called via dispatch.cta or dispatch
 * - Can override the built-in actions.
 * - Custom actions can:
 *    - accept multiple parameters.
 *    - access all built-in actions.
 *
 * @template {string | number} p - Placeholder for custom action key.
 *
 * @template {CTAState} Payload - Extended {@link CTAState} hook state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['update']} [update]
 * - Partially updates properties in {@link CTAHistory}.`current` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAHistory>['replace']} [replace]
 * - Replaces all properties in {@link CTAHistory}.`current` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['reset']} [reset]
 * - Resets the {@link CTAHistory}.`current` state to {@link CTAHistory}.`initial` state
 * <b>or</b> replaces {@link CTAHistory}.`initial` and {@link CTAHistory}.`current` state when a {@link CTAState Payload} is provided.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['updateInitial']} [updateInitial]
 * - Partially updates properties in {@link CTAHistory}.`initial` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['replaceInitial']} [replaceInitial]
 * - Replaces all properties in {@link CTAHistory}.`initial` state.
 *
 * @property {UseCTAParameterActionsRecordProp<CTAState>['p']} [p]
 * - Custom action key `p` can be a `string` or a `number`. This is a powerful way to extend
 * the functionality of your state management system. This gives you the flexibility to:
 * - Create domain-specific actions
 * - Encapsulate complex state updates
 * - Build reusable action patterns
 * - Handle specialized business logic
 *
 * They are defined as Records of functions that accepts 0 to any number of parameters.
 */
type UseCTAParameterActionsRecordProp<Payload extends CTAState> = {
    update?: (ctaHistory: CTAHistory<Payload>, payload: Partial<Payload>) => Partial<Payload> | undefined;
    replace?: (ctaHistory: CTAHistory<Payload>, payload: Payload) => Payload | undefined;
    reset?: (ctaHistory: CTAHistory<Payload>, payload?: Payload) => Payload | undefined;
    updateInitial?: (ctaHistory: CTAHistory<Payload>, payload: Partial<Payload>) => Partial<Payload> | undefined;
    replaceInitial?: (ctaHistory: CTAHistory<Payload>, payload: Payload) => Payload | undefined;
} & {
    [p: string | number]: (() => Partial<Payload>) | ((ctaState: CustomCTAHistory<Payload>, ...args: never[]) => CustomCTAReturnType<Payload>) | undefined;
};
type UseCTAParameterActionsOptionalDefaultRecord<Payload extends CTAState> = Pick<UseCTAParameterActionsRecordProp<Payload>, 'update' | 'replace' | 'reset' | 'updateInitial' | 'replaceInitial'>;
type CustomActionsRecord<Initial extends CTAState, Actions> = Pick<Actions, Exclude<keyof Actions, keyof UseCTAParameterActionsOptionalDefaultRecord<Initial>>>;
type ActionsRecordProp<Initial extends CTAState, Actions extends Partial<UseCTAParameterActionsOptionalDefaultRecord<Initial>>> = Partial<UseCTAParameterActionsOptionalDefaultRecord<Initial>> & CustomActionsRecord<Initial, Actions>;
/**
 * A `function` type for custom comparing the previous and next values of a hook state key.
 * Useful for the following scenarios:
 * - Custom equality logic by comparing only specific properties to optimize re-renders.
 * - Handle complex nested objects that need special comparison handling.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param previousValue - A previous value of the {@link CTAHistory}.`current` key.
 * @param nextValue - A next value for a {@link CTAHistory}.`current` key.
 * @param extra - An object containing additional parameters for the comparison:
 * @param extra.cmp - A comparison function using {@link import('fast-equals').strictDeepEqual strictDeepEqual}
 * from {@link import('fast-equals') fast-equals} library.
 * @param extra.key - The corresponding {@link CTAState} key associated with `previousValue` and `nextValue`.
 * @returns `true` if the previous and next values are considered equal, `false` otherwise.
 */
export type UseCTAParameterCompare<State extends CTAState> = (previousValue: unknown, nextValue: unknown, extra: {
    cmp: typeof strictDeepEqual;
    key: keyof State;
}) => boolean;
/**
 * A `function` than runs once on component mount.
 * Useful when you need to perform calculations or transformations on your {@link CTAHistory}.`initial` state before your component starts using it.
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @param {CTAState} initial - The {@link CTAHistory}.`initial` state.
 * @returns A new {@link CTAHistory}.`initial` state.
 */
type UseCTAParameterOnInit<Initial extends CTAState> = (initial: Initial) => Initial;
type UseCTAParameter<Initial extends CTAState, Actions> = Actions extends undefined ? {
    actions?: undefined;
    /**
   * initial {@link CTAState} structure for {@link CTAHistory}.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
   */
    initial: Initial;
    /**
     * Optional {@link UseCTAParameterOnInit}
     * - `function` for handling `initial` parameter on component mount.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
     */
    onInit?: UseCTAParameterOnInit<Initial>;
    /**
   * Optional {@link UseCTAParameterCompare}
   * - `function` for custom equality logic by comparing only specific properties.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
   */
    compare?: UseCTAParameterCompare<Initial>;
} : {
    /**
     *  Optional {@link UseCTAParameterActionsRecordProp}
     * - `object` to define custom and/or overridden actions for state management.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
     */
    actions: Actions;
    /**
   * initial {@link CTAState} structure for {@link CTAHistory}.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
   */
    initial: Initial;
    /**
   * Optional {@link UseCTAParameterOnInit}
   * - `function` for handling `initial` parameter on component mount.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
   */
    onInit?: UseCTAParameterOnInit<Initial>;
    /**
   * Optional {@link UseCTAParameterCompare}
   * - `function` for custom equality logic by comparing only specific properties.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
   */
    compare?: UseCTAParameterCompare<Initial>;
};
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
type CustomCTARecord<Initial extends CTAState, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>> as Actions[Action] extends (...args: infer Args) => CustomCTAReturnType<Initial> ? (Args extends [] ? Action : (Args extends [...infer A] ? (A[0] extends CustomCTAHistory<Initial> ? Action : never) : never)) : never]: Actions[Action];
};
type DispatchCustomCTARecordValues<Initial extends CTAState, ActionValue, ReturnValue = void> = ActionValue extends ((ctaParam: CustomCTAHistory<Initial>, ...args: infer Args) => CustomCTAReturnType<Initial>) ? (Args extends [] ? (() => ReturnValue) : ((...args: Args) => ReturnValue)) : never;
type DispatchCustomCTARecord<Initial extends CTAState, Actions, ReturnValue = void, CustomActions = CustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: DispatchCustomCTARecordValues<Initial, CustomActions[Action], ReturnValue>;
};
type CustomDispatchValueRecord<Initial extends CTAState, Actions, CustomActions = DispatchCustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: (CustomActions[Action] extends ((...args: infer Args) => void) ? DispatchValueActionPayloadArgsProps<Args> : never) & {
        type: Action;
    };
};
type CustomDispatchValueRecordValues<Initial extends CTAState, Actions, CustomActions = CustomDispatchValueRecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];
type DispatchCTA<Payload extends CTAState, Actions, ReturnValue = void> = (// dispatch
value: Exclude<{
    type: 'replaceInitial' | 'replace';
    payload: Payload | ((ctaHistory: CTAHistory<Payload>) => Payload | undefined);
    args?: never;
} | {
    type: 'update' | 'updateInitial';
    payload: Partial<Payload> | ((ctaHistory: CTAHistory<Payload>) => Partial<Payload> | undefined);
    args?: never;
} | {
    type: 'reset';
    payload?: Payload | ((ctaHistory: CTAHistory<Payload>) => Payload | undefined);
    args?: never;
} | CustomDispatchValueRecordValues<Payload, Actions>, never>) => ReturnValue;
type UseCTAReturnTypeDispatchCTA<Payload extends CTAState, Actions, ReturnValue = void> = {
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
    */
    update(payload: Partial<Payload> | ((ctaHistory: CTAHistory<Payload>) => Partial<Payload> | undefined), _?: never): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
     */
    update<K extends keyof Payload>(key: K, value: Payload[K]): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace dispatch.cta.replace}
     */
    replace(payload: Payload | ((ctaHistory: CTAHistory<Payload>) => Payload | undefined)): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
     */
    updateInitial(payload: Partial<Payload> | ((ctaHistory: CTAHistory<Payload>) => Partial<Payload> | undefined), _?: never): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
     */
    updateInitial<K extends keyof Payload>(key: K, value: Payload[K]): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial dispatch.cta.replaceInitial}
     */
    replaceInitial(payload: Payload | ((ctaHistory: CTAHistory<Payload>) => Payload | undefined)): ReturnValue;
    /**
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset dispatch.cta.reset}
     */
    reset(payload?: Payload | ((ctaHistory: CTAHistory<Payload>) => Payload | undefined)): ReturnValue;
} & {
    [P in keyof Omit<Actions, keyof DefaultActionsRecord<Payload>>]: Actions[P] extends ((ctaParam: CustomCTAHistory<Payload>, ...args: infer Args) => CustomCTAReturnType<Payload>) ? ((...args: Args) => ReturnValue) : never;
};
export type UseCTAReturnTypeDispatch<State extends CTAState, Actions, ReturnValue = void> = Immutable<DispatchCTA<State, Actions, ReturnValue> & {
    /**
     * {@link CTAHistory} reference
     * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
     */
    history: CTAHistory<State>;
    /**
     * Reference for call-to-action dispatch functions.
     */
    cta: OmitEmptyRecord<UseCTAReturnTypeDispatchCTA<State, Actions, ReturnValue>>;
}>;
/**
 * The return type of the useCTA hook.
 */
export type UseCTAReturnType<Initial extends CTAState, Actions> = [
    CTAHistory<Initial>,
    UseCTAReturnTypeDispatch<Initial, Actions>
];
/**
 * A React hook for managing complex state with custom actions, history tracking, and type safety.
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta useCTA}
 *
 * @template {CTAState} Initial
 *
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions
 *
 * @param {UseCTAParameter} useCTAParameter - Parameter for the useCTA.
 *
 * @param {CTAState} useCTAParameter.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterOnInit} [useCTAParameter.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [useCTAParameter.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [useCTAParameter.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {[CTAHistory, UseCTAReturnTypeDispatch]}  An `array` containing {@link CTAHistory} and {@link UseCTAReturnTypeDispatch} elements:
 *
 * 1. {@link CTAHistory} - An `object` representing the history of hook state changes.
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
 *
 * 2. {@link UseCTAReturnTypeDispatch} - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * An `function` containing the following properties:
 * - {@link CTAHistory history} - A read-only reference to {@link CTAHistory} object.
 *
 * - {@link UseCTAReturnTypeDispatchCTA cta} - Read-only reference `object` to access call-to-action dispatch `function`s.
 *
 * `cta.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 * - `cta.update( Partial<CTAState> )`
 * - `cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 * - `cta.replace( CTAState )`
 * - `cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 * - `cta.reset()` - Resets the `current` state back to the `initial` state.
 * - `cta.reset( CTAState )` - Synchronizes the `current` state with the `initial` state.
 * - `cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined )` - Synchronizes the `current` state with the `initial` state.
 * `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 * - `cta.updateInitial( Partial<CTAState> )`
 * - `cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 * - `cta.replaceInitial( CTAState )`
 * - `cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 * - `cta.YourCustomAction( ...args )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function useCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions>(useCTAParameter: UseCTAParameter<Initial, ActionsRecord>): UseCTAReturnType<Initial, ActionsRecord>;
/**
 * A `function` that returns a type safe {@link UseCTAParameter} `object`.
 *
 * Useful if you want to create the parameter outside  {@link useCTA}, {@link createCTA}, or {@link createCTAContext} for type safety.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} params - {@link UseCTAParameter} parameter.
 *
 * @param {CTAState} params.initial - initial {@link CTAState}.
 *
 * @param {UseCTAParameterOnInit} [params.onInit]
 * - {@link UseCTAParameterOnInit} `function` that runs once on component mount.
 *
 * @param {UseCTAParameterCompare} [params.compare]
 * - {@link UseCTAParameterCompare} `function` that compares the previous and current state.
 *
 * @param {UseCTAParameterActionsRecordProp} [params.actions]
 * - {@link UseCTAParameterActionsRecordProp} `object` type to define custom and/or overridden actions for state management.
 *
 * @returns {UseCTAParameter} Type safe {@link UseCTAParameter} `object`.
 */
export function returnCTAParameter<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial>, ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions>(params: UseCTAParameter<Initial, ActionsRecord>): UseCTAParameter<Initial, ActionsRecord>;
/**
 * Type definition for the `CTAProvider` component.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {Partial<UseCTAParameter<Initial, Actions>>} props - The {@link UseCTAParameter} parameter.
 *
 * @param {ReactNode} props.children - `CTAProvider` {@link ReactNode} children.
 *
 * @param {CTAState} [props.initial] - initial {@link CTAState}.
 *
 * @param {UseCTAParameterOnInit<Initial>} [props.onInit] - {@link UseCTAParameterOnInit} `function` that runs once on component mount.
 *
 * @param {UseCTAParameterCompare<Initial>} [props.compare] - {@link UseCTAParameterCompare} `function` that compares the previous and current state.
 *
 * @returns {ReactElement} The `CTAProvider` component.
 */
type CreateCTAContextReturnCTAProvider<Initial extends CTAState, Actions> = FC<PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'onInit' | 'compare'>>>>;
/**
 * Type definition for the return value of the {@link createCTAContext} `function`.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @property {CreateCTAContextReturnCTAProvider<Initial, Actions>} CTAProvider - {@link CreateCTAContextReturnCTAProvider} component.
 * @property {() => CTAHistory} useCTAHistoryContext
 * - A hook for returning {@link CTAHistory} from context.
 * @property {() => UseCTAReturnTypeDispatch | null} useCTADispatchContext
 * - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * `null` if called outside the `CTAProvider`.
 */
type CreateCTAContextReturn<Initial extends CTAState, Actions> = {
    CTAProvider: CreateCTAContextReturnCTAProvider<Initial, Actions>;
    useCTAHistoryContext: () => CTAHistory<Initial>;
    useCTADispatchContext: () => UseCTAReturnTypeDispatch<Initial, Actions> | null;
};
/**
 * A `function` that returns a React Context to use with {@link useCTA}
 * for managing {@link CTAHistory state history} and {@link UseCTAReturnTypeDispatch dispatch} in a `CTAProvider`.
 *
 * This handles the boilerplate of creating a React Context and Provider.
 * @see {@link https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file}
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} contextParams - {@link UseCTAParameter} parameter.
 *
 * @param {UseCTAParameterOnInit} [contextParams.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [contextParams.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [contextParams.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {CreateCTAContextReturn} A {@link CreateCTAContextReturn} object. See {@link https://rafde.github.io/react-hook-use-cta/#create-cta-context-return createCTAContext return value}.
 * Has the following properties:
 * - {@link CreateCTAContextReturn.CTAProvider} - {@link CreateCTAContextReturnCTAProvider} component that requires `children` prop is required.
 * Has options to accept `initial`, `onInit`, and `compare` props.
 * - {@link CreateCTAContextReturn.useCTAHistoryContext} - A hook for returning {@link CTAHistory} from context.
 * - {@link CreateCTAContextReturn.useCTADispatchContext} - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * Returns `null` if called outside the `CTAProvider`.
 *
 * `useCTADispatchContext()?.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 * - `useCTADispatchContext()?.update( Partial<CTAState> )`
 * - `useCTADispatchContext()?.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `useCTADispatchContext()?.update( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `useCTADispatchContext()?.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 * - `useCTADispatchContext()?.replace( CTAState )`
 * - `useCTADispatchContext()?.replace( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `useCTADispatchContext()?.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 * - `useCTADispatchContext()?.reset()` - Resets the `current` state back to the `initial` state.
 * - `useCTADispatchContext()?.reset( CTAState )` - Synchronizes the `current` state with the `initial` state.
 * - `useCTADispatchContext()?.reset( ( CTAHistory<CTAState> ) => CTAState | undefined )` - Synchronizes the `current` state with the `initial` state.
 * `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `useCTADispatchContext()?.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 * - `useCTADispatchContext()?.updateInitial( Partial<CTAState> )`
 * - `useCTADispatchContext()?.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `useCTADispatchContext()?.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `useCTADispatchContext()?.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 * - `useCTADispatchContext()?.replaceInitial( CTAState )`
 * - `useCTADispatchContext()?.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `useCTADispatchContext()?.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 * - `useCTADispatchContext()?.YourCustomAction( ...args )`
 */
export function createCTAContext<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions>(contextParams: UseCTAParameter<Initial, Actions>): CreateCTAContextReturn<Initial, ActionsRecord>;
type CreateCTAProps<Initial extends CTAState, Actions> = Actions extends undefined ? {
    actions?: undefined;
    initial: Initial;
    compare?: UseCTAParameterCompare<Initial>;
} : {
    actions: Actions;
    initial: Initial;
    compare?: UseCTAParameterCompare<Initial>;
};
/**
 * A `function` that provides a way to execute like {@link useCTA} but outside a React component.
 *
 * Useful if you want to handle {@link CTAHistory state history} and dispatch using a 3rd party global state management system.
 *
 * @template {CTAState} Initial - The `initial` state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {CreateCTAProps} ctaParameter - {@link CreateCTAProps} parameter.
 * @param {CTAState} ctaParameter.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 *
 * @param {UseCTAParameterCompare} [ctaParameter.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [ctaParameter.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {[CTAHistory, UseCTAReturnTypeDispatch]}  An `array` containing {@link CTAHistory} and {@link UseCTAReturnTypeDispatch} elements:
 *
 * 1. {@link CTAHistory} - An `object` representing the history of hook state changes.
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
 *
 * 2. {@link UseCTAReturnTypeDispatch} - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * An `function` that returns {@link CTAHistory} and contains the following properties:
 * - {@link CTAHistory history} - A read-only reference to {@link CTAHistory} object.
 *
 * - {@link UseCTAReturnTypeDispatchCTA cta} - Read-only reference `object` to access call-to-action dispatch `function`s.
 * All call-to-action dispatch `functions` return {@link CTAHistory}
 *
 * `cta.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 * - `cta.update( Partial<CTAState> )`
 * - `cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 * - `cta.replace( CTAState )`
 * - `cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 * - `cta.reset()` - Resets the `current` state back to the `initial` state.
 * - `cta.reset( CTAState )` - Synchronizes the `current` state with the `initial` state.
 * - `cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined )` - Synchronizes the `current` state with the `initial` state.
 * `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 * - `cta.updateInitial( Partial<CTAState> )`
 * - `cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 * - `cta.replaceInitial( CTAState )`
 * - `cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 * - `cta.YourCustomAction( ...args )`
 */
export function createCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions>(ctaParameter: CreateCTAProps<Initial, ActionsRecord>): [
    CTAHistory<Initial>,
    UseCTAReturnTypeDispatch<Initial, ActionsRecord, CTAHistory<Initial>>
];

//# sourceMappingURL=types.d.ts.map
