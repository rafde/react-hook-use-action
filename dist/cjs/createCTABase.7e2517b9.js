var $56455aab2d865ec7$exports = require("./compareCallback.07cc881e.js");
var $0b6f0bd6e9d4ab4e$exports = require("./createDispatchInterface.a0edd5d1.js");
var $6c056cda560e414d$exports = require("./createCTAHistory.79c1dff1.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.0617486f.js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $86ac65d171f749b0$export$2e2bcd8739ae039);




function $86ac65d171f749b0$export$2e2bcd8739ae039(params, createFunc) {
    const { initial: initial, onStateChange: onStateChange = (history)=>history } = params;
    const actions = typeof params.actions === 'undefined' ? undefined : {
        ...params.actions
    };
    let history = (0, $6c056cda560e414d$exports.default)({
        current: initial
    });
    let ctaReducerState = {
        ...history,
        actionType: '',
        customAction: undefined,
        changesMap: new Map()
    };
    const compare = (0, $56455aab2d865ec7$exports.default)(params.compare);
    const dispatch = (0, $0b6f0bd6e9d4ab4e$exports.default)(function ctaBaseCallback(nextCTAProps) {
        const next = (0, $d1a0eb9e2dbe8803$exports.default)({
            actions: actions,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps,
            transform: params.transform
        });
        if (next === ctaReducerState) return onStateChange?.(history, ctaReducerState);
        ctaReducerState = next;
        history = (0, $6c056cda560e414d$exports.default)(next);
        dispatch.history = history;
        params.afterActionChange?.(history, ctaReducerState.actionType, ctaReducerState.customAction);
        return onStateChange?.(history, ctaReducerState);
    }, history, createFunc, actions);
    return {
        history: history,
        dispatch: dispatch
    };
}


//# sourceMappingURL=createCTABase.7e2517b9.js.map
