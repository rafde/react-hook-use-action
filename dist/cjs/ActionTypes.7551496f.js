
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ActionType", () => $39ac042edb60bbed$export$e4a712fff93fb00f);
$parcel$export(module.exports, "createUpdateInitialActionType", () => $39ac042edb60bbed$export$8b901517d6e09295);
$parcel$export(module.exports, "createResetActionType", () => $39ac042edb60bbed$export$4bebcb0ea4f6657e);
$parcel$export(module.exports, "createUpdateActionType", () => $39ac042edb60bbed$export$aa336a942b9a3093);
$parcel$export(module.exports, "createReplaceActionType", () => $39ac042edb60bbed$export$5af3483b9b67ce66);
$parcel$export(module.exports, "createReplaceInitialActionType", () => $39ac042edb60bbed$export$3ff81d2d0cf2ee3);
class $39ac042edb60bbed$export$e4a712fff93fb00f {
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
function $39ac042edb60bbed$var$_hasAugmentedAction(actions, type) {
    return Boolean(actions && typeof actions === 'object' && type in actions);
}
class $39ac042edb60bbed$export$dd1c11789f6d0171 extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'updateInitial'
        });
    }
}
function $39ac042edb60bbed$export$8b901517d6e09295(actions) {
    const hasAction = $39ac042edb60bbed$var$_hasAugmentedAction(actions, 'updateInitial');
    return function updateActionType(payload, actionTypeOptions) {
        return new $39ac042edb60bbed$export$dd1c11789f6d0171({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAction,
            payload: payload
        });
    };
}
class $39ac042edb60bbed$export$8572caab90b686ec extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'reset'
        });
    }
}
function $39ac042edb60bbed$export$4bebcb0ea4f6657e(actions) {
    const hasAction = $39ac042edb60bbed$var$_hasAugmentedAction(actions, 'reset');
    return function resetActionType(payload, actionTypeOptions) {
        return new $39ac042edb60bbed$export$8572caab90b686ec({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAction,
            payload: payload
        });
    };
}
class $39ac042edb60bbed$export$36ff979fbd3521a9 extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'update'
        });
    }
}
function $39ac042edb60bbed$export$aa336a942b9a3093(actions) {
    const hasAugmentedAction = $39ac042edb60bbed$var$_hasAugmentedAction(actions, 'update');
    return function updateActionType(payload, actionTypeOptions) {
        return new $39ac042edb60bbed$export$36ff979fbd3521a9({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}
class $39ac042edb60bbed$export$8b725d9d25bcde8e extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'replace'
        });
    }
}
function $39ac042edb60bbed$export$5af3483b9b67ce66(actions) {
    const hasAugmentedAction = $39ac042edb60bbed$var$_hasAugmentedAction(actions, 'replace');
    return function replaceActionType(payload, actionTypeOptions) {
        return new $39ac042edb60bbed$export$8b725d9d25bcde8e({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}
class $39ac042edb60bbed$export$a46e54165014b190 extends $39ac042edb60bbed$export$e4a712fff93fb00f {
    constructor(param){
        super({
            ...param,
            type: 'replaceInitial'
        });
    }
}
function $39ac042edb60bbed$export$3ff81d2d0cf2ee3(actions) {
    const hasAugmentedAction = $39ac042edb60bbed$var$_hasAugmentedAction(actions, 'replaceInitial');
    return function replaceInitialActionType(payload, actionTypeOptions) {
        return new $39ac042edb60bbed$export$a46e54165014b190({
            actionTypeOptions: actionTypeOptions,
            hasAugmentedAction: hasAugmentedAction,
            payload: payload
        });
    };
}


//# sourceMappingURL=ActionTypes.7551496f.js.map
