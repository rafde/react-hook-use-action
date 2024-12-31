class $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        this.type = param.type;
        this.payload = param.payload;
        this.actionTypeOptions = param.hasAugmentedAction ? {
            ...param?.actionTypeOptions
        } : {
            useDefault: true
        };
    }
}
function $289ef3ec91325d9e$var$_hasAugmentedAction(actions, type) {
    return Boolean(actions && typeof actions === 'object' && type in actions);
}
class $289ef3ec91325d9e$export$dd1c11789f6d0171 extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'updateInitial'
        });
    }
}
function $289ef3ec91325d9e$export$8b901517d6e09295(actions) {
    const hasAction = $289ef3ec91325d9e$var$_hasAugmentedAction(actions, 'updateInitial');
    return function updateActionType(payload, actionTypeOptions) {
        return new $289ef3ec91325d9e$export$dd1c11789f6d0171({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAction,
            payload: payload
        });
    };
}
class $289ef3ec91325d9e$export$8572caab90b686ec extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'reset'
        });
    }
}
function $289ef3ec91325d9e$export$4bebcb0ea4f6657e(actions) {
    const hasAction = $289ef3ec91325d9e$var$_hasAugmentedAction(actions, 'reset');
    return function resetActionType(payload, actionTypeOptions) {
        return new $289ef3ec91325d9e$export$8572caab90b686ec({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAction,
            payload: payload
        });
    };
}
class $289ef3ec91325d9e$export$36ff979fbd3521a9 extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'update'
        });
    }
}
function $289ef3ec91325d9e$export$aa336a942b9a3093(actions) {
    const hasAugmentedAction = $289ef3ec91325d9e$var$_hasAugmentedAction(actions, 'update');
    return function updateActionType(payload, actionTypeOptions) {
        return new $289ef3ec91325d9e$export$36ff979fbd3521a9({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}
class $289ef3ec91325d9e$export$8b725d9d25bcde8e extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'replace'
        });
    }
}
function $289ef3ec91325d9e$export$5af3483b9b67ce66(actions) {
    const hasAugmentedAction = $289ef3ec91325d9e$var$_hasAugmentedAction(actions, 'replace');
    return function replaceActionType(payload, actionTypeOptions) {
        return new $289ef3ec91325d9e$export$8b725d9d25bcde8e({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}
class $289ef3ec91325d9e$export$a46e54165014b190 extends $289ef3ec91325d9e$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'replaceInitial'
        });
    }
}
function $289ef3ec91325d9e$export$3ff81d2d0cf2ee3(actions) {
    const hasAugmentedAction = $289ef3ec91325d9e$var$_hasAugmentedAction(actions, 'replaceInitial');
    return function replaceInitialActionType(payload, actionTypeOptions) {
        return new $289ef3ec91325d9e$export$a46e54165014b190({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}


export {$289ef3ec91325d9e$export$e4a712fff93fb00f as ActionType, $289ef3ec91325d9e$export$dd1c11789f6d0171 as UpdateInitialActionType, $289ef3ec91325d9e$export$8b901517d6e09295 as createUpdateInitialActionType, $289ef3ec91325d9e$export$8572caab90b686ec as ResetActionType, $289ef3ec91325d9e$export$4bebcb0ea4f6657e as createResetActionType, $289ef3ec91325d9e$export$36ff979fbd3521a9 as UpdateActionType, $289ef3ec91325d9e$export$aa336a942b9a3093 as createUpdateActionType, $289ef3ec91325d9e$export$8b725d9d25bcde8e as ReplaceActionType, $289ef3ec91325d9e$export$5af3483b9b67ce66 as createReplaceActionType, $289ef3ec91325d9e$export$a46e54165014b190 as ReplaceInitialActionType, $289ef3ec91325d9e$export$3ff81d2d0cf2ee3 as createReplaceInitialActionType};
//# sourceMappingURL=ActionTypes.4612c60e.js.map
