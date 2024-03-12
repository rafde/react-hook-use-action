var $dYZEH$react = require("react");
var $dYZEH$fastequals = require("fast-equals");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useCTA", () => $882b6d93070905b3$export$68a5bb76170d2250);


class $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        this.type = param.type;
        this.nextState = param.nextState;
        this.options = {
            useCustom: true,
            ...param?.options
        };
    }
}
class $39ac042edb60bbed$export$8b725d9d25bcde8e extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $39ac042edb60bbed$export$8b725d9d25bcde8e({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "replace"
        });
        this.type = "replace";
    }
}
class $39ac042edb60bbed$export$a46e54165014b190 extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $39ac042edb60bbed$export$a46e54165014b190({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "replaceInitial"
        });
        this.type = "replaceInitial";
    }
}
class $39ac042edb60bbed$export$8572caab90b686ec extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $39ac042edb60bbed$export$8572caab90b686ec({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "reset"
        });
        this.type = "reset";
    }
}
class $39ac042edb60bbed$export$36ff979fbd3521a9 extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    static create(nextState, options) {
        return new $39ac042edb60bbed$export$36ff979fbd3521a9({
            nextState: nextState,
            options: options
        });
    }
    constructor(param){
        super({
            ...param,
            type: "update"
        });
        this.type = "update";
    }
}


