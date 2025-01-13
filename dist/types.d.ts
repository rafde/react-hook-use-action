import { strictDeepEqual } from "fast-equals";
import { FC, PropsWithChildren } from "react";
/**
 * Represents the hook state.
 * The state is a record where the keys can be strings or numbers, and the values can be of any type.
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial Parameter: initial}
 */
export type CTAState = Record<string | number, unknown>;
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
/**
 * A `function` than runs once on component mount.
 * Useful when you need to perform calculations or transformations on your {@link CTAHistory}.`initial` state before your component starts using it.
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @param {CTAState} initial - The {@link CTAHistory}.`initial` state.
 * @returns A new {@link CTAHistory}.`initial` state.
 */
type UseCTAParameterOnInit<Initial extends CTAState> = (initial: Initial) => Initial;
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
/**
 * A `function` that only runs after an action has changed the hook state history.
 * Does not run if the action has not changed the hook state history.
 * Useful for performing side effects after an action has changed the hook state history, such as logging, analytics, setting local storage, etc.
 * Can run `async` or `sync` code.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param {CTAHistory<State>} ctaHistory - The {@link CTAHistory} object after the action has changed the hook state history.
 * @param {keyof UseCTAParameterActionsRecordProp<State>} actionType - Key of {@link UseCTAParameterActionsRecordProp}.
 * @param {string | number} [customActionName] - Custom action key if called by a custom action, otherwise `undefined`.
 * @returns {Promise<void> | void} - A `Promise<void>` or `void`.
 */
type UseCTAParameterAfterActionChange<State extends CTAState> = (ctaHistory: CTAHistory<State>, actionType: keyof UseCTAParameterActionsOptionalDefaultRecord<State>, customActionName?: string | number) => Promise<void> | void;
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
 * A `function` that returns a transform {@link CTAState} object before a default action evaluates the result of a custom action or overridden default action.
 * This is useful for transforming the result of a custom action or overridden default action
 * and can server as an alternative to overriding default actions.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param {State} nextState - Next {@link CTAState} object that is the result of the custom action or overridden default action.
 * @param {CTAHistory & {actionType: keyof DefaultActionsRecord<State>, customActionName?: string | number}} transformCTAHistory - An extended {@link CTAHistory} object.
 * @param {keyof DefaultActionsRecord<State>} transformCTAHistory.actionType - Key of {@link UseCTAParameterActionsRecordProp}.
 * @param {string | number} [transformCTAHistory.customActionName] - Custom action key if called by a custom action, otherwise `undefined`.
 * @returns {State | Partial<State>} - Transformed {@link CTAState} object.
 */
type UseCTAParameterTransform<State extends CTAState, ActionType extends Record<keyof DefaultActionsRecord<State>, (...args: any) => any> = DefaultActionsRecord<State>, ActionTypeReturnValueRecord = {
    [K in keyof ActionType]: ActionType[K] extends (...args: any) => any ? Parameters<ActionType[K]>[1] : never;
}, nextState = ActionTypeReturnValueRecord[keyof ActionTypeReturnValueRecord]> = (nextState: Exclude<nextState, undefined>, transformCTAHistory: {
    actionType: keyof ActionType;
    customAction?: string | number;
} & CTAHistory<State>) => nextState;
/**
 * Parameter type for {@link useCTA} or {@link createCTAContext}.
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @template {UseCTAParameterActionsRecordProp | undefined} Actions
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter useCTA Parameter}
 */
