import {ActionType as $289ef3ec91325d9e$export$e4a712fff93fb00f, createReplaceActionType as $289ef3ec91325d9e$export$5af3483b9b67ce66, createReplaceInitialActionType as $289ef3ec91325d9e$export$3ff81d2d0cf2ee3, createResetActionType as $289ef3ec91325d9e$export$4bebcb0ea4f6657e, createUpdateActionType as $289ef3ec91325d9e$export$aa336a942b9a3093, createUpdateInitialActionType as $289ef3ec91325d9e$export$8b901517d6e09295} from "./ActionTypes.508acd88.js";


function $f0f97a638af05ef2$var$_replace(ctaReducerState, payload, compare) {
    const { initial: initial, current: current } = ctaReducerState;
    const changesMap = new Map();
    let hasChange = false;
    for(const key in payload){
        const value = payload[key];
        if (!compare(current[key], value, key)) {
            hasChange = true;
            if (compare(initial[key], value, key)) continue;
            changesMap.set(key, value);
        }
    }
    if (!hasChange) return ctaReducerState;
    return {
        ...ctaReducerState,
        changesMap: changesMap,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        current: payload,
        previous: ctaReducerState.current
    };
}
function $f0f97a638af05ef2$var$_replaceInitial(ctaReducerState, payload, compare) {
    const { initial: initial, current: current } = ctaReducerState;
    const changesMap = new Map();
    let hasChange = false;
    for(const key in payload){
        const value = payload[key];
        const currentValue = current[key];
        if (!compare(initial[key], value, key)) {
            hasChange = true;
            if (compare(currentValue, value, key)) continue;
            changesMap.set(key, currentValue);
        }
    }
    if (!hasChange) return ctaReducerState;
    return {
        ...ctaReducerState,
        changesMap: changesMap,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        previousInitial: initial,
        initial: payload
    };
}
function $f0f97a638af05ef2$var$_updateInitialState(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    let hasUpdates = false;
    const next = {};
    for(const key in payload){
        const value = payload[key];
        if (compare(initial[key], value, key)) continue;
        next[key] = value;
        hasUpdates = true;
        const currentValue = current[key];
        if (compare(currentValue, value, key)) changesMap.delete(key);
        else changesMap.set(key, currentValue);
    }
    if (!hasUpdates) return ctaReducerState;
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        initial: {
            ...initial,
            ...next
        },
        previousInitial: initial
    };
}
function $f0f97a638af05ef2$var$_updateState(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    let hasUpdates = false;
    const next = {};
    for(const key in payload){
        const value = payload[key];
        if (compare(current[key], value, key)) continue;
        next[key] = value;
        hasUpdates = true;
        const initialValue = initial[key];
        if (compare(initialValue, value, key)) changesMap.delete(key);
        else changesMap.set(key, value);
    }
    if (!hasUpdates) return ctaReducerState;
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        current: {
            ...current,
            ...next
        },
        previous: current
    };
}
function $f0f97a638af05ef2$var$_resetState(ctaReducerState, next, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    let isNextSameAsInitial = true;
    let isNextSameAsCurrent = true;
    for(const key in next){
        const value = next[key];
        const currentValue = current[key];
        const initialValue = initial[key];
        if (!compare(initialValue, value, key)) isNextSameAsInitial = false;
        if (!compare(currentValue, value, key)) isNextSameAsCurrent = false;
        if (!isNextSameAsInitial && !isNextSameAsCurrent) break;
    }
    if (isNextSameAsInitial && isNextSameAsCurrent) return ctaReducerState;
    let previousInitial = initial;
    if (ctaReducerState.previousInitial === null && isNextSameAsInitial) previousInitial = null;
    changesMap.clear();
    return {
        ...ctaReducerState,
        changes: null,
        initial: next,
        current: next,
        previous: current,
        previousInitial: previousInitial
    };
}
const $f0f97a638af05ef2$var$predefinedActionsConst = {
    updateInitial: 'updateInitial',
    reset: 'reset',
    update: 'update',
    replace: 'replace',
    replaceInitial: 'replaceInitial'
};
function $f0f97a638af05ef2$var$typeResult(param) {
    const { next: next, ctaReducerState: ctaReducerState } = param;
    if (next == null || Array.isArray(next) || next instanceof (0, $289ef3ec91325d9e$export$e4a712fff93fb00f)) return ctaReducerState;
    const { type: type, compare: compare } = param;
    switch(type){
        case 'replace':
            return $f0f97a638af05ef2$var$_replace(ctaReducerState, next, compare);
        case 'replaceInitial':
            return $f0f97a638af05ef2$var$_replaceInitial(ctaReducerState, next, compare);
        case 'reset':
            return $f0f97a638af05ef2$var$_resetState(ctaReducerState, next, compare);
        case 'updateInitial':
            return $f0f97a638af05ef2$var$_updateInitialState(ctaReducerState, next, compare);
        default:
            return $f0f97a638af05ef2$var$_updateState(ctaReducerState, next, compare);
    }
}
function $f0f97a638af05ef2$var$getActionType(ctaReturnType) {
    if (ctaReturnType instanceof (0, $289ef3ec91325d9e$export$e4a712fff93fb00f)) {
        const { type: type, nextState: nextState, actionTypeOptions: actionTypeOptions } = ctaReturnType;
        const useDefault = Boolean(actionTypeOptions?.useDefault);
        if (Array.isArray(nextState)) return;
        const actionType = {
            next: nextState,
            type: type,
            useDefault: useDefault
        };
        if (type === 'reset') {
            if (typeof nextState === 'undefined') return actionType;
            if (nextState == null) return;
            return actionType;
        }
        if (!nextState || typeof nextState !== 'object') return;
        return actionType;
    }
    if (ctaReturnType && typeof ctaReturnType === 'object') return {
        next: ctaReturnType,
        type: 'update',
        useDefault: false
    };
}
const $f0f97a638af05ef2$var$_args = [];
function $f0f97a638af05ef2$export$2e2bcd8739ae039(params) {
    const { args: args = $f0f97a638af05ef2$var$_args, type: ctaType, payload: payload } = params.nextCTAProps;
    const { ctaReducerState: ctaReducerState, actions: actions, compare: compare } = params;
    const { current: current, initial: initial } = ctaReducerState;
    const ctaState = {
        changes: ctaReducerState.changes,
        current: current,
        initial: initial,
        previous: ctaReducerState.previous,
        previousInitial: ctaReducerState.previousInitial
    };
    const isActionsObject = actions && typeof actions == 'object' && !Array.isArray(actions);
    if (ctaType in $f0f97a638af05ef2$var$predefinedActionsConst && (!isActionsObject || !(ctaType in actions))) {
        if (payload instanceof Function) return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: payload(ctaState),
            type: ctaType,
            compare: compare
        });
        if (ctaType === 'reset' && typeof payload === 'undefined') return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: initial,
            type: 'reset',
            compare: compare
        });
        return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: payload,
            type: ctaType,
            compare: compare
        });
    }
    const cta = isActionsObject && actions[ctaType];
    if (typeof cta !== 'function') return ctaReducerState;
    let nextPayload = payload;
    if (payload instanceof Function) {
        const nextCTAPayloadResult = payload(ctaState);
        if (typeof nextCTAPayloadResult === 'undefined') return ctaReducerState;
        nextPayload = nextCTAPayloadResult;
    }
    if (ctaType in $f0f97a638af05ef2$var$predefinedActionsConst) {
        const next = cta(ctaState, nextPayload, ...args);
        return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: next,
            type: ctaType,
            compare: compare
        });
    }
    const nextState = cta({
        ...ctaState,
        replaceAction: (0, $289ef3ec91325d9e$export$5af3483b9b67ce66)(actions),
        replaceInitialAction: (0, $289ef3ec91325d9e$export$3ff81d2d0cf2ee3)(actions),
        resetAction: (0, $289ef3ec91325d9e$export$4bebcb0ea4f6657e)(actions),
        updateAction: (0, $289ef3ec91325d9e$export$aa336a942b9a3093)(actions),
        updateInitialAction: (0, $289ef3ec91325d9e$export$8b901517d6e09295)(actions)
    }, nextPayload, ...args);
    const actionType = $f0f97a638af05ef2$var$getActionType(nextState);
    if (!actionType) return ctaReducerState;
    const { type: type, next: next } = actionType;
    const customPredefinedCTA = isActionsObject && actions[type];
    if (actionType.useDefault || typeof customPredefinedCTA !== 'function') return $f0f97a638af05ef2$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: next,
        type: type,
        compare: compare
    });
    return $f0f97a638af05ef2$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: customPredefinedCTA(ctaState, next),
        type: type,
        compare: compare
    });
}


export {$f0f97a638af05ef2$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=ctaReducer.91b86e70.js.map