function $d1a0eb9e2dbe8803$var$_resetCurrentChangesMap(state, initial, changesMap) {
    const checkedKeys = {};
    changesMap.clear();
    for(const key in state){
        const value = state[key];
        checkedKeys[key] = true;
        if ((0, $dYZEH$fastequals.strictDeepEqual)(initial[key], value)) {
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
function $d1a0eb9e2dbe8803$var$_replace(ctaReducerState, payload) {
    const { changesMap: changesMap } = ctaReducerState;
    $d1a0eb9e2dbe8803$var$_resetCurrentChangesMap(payload, ctaReducerState.initial, changesMap);
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        current: payload,
        previous: ctaReducerState.current
    };
}
function $d1a0eb9e2dbe8803$var$_replaceInitial(ctaReducerState, initial) {
    const { changesMap: changesMap } = ctaReducerState;
    $d1a0eb9e2dbe8803$var$_resetCurrentChangesMap(ctaReducerState.current, initial, ctaReducerState.changesMap);
    return {
        ...ctaReducerState,
        changes: changesMap.size ? Object.fromEntries(changesMap) : null,
        initial: initial
    };
}
function $d1a0eb9e2dbe8803$var$_update(ctaReducerState, payload) {
    const current = {};
    let hasUpdates = false;
    const { current: previous, ...rest } = ctaReducerState;
    const { initial: initial, changesMap: changesMap } = ctaReducerState;
    for(const key in payload){
        const value = payload[key];
        if ((0, $dYZEH$fastequals.strictDeepEqual)(previous[key], value)) continue;
        current[key] = value;
        hasUpdates = true;
        if ((0, $dYZEH$fastequals.strictDeepEqual)(initial[key], value)) changesMap.delete(key);
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
const $d1a0eb9e2dbe8803$var$predefinedActionsConst = {
    replace: "replace",
    replaceInitial: "replaceInitial",
    reset: "reset",
    update: "update"
};
function $d1a0eb9e2dbe8803$var$typeResult(param) {
    const { next: next, ctaReducerState: ctaReducerState } = param;
    if (!next || typeof next !== "object" || Array.isArray(next) || next instanceof (0, $39ac042edb60bbed$export$e4a712fff93fb00f)) return ctaReducerState;
    const { type: type } = param;
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    if (type === "reset") {
        if ((0, $dYZEH$fastequals.strictDeepEqual)(initial, next) || (0, $dYZEH$fastequals.strictDeepEqual)(current, next)) return ctaReducerState;
        changesMap.clear();
        return {
            changesMap: changesMap,
            changes: null,
            initial: next,
            current: next,
            previous: current
        };
    }
    if (type === "replace") return $d1a0eb9e2dbe8803$var$_replace(ctaReducerState, next);
    if (type === "replaceInitial") return $d1a0eb9e2dbe8803$var$_replaceInitial(ctaReducerState, next);
    return $d1a0eb9e2dbe8803$var$_update(ctaReducerState, next);
}
function $d1a0eb9e2dbe8803$var$getActionType(ctaReturnType) {
    if (ctaReturnType instanceof (0, $39ac042edb60bbed$export$e4a712fff93fb00f)) {
        const { type: type, nextState: nextState, options: options } = ctaReturnType;
        if (!nextState || typeof nextState !== "object" || Array.isArray(nextState)) return;
        return {
            next: nextState,
            type: type,
            useCustom: Boolean(options?.useCustom)
        };
    }
    if (ctaReturnType && typeof ctaReturnType === "object") return {
        next: ctaReturnType,
        type: "update",
        useCustom: true
    };
}
function $d1a0eb9e2dbe8803$export$2e2bcd8739ae039(params) {
    const { type: ctaType, payload: nextCTAPropsPayload } = params.nextCTAProps;
    const { ctaReducerState: ctaReducerState, actions: actions } = params;
    const { changesMap: changesMap, current: current, initial: initial } = ctaReducerState;
    const ctaState = {
        changes: ctaReducerState.changes,
        current: current,
        initial: initial,
        previous: ctaReducerState.previous
    };
    const isActionsObject = actions && typeof actions == "object" && !Array.isArray(actions);
    if (ctaType in $d1a0eb9e2dbe8803$var$predefinedActionsConst && !isActionsObject) {
        if (ctaType === "reset" && !nextCTAPropsPayload) {
            changesMap.clear();
            return {
                ...ctaReducerState,
                changes: null,
                current: initial,
                previous: current
            };
        }
        const nextPredefinedState = nextCTAPropsPayload instanceof Function ? nextCTAPropsPayload(ctaState) : nextCTAPropsPayload;
        return $d1a0eb9e2dbe8803$var$typeResult({
            ctaReducerState: ctaReducerState,
            next: nextPredefinedState,
            type: ctaType
        });
    }
    const cta = isActionsObject && actions?.[ctaType];
    if (typeof cta !== "function") return ctaReducerState;
    if (ctaType === "reset" && !nextCTAPropsPayload) {
        const nextResetState = cta(ctaState);
        if (!nextResetState) return ctaReducerState;
        changesMap.clear();
        return {
            ...ctaReducerState,
            changes: null,
            current: nextResetState,
            previous: current
        };
    }
    let nextPayload = nextCTAPropsPayload;
    if (nextCTAPropsPayload instanceof Function) {
        nextPayload = nextCTAPropsPayload(ctaState);
        if (!nextPayload) return ctaReducerState;
    }
    if (ctaType in $d1a0eb9e2dbe8803$var$predefinedActionsConst) return $d1a0eb9e2dbe8803$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: cta(ctaState, nextPayload),
        type: ctaType
    });
    const nextState = cta({
        ...ctaState,
        replaceAction: (0, $39ac042edb60bbed$export$8b725d9d25bcde8e).create,
        replaceInitialAction: (0, $39ac042edb60bbed$export$a46e54165014b190).create,
        resetAction: (0, $39ac042edb60bbed$export$8572caab90b686ec).create,
        updateAction: (0, $39ac042edb60bbed$export$36ff979fbd3521a9).create
    }, nextPayload);
    if (!nextState) return ctaReducerState;
    const actionType = $d1a0eb9e2dbe8803$var$getActionType(nextState);
    if (!actionType) return ctaReducerState;
    const { type: type, useCustom: useCustom } = actionType;
    let { next: next } = actionType;
    const customPredefinedCTA = isActionsObject && actions?.[type];
    if (typeof customPredefinedCTA === "function" && useCustom) next = customPredefinedCTA(ctaState, next);
    return $d1a0eb9e2dbe8803$var$typeResult({
        ctaReducerState: ctaReducerState,
        next: next,
        type: type
    });
}


function $062383fffa733698$var$_init(privateCTAState, init) {
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
function $062383fffa733698$export$2e2bcd8739ae039(params) {
    return (0, $dYZEH$react.useReducer)(function reducerCallback(ctaReducerState, nextCTAProps) {
        return (0, $d1a0eb9e2dbe8803$export$2e2bcd8739ae039)({
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
        return $062383fffa733698$var$_init(privateCTAState, params.onInit);
    });
}



function $217ab95d1d983957$var$mergeCustomCTAWithDefaultCTA(dispatch, defaultCTARecord, ctaRecord) {
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
function $217ab95d1d983957$var$wrapPrivateDispatcher(dispatcher, actions) {
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
        cta: $217ab95d1d983957$var$mergeCustomCTAWithDefaultCTA(publicDispatcher, cta, actions)
    });
}
function $217ab95d1d983957$export$2e2bcd8739ae039(params) {
    const { actions: actions } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const augmentedDispatcher = (0, $dYZEH$react.useMemo)(()=>$217ab95d1d983957$var$wrapPrivateDispatcher(ctaDispatch, actions), [
        actions,
        ctaDispatch
    ]);
    return (0, $dYZEH$react.useMemo)(()=>{
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


function $882b6d93070905b3$export$68a5bb76170d2250(useCTAParameter) {
    const stateDispatcher = (0, $062383fffa733698$export$2e2bcd8739ae039)(useCTAParameter);
    return (0, $217ab95d1d983957$export$2e2bcd8739ae039)({
        actions: useCTAParameter.actions,
        stateDispatcher: stateDispatcher
    });
}


//# sourceMappingURL=index.js.map