type UseCTAParameter<Initial extends CTAState, Actions> = {
    /**
     *  Optional {@link UseCTAParameterActionsRecordProp}
     * - `object` to define custom and/or overridden actions for state management.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
     */
    actions?: Actions;
    /**
     * Optional {@link UseCTAParameterAfterActionChange}
     * - `function` than only runs after an action has changed the hook state history.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChanged}
     */
    afterActionChange?: UseCTAParameterAfterActionChange<Initial>;
    /**
     * Optional {@link UseCTAParameterCompare}
     * - `function` for custom equality logic by comparing only specific properties.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
     */
    compare?: UseCTAParameterCompare<Initial>;
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
     * Optional {@link UseCTAParameterTransform}
     * - A `function` that returns a transformed {@link CTAState} object
     * before a default action evaluates the result of a custom action or overridden default action.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
     */
    transform?: UseCTAParameterTransform<Initial>;
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
type UseCTAParameterFuncRecord = Record<string | number, (...args: never[]) => unknown>;
type UseCTAParameterCreateFunc<Initial extends CTAState, Action, FR extends UseCTAParameterFuncRecord, ReturnType> = (dispatch: UseCTADispatch<Initial, Action, ReturnType>) => FR;
type CustomCTARecord<Initial extends CTAState, Actions> = {
    [Action in Exclude<keyof Actions, keyof DefaultActionsRecord<Initial>> as Actions[Action] extends (...args: infer Args) => CustomCTAReturnType<Initial> ? (Args extends [] ? Action : (Args extends [...infer A] ? (A[0] extends CustomCTAHistory<Initial> ? Action : never) : never)) : never]: Actions[Action];
};
type DispatchCustomCTARecordValues<Initial extends CTAState, ActionValue, ReturnValue> = ActionValue extends ((ctaParam: CustomCTAHistory<Initial>, ...args: infer Args) => CustomCTAReturnType<Initial>) ? (Args extends [] ? (() => ReturnValue) : ((...args: Args) => ReturnValue)) : never;
type DispatchCustomCTARecord<Initial extends CTAState, Actions, ReturnValue, CustomActions = CustomCTARecord<Initial, Actions>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: DispatchCustomCTARecordValues<Initial, CustomActions[Action], ReturnValue>;
};
type CustomDispatchValueRecord<Initial extends CTAState, Actions, ReturnValue, CustomActions = DispatchCustomCTARecord<Initial, Actions, ReturnValue>> = CustomActions extends Record<string | number | symbol, never> ? CustomActions : {
    [Action in keyof CustomActions]: (CustomActions[Action] extends ((...args: infer Args) => void) ? DispatchValueActionPayloadArgsProps<Args> : never) & {
        type: Action;
    };
};
type CustomDispatchValueRecordValues<Initial extends CTAState, Actions, ReturnValue, CustomActions = CustomDispatchValueRecord<Initial, Actions, ReturnValue>> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];
type Dispatch<Payload extends CTAState, Actions, ReturnValue> = (// dispatch
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
} | CustomDispatchValueRecordValues<Payload, Actions, ReturnValue>, never>) => ReturnValue;
type UseCTAReturnTypeDispatchCTA<Payload extends CTAState, Actions, ReturnValue> = {
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
/**
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * @template {CTAState} State - CTAState type.
 * @template Actions - CTA actions type.
 * @template ReturnValue - Return value type.
 */
type UseCTADispatch<State extends CTAState, Actions, ReturnValue> = Immutable<Dispatch<State, Actions, ReturnValue> & {
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
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * @template {CTAState} State - CTAState type.
 * @template Actions - CTA actions type.
 * @template ReturnValue - Return value type.
 */
export type UseCTAReturnTypeDispatch<State extends CTAState, Actions, FR extends UseCTAParameterFuncRecord, ReturnValue> = Immutable<UseCTADispatch<State, Actions, ReturnValue> & {
    func: FR;
}>;
/**
 * The return type of the useCTA hook.
 * @typedef {Array} UseCTAReturnType
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-values useCTA return values}
 * @property {CTAHistory} 0 - The {@link CTAHistory} object.
 * @property {UseCTAReturnTypeDispatch} 1 - The {@link UseCTAReturnTypeDispatch} object.
 */
export type UseCTAReturnType<Initial extends CTAState, Actions, FR extends UseCTAParameterFuncRecord, ReturnValue> = [
    CTAHistory<Initial>,
    UseCTAReturnTypeDispatch<Initial, Actions, FR, ReturnValue>
];
type CustomActionsRecord<Initial extends CTAState, Actions> = Pick<Actions, Exclude<keyof Actions, keyof UseCTAParameterActionsOptionalDefaultRecord<Initial>>>;
type ActionsRecordProp<Initial extends CTAState, Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial>> = UseCTAParameterActionsOptionalDefaultRecord<Initial> & CustomActionsRecord<Initial, Actions>;
/**
 * A React hook for managing complex state with custom actions, history tracking, and type safety.
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta useCTA}
 *
 * @template {CTAState} Initial
 *
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions
 *
 * @param {UseCTAParameter} props - Parameter for the useCTA.
 *
 * @param {CTAState} props.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterOnInit} [props.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` that runs once on component mount to handle `initial` parameter state before your component starts using it.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` type to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param {UseCTAParameterCreateFunc} [createFunc] - Optional {@link UseCTAParameterCreateFunc}
 * - A `function` callback that receives {@link UseCTAReturnTypeDispatch} and expects an object Record of `function`s to be returned.
 * - @see {@link https://rafde.github.io/react-hook-use-cta/##use-cta-parameter-create-func Params: createFunc}
 *
 * @param {UseCTAReturnTypeDispatch} createFunc.dispatch - The parameter passed to {@link UseCTAParameterCreateFunc}
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
 *
 * ```ts
 * cta.update( Partial<CTAState> );
 * cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 *
 * ```ts
 * cta.replace( CTAState );
 * cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 *
 * ```ts;
 * cta.reset()
 * cta.reset( CTAState );
 * cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 *
 * ```ts
 * cta.updateInitial( Partial<CTAState> );
 * cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 *
 * ```ts
 * cta.replaceInitial( CTAState );
 * cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 *
 * ```ts
 * cta.YourCustomAction( ...args );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function useCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, FR extends UseCTAParameterFuncRecord, ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never>(props: UseCTAParameter<Initial, ActionsRecord>, createFunc?: UseCTAParameterCreateFunc<Initial, ActionsRecord, FR, void>): UseCTAReturnType<Initial, ActionsRecord, FR, void>;
/**
 * A `function` that returns a type safe {@link UseCTAParameter} `object`.
 *
 * Useful if you want to create the parameter outside  {@link useCTA}, {@link createCTA}, or {@link createCTAContext} for type safety.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} props - {@link UseCTAParameter} parameter.
 *
 * @param {CTAState} props.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterOnInit} [props.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` that runs once on component mount to handle `initial` parameter state before your component starts using it.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` type to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {UseCTAParameter} Type safe {@link UseCTAParameter} `object`.
 */
export function returnCTAParameter<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never>(props: UseCTAParameter<Initial, ActionsRecord>): UseCTAParameter<Initial, ActionsRecord>;
/**
 * Type definition for the return value of the {@link createCTAContext} `function`.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @property {CreateCTAContextReturn.CTAProvider}
 * - Provider to wrap components that need access to the cta context.
 * @property {() => CTAHistory} useCTAHistoryContext
 * - A hook for returning {@link CTAHistory} from context.
 * @property {() => UseCTAReturnTypeDispatch | null} useCTADispatchContext
 * - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * `null` if called outside the `CTAProvider`.
 */
type CreateCTAContextReturn<Initial extends CTAState, Actions, FR extends UseCTAParameterFuncRecord> = {
    /**
     * Type definition for the `CreateCTAContextReturn.CTAProvider` component.
     *
     * @template {CTAState} Initial - The initial state type.
     * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
     *
     * @param {object} props
     *
     * @param {ReactNode} props.children - {@link ReactNode}.
     *
     * @param {CTAState} [props.initial] - Optional initial {@link CTAState} structure for overriding createCTAContext contextParams.initial {@link CTAHistory}.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
     *
     * @param {UseCTAParameterOnInit} [props.onInit] - Optional {@link UseCTAParameterOnInit} for overriding createCTAContext contextParams.onInit
     * - `function` that runs once on component mount to handle `initial` parameter state before your component starts using it.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
     *
     * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare} for overriding createCTAContext contextParams.compare
     * - `function` for custom equality logic by comparing only specific properties.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
     *
     * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange} for overriding contextParams.afterActionChange
     * - `function` than only runs after an action has changed the hook state history.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
     *
     * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
     * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
     * the result of a custom action or overridden default action.
     * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
     *
     * @returns {ReactElement} The `CTAProvider` component.
     */
    CTAProvider: FC<PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'afterActionChange' | 'compare' | 'initial' | 'onInit' | 'transform'>>>>;
    useCTADispatchContext: () => UseCTAReturnTypeDispatch<Initial, Actions, FR, void> | null;
    useCTAHistoryContext: () => CTAHistory<Initial>;
};
/**
 * A `function` that returns a React Context to use with {@link useCTA}
 * for managing {@link CTAHistory state history} and {@link UseCTAReturnTypeDispatch dispatch} in a React {@link Context.Provider}.
 *
 * This handles the boilerplate of creating a React Context and Provider.
 * @see {@link https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file}
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} props - {@link UseCTAParameter}.
 *
 * @param {CTAState} props.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterOnInit} [props.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param {UseCTAParameterCreateFunc} [createFunc] - Optional {@link UseCTAParameterCreateFunc}
 * - A `function` callback that receives {@link UseCTAReturnTypeDispatch} and expects an object Record of `function`s to be returned.
 * - @see {@link https://rafde.github.io/react-hook-use-cta/##use-cta-parameter-create-func Params: createFunc}
 *
 * @param {UseCTAReturnTypeDispatch} createFunc.dispatch - The parameter passed to {@link UseCTAParameterCreateFunc}
 *
 * @returns {CreateCTAContextReturn} A {@link CreateCTAContextReturn} object. See {@link https://rafde.github.io/react-hook-use-cta/#create-cta-context-return createCTAContext return value}.
 * Has the following properties:
 * - {@link CreateCTAContextReturn.CTAProvider} - component that requires `children` prop.
 * Also accepts optional `initial`, `onInit`, and `compare` props.
 * - {@link CreateCTAContextReturn.useCTAHistoryContext} - A hook for returning {@link CTAHistory} from context.
 * - {@link CreateCTAContextReturn.useCTADispatchContext} - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * Returns `null` if called outside the `CTAProvider`.
 *
 * `useCTADispatchContext()?.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.update( Partial<CTAState> );
 * useCTADispatchContext()?.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * useCTADispatchContext()?.update( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `useCTADispatchContext()?.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.replace( Partial<CTAState> )
 * useCTADispatchContext()?.replace( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `useCTADispatchContext()?.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.reset();
 * useCTADispatchContext()?.reset( CTAState );
 * useCTADispatchContext()?.reset( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `useCTADispatchContext()?.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.updateInitial( Partial<CTAState> );
 * useCTADispatchContext()?.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * useCTADispatchContext()?.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `useCTADispatchContext()?.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.replaceInitial( CTAState );
 * useCTADispatchContext()?.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `useCTADispatchContext()?.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 *
 * ```ts
 * useCTADispatchContext()?.YourCustomAction( ...args );
 * ```
 *
 * See {@link https://rafde.github.io/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function createCTAContext<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, FR extends UseCTAParameterFuncRecord, ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never>(props: UseCTAParameter<Initial, Actions>, createFunc?: UseCTAParameterCreateFunc<Initial, Actions, FR, void>): CreateCTAContextReturn<Initial, ActionsRecord, FR>;
type CreateCTAProps<Initial extends CTAState, Actions> = Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'compare' | 'afterActionChange' | 'transform' | 'actions'>;
/**
 * A `function` that provides a way to execute like {@link useCTA} but outside a React component.
 *
 * Useful if you want to handle {@link CTAHistory state history} and dispatch using a 3rd party global state management system.
 *
 * @template {CTAState} Initial - The `initial` state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {CreateCTAProps} props - {@link CreateCTAProps} parameter.
 *
 * @param {CTAState} props.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param {UseCTAParameterCreateFunc} [createFunc] - Optional {@link UseCTAParameterCreateFunc}
 * - A `function` callback that receives {@link UseCTAReturnTypeDispatch} and expects an object Record of `function`s to be returned.
 * - @see {@link https://rafde.github.io/react-hook-use-cta/##use-cta-parameter-create-func Params: createFunc}
 *
 * @param {UseCTAReturnTypeDispatch} createFunc.dispatch - The parameter passed to {@link UseCTAParameterCreateFunc}
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
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.update( Partial<CTAState> );
 * const ctaHistory: CTAHistory<CTAState> = cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * const ctaHistory: CTAHistory<CTAState> = cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.replace( CTAState );
 * const ctaHistory: CTAHistory<CTAState> = cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.reset();
 * const ctaHistory: CTAHistory<CTAState> = cta.reset( CTAState );
 * const ctaHistory: CTAHistory<CTAState> = cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.updateInitial( Partial<CTAState> )
 * const ctaHistory: CTAHistory<CTAState> = cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )
 * const ctaHistory: CTAHistory<CTAState> = cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.replaceInitial( CTAState )
 * const ctaHistory: CTAHistory<CTAState> = cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 *
 * ```ts
 * const ctaHistory: CTAHistory<CTAState> = cta.YourCustomAction( ...args );
 * ```
 *
 * See {@link https://rafde.github.io/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function createCTA<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, FR extends UseCTAParameterFuncRecord, ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never>(props: CreateCTAProps<Initial, ActionsRecord>, createFunc?: UseCTAParameterCreateFunc<Initial, ActionsRecord, FR, CTAHistory<Initial>>): [
    CTAHistory<Initial>,
    UseCTAReturnTypeDispatch<Initial, ActionsRecord, FR, CTAHistory<Initial>>
];
type CreateCTASelectorProps<Initial extends CTAState, Actions> = Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'compare' | 'afterActionChange' | 'transform' | 'actions'>;
type UseCTASelectorListener<Initial extends CTAState, Actions, FR extends UseCTAParameterFuncRecord, SelectorReturn> = (params: CTAHistory<Initial> & {
    dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>;
}) => SelectorReturn;
type CreateCTASelectorReturn<Initial extends CTAState, Actions, FR extends UseCTAParameterFuncRecord> = (<SelectorReturn>(selector: UseCTASelectorListener<Initial, Actions, FR, SelectorReturn>) => SelectorReturn) & {
    dispatch: UseCTAReturnTypeDispatch<Initial, Actions, FR, void>;
    getHistory: () => CTAHistory<Initial>;
};
/**
 * Creates a selector hook for managing state with CTA (Call To Action) pattern
 *
 * @template {CTAState} Initial - The type of the initial state object extending CTAState
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions - Optional record of action functions extending UseCTAParameterActionsRecordProp
 * @template GR - Record of getter functions that return values
 * @template ActionsRecord - Derived type for actions, either default or provided actions
 *
 * @param {CreateCTASelectorProps} props - Configuration object for the selector
 *
 * @param {CTAState} props.initial - Initial {@link CTAState} `object` for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - comparison `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param {UseCTAParameterCreateFunc} [createFunc] - Optional {@link UseCTAParameterCreateFunc}
 * - A `function` callback that receives {@link UseCTAReturnTypeDispatch} and expects an object Record of `function`s to be returned.
 * - @see {@link https://rafde.github.io/react-hook-use-cta/##use-cta-parameter-create-func Params: createFunc}
 *
 * @param {UseCTAReturnTypeDispatch} createFunc.dispatch - The parameter passed to {@link UseCTAParameterCreateFunc}
 * - @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 *
 * @returns A {@link CreateCTASelectorReturn} selector hook that provides access to dispatch, gets, current, previous, changes, initial, and previousInitial
 *
 * @example
 * const useMySelector = createCTASelector({
 *   initial: { count: 0 },
 *   actions: {
 *     increment: (state) => ({ count: state.current.count + 1 })
 *   }
 * });
 *
 * useMySelector.dispatch.cta.increment();
 *
 * export default function MyView() {
 *   const count = useMySelector(({current}) => current.count);
 *   const increment = useMySelector(({dispatch}) => dispatch.cta.increment);
 *
  *  return <button onClick={increment}>{count}</div>;
 * }
 */
export function createCTASelector<Initial extends CTAState, Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined, FR extends UseCTAParameterFuncRecord, ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never>(props: CreateCTASelectorProps<Initial, ActionsRecord>, createFunc?: UseCTAParameterCreateFunc<Initial, ActionsRecord, FR, void>): CreateCTASelectorReturn<Initial, ActionsRecord, FR>;

//# sourceMappingURL=types.d.ts.map
