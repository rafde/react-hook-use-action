import {useReducer as $26Zo0$useReducer, useMemo as $26Zo0$useMemo} from "react";
import {strictDeepEqual as $26Zo0$strictDeepEqual} from "fast-equals";



function $f0f97a638af05ef2$var$_resetCurrentChangesMap(state, initial, changesMap) {
    const checkedKeys = {};
    changesMap.clear();
    for(const key in state){
        const value = state[key];
        checkedKeys[key] = true;
        if ((0, $26Zo0$strictDeepEqual)(initial[key], value)) {
            changesMap.delete(key);
            continue;
        }
        changesMap.set(key, value);
    }
    for(const key in initial){
        if (checkedKeys[key]) continue;
        const value = initial[key];
        changesMap.set(key, value);
    }
}
function $f0f97a638af05ef2$var$_replace(ctaReducerState, payload) {
    const { changesMap: changesMap } = ctaReducerState;
    $f0f97a638af05ef2$var$_resetCurrentChangesMap(payload, ctaReducerState.initial, changesMap);
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        current: payload,
        previous: ctaReducerState.current
    };
}
function $f0f97a638af05ef2$var$_replaceInitial(ctaReducerState, initial) {
    const { changesMap: changesMap } = ctaReducerState;
    $f0f97a638af05ef2$var$_resetCurrentChangesMap(ctaReducerState.current, initial, ctaReducerState.changesMap);
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        initial: initial
    };
}
function $f0f97a638af05ef2$var$_update(ctaReducerState, payload) {
    const current = {};
    let hasUpdates = false;
    const { current: previous, ...rest } = ctaReducerState;
    const { initial: initial, changesMap: changesMap } = ctaReducerState;
    for(const key in payload){
        const value = payload[key];
        if ((0, $26Zo0$strictDeepEqual)(previous[key], value)) continue;
        current[key] = value;
        hasUpdates = true;
        if ((0, $26Zo0$strictDeepEqual)(initial[key], value)) changesMap.delete(key);
        else changesMap.set(key, value);
    }
    if (!hasUpdates) return ctaReducerState;
    return {
        ...rest,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        current: {
            ...previous,
            ...payload
        },
        previous: previous
    };
}
function $f0f97a638af05ef2$export$2e2bcd8739ae039(params) {
    const { type: type, payload: payload } = params.nextCTAProps;
    const { ctaReducerState: ctaReducerState, actions: actions } = params;
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    // This can be a custom or overridden action
    const cta = actions?.[type];
    const isAction = typeof cta === "function";
    const ctaParam = {
        changes: ctaReducerState.changes,
        initial: initial,
        previous: ctaReducerState.previous
    };
    let next = payload;
    if (type === "reset" && !payload) {
        changesMap.clear();
        if (!isAction) return {
            ...ctaReducerState,
            changes: null,
            current: initial,
            previous: current
        };
        next = cta(ctaParam);
        if (typeof next === "undefined") return ctaReducerState;
        return {
            ...ctaReducerState,
            changes: null,
            current: next,
            previous: current
        };
    }
    if (payload instanceof Function) {
        next = payload(ctaParam);
        if (typeof next === "undefined") return ctaReducerState;
    }
    if (isAction) next = cta(ctaParam, next);
    if (next && typeof next === "object") {
        if (type === "reset") {
            if ((0, $26Zo0$strictDeepEqual)(initial, next) || (0, $26Zo0$strictDeepEqual)(current, next)) return ctaReducerState;
            changesMap.clear();
            return {
                changesMap: changesMap,
                changes: null,
                initial: next,
                current: next,
                previous: current
            };
        }
        if (type === "replace") return $f0f97a638af05ef2$var$_replace(ctaReducerState, next);
        if (type === "replaceInitial") return $f0f97a638af05ef2$var$_replaceInitial(ctaReducerState, next);
        if (type === "update" || isAction) return $f0f97a638af05ef2$var$_update(ctaReducerState, next);
    }
    return ctaReducerState;
}


