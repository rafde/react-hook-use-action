import {useMemo as $26Zo0$useMemo, useReducer as $26Zo0$useReducer, createContext as $26Zo0$createContext, useContext as $26Zo0$useContext} from "react";
import {strictDeepEqual as $26Zo0$strictDeepEqual} from "fast-equals";
import {jsx as $26Zo0$jsx} from "react/jsx-runtime";




class $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        this.type = param.type;
        this.nextState = param.nextState;
        this.options = {
            useDefault: false,
            ...param?.options
        };
    }
}
class $289ef3ec91325d9e$export$8b725d9d25bcde8e extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $289ef3ec91325d9e$export$8b725d9d25bcde8e({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "replace"
        });
    }
}
class $289ef3ec91325d9e$export$a46e54165014b190 extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $289ef3ec91325d9e$export$a46e54165014b190({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "replaceInitial"
        });
    }
}
class $289ef3ec91325d9e$export$8572caab90b686ec extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $289ef3ec91325d9e$export$8572caab90b686ec({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "reset"
        });
    }
}
class $289ef3ec91325d9e$export$36ff979fbd3521a9 extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $289ef3ec91325d9e$export$36ff979fbd3521a9({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "update"
        });
    }
}


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
const $f0f97a638af05ef2$var$predefinedActionsConst = {
    replace: "replace",
    replaceInitial: "replaceInitial",
    reset: "reset",
    update: "update"
};
function $f0f97a638af05ef2$var$typeResult(param) {
    const { next: next, ctaReducerState: ctaReducerState } = param;
    if (!next || typeof next !== "object" || Array.isArray(next) || next instanceof (0, $289ef3ec91325d9e$export$e4a712fff93fb00f)) return ctaReducerState;
    const { type: type } = param;
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    if (type === "reset") {
        if ((0, $26Zo0$strictDeepEqual)(initial, next) && (0, $26Zo0$strictDeepEqual)(current, next)) return ctaReducerState;
        changesMap.clear();
        return {
            ...ctaReducerState,
            changes: null,
            initial: next,
            current: next,
            previous: current
        };
    }
    if (type === "replace") return $f0f97a638af05ef2$var$_replace(ctaReducerState, next);
    if (type === "replaceInitial") return $f0f97a638af05ef2$var$_replaceInitial(ctaReducerState, next);
    return $f0f97a638af05ef2$var$_update(ctaReducerState, next);
}
function $f0f97a638af05ef2$var$getActionType(ctaReturnType) {
    if (ctaReturnType instanceof (0, $289ef3ec91325d9e$export$e4a712fff93fb00f)) {
        const { type: type, nextState: nextState, options: options } = ctaReturnType;
        if (Array.isArray(nextState)) return;
        if (type === "reset") {
            if (typeof nextState === "undefined") return {
                type: type,
                useDefault: Boolean(options?.useDefault)
            };
            if (typeof nextState !== "object" || !nextState) return;
            return {
                type: type,
                next: nextState,
                useDefault: Boolean(options?.useDefault)
            };
        }
        if (!nextState || typeof nextState !== "object") return;
        return {
            next: nextState,
            type: type,
            useDefault: Boolean(options?.useDefault)
        };
    }
    if (ctaReturnType && typeof ctaReturnType === "object") return {
        next: ctaReturnType,
        type: "update",
        useDefault: false
    };
}
function $f0f97a638af05ef2$export$2e2bcd8739ae039(params) {
    const { type: ctaType, payload: nextCTAPayload, options: options } = params.nextCTAProps;
    const { ctaReducerState: ctaReducerState, actions: actions } = params;
    const { current: current, initial: initial } = ctaReducerState;
    const ctaState = {
        changes: ctaReducerState.changes,
        current: current,
        initial: initial,
        previous: ctaReducerState.previous
    };
    const ctaHandleState = {
        ...ctaState,
        options: options
    };
    const isActionsObject = actions && typeof actions == "object" && !Array.isArray(actions);
    if (ctaType in $f0f97a638af05ef2$var$predefinedActionsConst && (!isActionsObject || !(ctaType in actions))) {
        if (nextCTAPayload instanceof Function) return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: nextCTAPayload(ctaState),
            type: ctaType
        });
        if (ctaType === "reset" && typeof nextCTAPayload === "undefined") return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: initial,
            type: "reset"
        });
        return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: nextCTAPayload,
            type: ctaType
        });
    }
    const cta = isActionsObject && actions?.[ctaType];
    if (typeof cta !== "function") return ctaReducerState;
    let nextPayload = nextCTAPayload;
    if (nextCTAPayload instanceof Function) {
        const nextCTAPayloadResult = nextCTAPayload(ctaState);
        if (typeof nextCTAPayloadResult === "undefined") return ctaReducerState;
        nextPayload = nextCTAPayloadResult;
    }
    if (ctaType in $f0f97a638af05ef2$var$predefinedActionsConst) {
        const next = cta(ctaHandleState, nextPayload);
        return $f0f97a638af05ef2$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: next,
            type: ctaType
        });
    }
    const nextState = cta({
        ...ctaHandleState,
        replaceAction: (0, $289ef3ec91325d9e$export$8b725d9d25bcde8e).create,
        replaceInitialAction: (0, $289ef3ec91325d9e$export$a46e54165014b190).create,
        resetAction: (0, $289ef3ec91325d9e$export$8572caab90b686ec).create,
        updateAction: (0, $289ef3ec91325d9e$export$36ff979fbd3521a9).create
    }, nextPayload);
    const actionType = $f0f97a638af05ef2$var$getActionType(nextState);
    if (!actionType) return ctaReducerState;
    const { type: type, useDefault: useDefault } = actionType;
    let { next: next } = actionType;
    const customPredefinedCTA = isActionsObject && actions?.[type];
    if (typeof customPredefinedCTA === "function" && !useDefault) next = customPredefinedCTA(ctaHandleState, next);
    return $f0f97a638af05ef2$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: next,
        type: type
    });
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
function $2c88330f69c778dc$export$2e2bcd8739ae039(params, actions) {
    return (0, $26Zo0$useReducer)(function reducerCallback(ctaReducerState, nextCTAProps) {
        return (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            ctaReducerState: ctaReducerState,
            actions: actions,
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
        customActions[type] = (payload, options)=>{
            dispatch({
                type: type,
                payload: payload,
                options: options
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
        replace (payload, options) {
            publicDispatcher({
                type: "replace",
                payload: payload,
                options: options
            });
        },
        replaceInitial (payload, options) {
            publicDispatcher({
                type: "replaceInitial",
                payload: payload,
                options: options
            });
        },
        reset (payload, options) {
            publicDispatcher({
                type: "reset",
                payload: payload,
                options: options
            });
        },
        update (payload, value, options) {
            switch(typeof payload){
                case "number":
                case "string":
                    publicDispatcher({
                        type: "update",
                        payload: {
                            [payload]: value
                        },
                        options: options
                    });
                    break;
                default:
                    publicDispatcher({
                        type: "update",
                        payload: payload,
                        value: value
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
        ctaDispatch,
        actions
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





function $e33a9a219f4ab8aa$export$a85baad6d8324b85(contextParams) {
    const CTAContextState = /*#__PURE__*/ (0, $26Zo0$createContext)(contextParams.initial);
    const CTAContextDispatch = /*#__PURE__*/ (0, $26Zo0$createContext)(null);
    return {
        CTAProvider (props) {
            const [state, dispatcher] = (0, $149c1bd638913645$export$68a5bb76170d2250)(contextParams);
            return /*#__PURE__*/ (0, $26Zo0$jsx)(CTAContextState.Provider, {
                value: state,
                children: /*#__PURE__*/ (0, $26Zo0$jsx)(CTAContextDispatch.Provider, {
                    value: dispatcher,
                    children: props.children
                })
            });
        },
        useCTAStateContext () {
            return (0, $26Zo0$useContext)(CTAContextState);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $26Zo0$useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error("useCTADispatchContext was called outside it's Provider");
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


function $149c1bd638913645$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $26Zo0$useMemo)(()=>{
        if (useCTAParameter.actions && typeof useCTAParameter.actions === "object") return {
            ...useCTAParameter.actions
        };
        return useCTAParameter.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $2c88330f69c778dc$export$2e2bcd8739ae039)(useCTAParameter, actions);
    return (0, $56a9759d6a9823a8$export$2e2bcd8739ae039)({
        actions: actions,
        stateDispatcher: stateDispatcher
    });
}
function $149c1bd638913645$export$2d3ca7b65448761f(initial, actions) {
    return actions;
}


export {$149c1bd638913645$export$68a5bb76170d2250 as useCTA, $149c1bd638913645$export$2d3ca7b65448761f as returnActionsType, $e33a9a219f4ab8aa$export$a85baad6d8324b85 as createCTAContext};
//# sourceMappingURL=index.mjs.map
