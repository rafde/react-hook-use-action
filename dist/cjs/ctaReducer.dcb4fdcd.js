var $39ac042edb60bbed$exports = require("./ActionTypes.7551496f.js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $d1a0eb9e2dbe8803$export$2e2bcd8739ae039);

function $d1a0eb9e2dbe8803$var$_replace(prop) {
    const { a: a, b: b, compare: compare, payload: payload, useBValue: useBValue } = prop;
    const changesMap = new Map();
    let hasChange = false;
    for(const key in payload){
        const value = payload[key];
        if (!compare(a[key], value, key)) {
            hasChange = true;
            if (!compare(b[key], value, key)) changesMap.set(key, useBValue ? b[key] : value);
        }
    }
    if (!hasChange) return;
    return changesMap;
}
function $d1a0eb9e2dbe8803$var$_replaceCurrent(ctaReducerState, payload, compare) {
    const { initial: initial, current: current } = ctaReducerState;
    const changesMap = $d1a0eb9e2dbe8803$var$_replace({
        a: current,
        b: initial,
        compare: compare,
        payload: payload
    });
    if (!changesMap) return ctaReducerState;
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
    const changesMap = $d1a0eb9e2dbe8803$var$_replace({
        a: initial,
        b: current,
        compare: compare,
        payload: payload,
        useBValue: true
    });
    if (!changesMap) return ctaReducerState;
    return {
        ...ctaReducerState,
        changesMap: changesMap,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        previousInitial: initial,
        initial: payload
    };
}
function $d1a0eb9e2dbe8803$var$_update(prop) {
    const { a: a, b: b, compare: compare, payload: payload, useCompareValue: useCompareValue, changesMap: changesMap } = prop;
    let hasChange = false;
    const next = {};
    for(const key in payload){
        const value = payload[key];
        if (compare(a[key], value, key)) continue;
        next[key] = value;
        hasChange = true;
        const compareValue = b[key];
        if (compare(compareValue, value, key)) changesMap.delete(key);
        else changesMap.set(key, useCompareValue ? b[key] : value);
    }
    if (!hasChange) return;
    return next;
}
function $d1a0eb9e2dbe8803$var$_updateInitial(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    const next = $d1a0eb9e2dbe8803$var$_update({
        a: initial,
        b: current,
        changesMap: changesMap,
        compare: compare,
        payload: payload,
        useCompareValue: true
    });
    if (!next) return ctaReducerState;
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
function $d1a0eb9e2dbe8803$var$_updateCurrent(ctaReducerState, payload, compare) {
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    const next = $d1a0eb9e2dbe8803$var$_update({
        a: current,
        b: initial,
        changesMap: changesMap,
        compare: compare,
        payload: payload
    });
    if (!next) return ctaReducerState;
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
    let isNextSameAsInitial = true;
    let isNextSameAsCurrent = true;
    for(const key in next){
        const value = next[key];
        if (!compare(initial[key], value, key)) isNextSameAsInitial = false;
        if (!compare(current[key], value, key)) isNextSameAsCurrent = false;
        if (!isNextSameAsInitial && !isNextSameAsCurrent) break;
    }
    if (isNextSameAsInitial && isNextSameAsCurrent) return ctaReducerState;
    changesMap.clear();
    return {
        ...ctaReducerState,
        changes: null,
        initial: next,
        current: next,
        previous: current,
        previousInitial: isNextSameAsInitial ? null : initial
    };
}
const $d1a0eb9e2dbe8803$var$predefinedActionsConst = {
    replace: 'replace',
    replaceInitial: 'replaceInitial',
    reset: 'reset',
    update: 'update',
    updateInitial: 'updateInitial'
};
function $d1a0eb9e2dbe8803$var$typeResult(param) {
    const { next: next, ctaReducerState: ctaReducerState } = param;
    if (next == null || Array.isArray(next) || next instanceof (0, $39ac042edb60bbed$exports.ActionType)) return ctaReducerState;
    const { type: type, compare: compare } = param;
    let result;
    switch(type){
        case 'replace':
            result = $d1a0eb9e2dbe8803$var$_replaceCurrent(ctaReducerState, next, compare);
            break;
        case 'replaceInitial':
            result = $d1a0eb9e2dbe8803$var$_replaceInitial(ctaReducerState, next, compare);
            break;
        case 'reset':
            result = $d1a0eb9e2dbe8803$var$_resetState(ctaReducerState, next, compare);
            break;
        case 'updateInitial':
            result = $d1a0eb9e2dbe8803$var$_updateInitial(ctaReducerState, next, compare);
            break;
        default:
            result = $d1a0eb9e2dbe8803$var$_updateCurrent(ctaReducerState, next, compare);
            break;
    }
    if (result !== ctaReducerState) Promise.resolve().then(()=>param.afterActionChange({
            changes: result.changes,
            current: result.current,
            initial: result.initial,
            previous: result.previous,
            previousInitial: result.previousInitial
        }, type, param.action));
    return result;
}
function $d1a0eb9e2dbe8803$var$getActionType(ctaReturnType) {
    if (ctaReturnType instanceof (0, $39ac042edb60bbed$exports.ActionType)) {
        const { type: type, payload: payload, actionTypeOptions: actionTypeOptions } = ctaReturnType;
        const useDefault = Boolean(actionTypeOptions?.useDefault);
        if (Array.isArray(payload)) return;
        const actionType = {
            next: payload,
            type: type,
            useDefault: useDefault
        };
        if (type === 'reset') {
            if (typeof payload === 'undefined') return actionType;
            if (payload == null) return;
            return actionType;
        }
        if (!payload || typeof payload !== 'object') return;
        return actionType;
    }
    if (ctaReturnType && typeof ctaReturnType === 'object') return {
        next: ctaReturnType,
        type: 'update',
        useDefault: false
    };
}
const $d1a0eb9e2dbe8803$var$customCTAHistoryCache = new WeakMap();
function $d1a0eb9e2dbe8803$var$getCustomCTAHistoryCache(actions) {
    if (!actions) return;
    if ($d1a0eb9e2dbe8803$var$customCTAHistoryCache.has(actions)) return $d1a0eb9e2dbe8803$var$customCTAHistoryCache.get(actions);
    const customCTAHistoryActions = {
        replaceAction: (0, $39ac042edb60bbed$exports.createReplaceActionType)(actions),
        replaceInitialAction: (0, $39ac042edb60bbed$exports.createReplaceInitialActionType)(actions),
        resetAction: (0, $39ac042edb60bbed$exports.createResetActionType)(actions),
        updateAction: (0, $39ac042edb60bbed$exports.createUpdateActionType)(actions),
        updateInitialAction: (0, $39ac042edb60bbed$exports.createUpdateInitialActionType)(actions)
    };
    $d1a0eb9e2dbe8803$var$customCTAHistoryCache.set(actions, customCTAHistoryActions);
    return customCTAHistoryActions;
}
const $d1a0eb9e2dbe8803$var$_args = [];
function $d1a0eb9e2dbe8803$var$_noop() {}
function $d1a0eb9e2dbe8803$export$2e2bcd8739ae039(params) {
    const { args: args = $d1a0eb9e2dbe8803$var$_args, type: action, payload: payload } = params.nextCTAProps;
    const { ctaReducerState: ctaReducerState, actions: actions, compare: compare, afterActionChange: afterActionChange = $d1a0eb9e2dbe8803$var$_noop } = params;
    const { current: current, initial: initial } = ctaReducerState;
    const ctaState = {
        changes: ctaReducerState.changes,
        current: current,
        initial: initial,
        previous: ctaReducerState.previous,
        previousInitial: ctaReducerState.previousInitial
    };
    const isActionsObject = actions && typeof actions == 'object' && !Array.isArray(actions);
    if (action in $d1a0eb9e2dbe8803$var$predefinedActionsConst && (!isActionsObject || !(action in actions))) {
        if (payload instanceof Function) return $d1a0eb9e2dbe8803$var$typeResult({
            afterActionChange: afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            next: payload(ctaState),
            type: action
        });
        if (action === 'reset' && typeof payload === 'undefined') return $d1a0eb9e2dbe8803$var$typeResult({
            afterActionChange: afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            next: initial,
            type: 'reset'
        });
        return $d1a0eb9e2dbe8803$var$typeResult({
            afterActionChange: afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            next: payload,
            type: action
        });
    }
    const cta = isActionsObject && actions[action];
    if (typeof cta !== 'function') return ctaReducerState;
    let nextPayload = payload;
    if (action in $d1a0eb9e2dbe8803$var$predefinedActionsConst) {
        if (payload instanceof Function) {
            const nextCTAPayloadResult = payload(ctaState);
            if (typeof nextCTAPayloadResult === 'undefined') return ctaReducerState;
            nextPayload = nextCTAPayloadResult;
        }
        const next = cta(ctaState, nextPayload, ...args);
        return $d1a0eb9e2dbe8803$var$typeResult({
            afterActionChange: afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            next: next,
            type: action
        });
    }
    const nextState = cta(Object.assign(ctaState, $d1a0eb9e2dbe8803$var$getCustomCTAHistoryCache(actions)), nextPayload, ...args);
    const actionType = $d1a0eb9e2dbe8803$var$getActionType(nextState);
    if (!actionType) return ctaReducerState;
    const { type: type, next: next } = actionType;
    const customPredefinedCTA = isActionsObject && actions[type];
    if (actionType.useDefault || typeof customPredefinedCTA !== 'function') return $d1a0eb9e2dbe8803$var$typeResult({
        action: action,
        afterActionChange: afterActionChange,
        compare: compare,
        ctaReducerState: ctaReducerState,
        next: next,
        type: type
    });
    return $d1a0eb9e2dbe8803$var$typeResult({
        action: action,
        afterActionChange: afterActionChange,
        compare: compare,
        ctaReducerState: ctaReducerState,
        next: customPredefinedCTA(ctaState, next),
        type: type
    });
}


//# sourceMappingURL=ctaReducer.dcb4fdcd.js.map