function $2c88330f69c778dc$var$_init(privateCTAState, init) {
    const changesMap = new Map();
    if (typeof init !== "function") return {
        ...privateCTAState,
        changesMap: changesMap
    };
    const initial = init(privateCTAState.current);
    return {
        ...privateCTAState,
        changesMap: changesMap,
        current: initial,
        initial: initial
    };
}
function $2c88330f69c778dc$export$2e2bcd8739ae039(params) {
    return (0, $26Zo0$useReducer)(function reducerCallback(ctaReducerState, nextCTAProps) {
        return (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            ctaReducerState: ctaReducerState,
            actions: params.actions,
            nextCTAProps: nextCTAProps
        });
    }, {
        changes: null,
        // Set changesMap in init to avoid re-instantiating a new Map everytime this is called
        changesMap: undefined,
        current: params.initial,
        initial: params.initial,
        previous: params.initial
    }, function _onInit(privateCTAState) {
        return $2c88330f69c778dc$var$_init(privateCTAState, params.onInit);
    });
}



function $56a9759d6a9823a8$var$mergeCustomCTAWithDefaultCTA(dispatch, defaultCTARecord, ctaRecord) {
    let hasCustomAction = false;
    const customActions = {};
    for(const type in ctaRecord){
        if (type in defaultCTARecord || typeof ctaRecord[type] !== "function") continue;
        customActions[type] = (payload)=>{
            dispatch({
                type: type,
                payload: payload
            });
        };
        hasCustomAction = true;
    }
    if (!hasCustomAction) return defaultCTARecord;
    return Object.assign(defaultCTARecord, customActions);
}
function $56a9759d6a9823a8$var$wrapPrivateDispatcher(dispatcher, actions) {
    const publicDispatcher = (cta)=>{
        dispatcher(cta);
    };
    const cta = {
        replace (payload) {
            publicDispatcher({
                type: "replace",
                payload: payload
            });
        },
        replaceInitial (payload) {
            publicDispatcher({
                type: "replaceInitial",
                payload: payload
            });
        },
        reset (payload) {
            publicDispatcher({
                type: "reset",
                payload: payload
            });
        },
        update (payload, value) {
            switch(typeof payload){
                case "number":
                case "string":
                    publicDispatcher({
                        type: "update",
                        payload: {
                            [payload]: value
                        }
                    });
                    break;
                default:
                    publicDispatcher({
                        type: "update",
                        payload: payload
                    });
                    break;
            }
        }
    };
    if (actions == null || typeof actions !== "object") return Object.assign(publicDispatcher, {
        cta: cta
    });
    return Object.assign(publicDispatcher, {
        cta: $56a9759d6a9823a8$var$mergeCustomCTAWithDefaultCTA(publicDispatcher, cta, actions)
    });
}
function $56a9759d6a9823a8$export$2e2bcd8739ae039(params) {
    const { actions: actions } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const augmentedDispatcher = (0, $26Zo0$useMemo)(()=>$56a9759d6a9823a8$var$wrapPrivateDispatcher(ctaDispatch, actions), [
        actions,
        ctaDispatch
    ]);
    return (0, $26Zo0$useMemo)(()=>{
        const state = {
            changes: ctaState.changes,
            current: ctaState.current,
            initial: ctaState.initial,
            previous: ctaState.previous
        };
        const dispatch = Object.assign(augmentedDispatcher, {
            state: state
        });
        return [
            ctaState.current,
            dispatch
        ];
    }, [
        ctaState,
        augmentedDispatcher
    ]);
}


function $149c1bd638913645$export$68a5bb76170d2250(useCTAParameter) {
    const stateDispatcher = (0, $2c88330f69c778dc$export$2e2bcd8739ae039)(useCTAParameter);
    return (0, $56a9759d6a9823a8$export$2e2bcd8739ae039)({
        actions: useCTAParameter.actions,
        stateDispatcher: stateDispatcher
    });
}


export {$149c1bd638913645$export$68a5bb76170d2250 as useCTA};
//# sourceMappingURL=index.mjs.map
