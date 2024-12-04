var $39ac042edb60bbed$exports = require("./ActionTypes.03711c95.js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $d1a0eb9e2dbe8803$export$2e2bcd8739ae039);

function $d1a0eb9e2dbe8803$var$_replace(ctaReducerState, payload, compare) {
    const { initial: initial, current: current } = ctaReducerState;
    const changesMap = new Map();
    let hasChange = false;
    for(const key in payload){
        const value = payload[key];
        if (!compare(current[key], value)) {
            hasChange = true;
            if (compare(initial[key], value)) continue;
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
function $d1a0eb9e2dbe8803$var$_replaceInitial(ctaReducerState, payload, compare) {
    const { initial: initial, current: current } = ctaReducerState;
    const changesMap = new Map();
    let hasChange = false;
    for(const key in payload){
        const value = payload[key];
        const currentValue = current[key];
        if (!compare(initial[key], value)) {
            hasChange = true;
            if (compare(currentValue, value)) continue;
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
function $d1a0eb9e2dbe8803$var$_updateInitialState(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    let hasUpdates = false;
    const next = {};
    for(const key in payload){
        const value = payload[key];
        if (compare(initial[key], value)) continue;
        next[key] = value;
        hasUpdates = true;
        const currentValue = current[key];
        if (compare(currentValue, value)) changesMap.delete(key);
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
function $d1a0eb9e2dbe8803$var$_updateState(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    let hasUpdates = false;
    const next = {};
    for(const key in payload){
        const value = payload[key];
        if (compare(current[key], value)) continue;
        next[key] = value;
        hasUpdates = true;
        const initialValue = initial[key];
        if (compare(initialValue, value)) changesMap.delete(key);
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
function $d1a0eb9e2dbe8803$var$_resetState(ctaReducerState, next, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    const isNextSameAsInitial = compare(initial, next);
    if (isNextSameAsInitial && compare(current, next)) return ctaReducerState;
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
const $d1a0eb9e2dbe8803$var$predefinedActionsConst = {
    updateInitial: 'updateInitial',
    reset: 'reset',
    update: 'update',
    replace: 'replace',
    replaceInitial: 'replaceInitial'
};
function $d1a0eb9e2dbe8803$var$typeResult(param) {
    const { next: next, ctaReducerState: ctaReducerState } = param;
    if (next == null || Array.isArray(next) || next instanceof (0, $39ac042edb60bbed$exports.ActionType)) return ctaReducerState;
    const { type: type, compare: compare } = param;
    switch(type){
        case 'replace':
            return $d1a0eb9e2dbe8803$var$_replace(ctaReducerState, next, compare);
        case 'replaceInitial':
            return $d1a0eb9e2dbe8803$var$_replaceInitial(ctaReducerState, next, compare);
        case 'reset':
            return $d1a0eb9e2dbe8803$var$_resetState(ctaReducerState, next, compare);
        case 'updateInitial':
            return $d1a0eb9e2dbe8803$var$_updateInitialState(ctaReducerState, next, compare);
        default:
            return $d1a0eb9e2dbe8803$var$_updateState(ctaReducerState, next, compare);
    }
}
function $d1a0eb9e2dbe8803$var$getActionType(ctaReturnType) {
    if (ctaReturnType instanceof (0, $39ac042edb60bbed$exports.ActionType)) {
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
const $d1a0eb9e2dbe8803$var$_args = [];
function $d1a0eb9e2dbe8803$export$2e2bcd8739ae039(params) {
    const { args: args = $d1a0eb9e2dbe8803$var$_args, type: ctaType, payload: payload } = params.nextCTAProps;
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
    if (ctaType in $d1a0eb9e2dbe8803$var$predefinedActionsConst && (!isActionsObject || !(ctaType in actions))) {
        if (payload instanceof Function) return $d1a0eb9e2dbe8803$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: payload(ctaState),
            type: ctaType,
            compare: compare
        });
        if (ctaType === 'reset' && typeof payload === 'undefined') return $d1a0eb9e2dbe8803$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: initial,
            type: 'reset',
            compare: compare
        });
        return $d1a0eb9e2dbe8803$var$typeResult({
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
    if (ctaType in $d1a0eb9e2dbe8803$var$predefinedActionsConst) {
        const next = cta(ctaState, nextPayload, ...args);
        return $d1a0eb9e2dbe8803$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: next,
            type: ctaType,
            compare: compare
        });
    }
    const nextState = cta({
        ...ctaState,
        replaceAction: (0, $39ac042edb60bbed$exports.createReplaceActionType)(actions),
        replaceInitialAction: (0, $39ac042edb60bbed$exports.createReplaceInitialActionType)(actions),
        resetAction: (0, $39ac042edb60bbed$exports.createResetActionType)(actions),
        updateAction: (0, $39ac042edb60bbed$exports.createUpdateActionType)(actions),
        updateInitialAction: (0, $39ac042edb60bbed$exports.createUpdateInitialActionType)(actions)
    }, nextPayload, ...args);
    const actionType = $d1a0eb9e2dbe8803$var$getActionType(nextState);
    if (!actionType) return ctaReducerState;
    const { type: type, next: next } = actionType;
    const customPredefinedCTA = isActionsObject && actions[type];
    if (actionType.useDefault || typeof customPredefinedCTA !== 'function') return $d1a0eb9e2dbe8803$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: next,
        type: type,
        compare: compare
    });
    return $d1a0eb9e2dbe8803$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: customPredefinedCTA(ctaState, next),
        type: type,
        compare: compare
    });
}


//# sourceMappingURL=ctaReducer.aa05e2aa.js.map
