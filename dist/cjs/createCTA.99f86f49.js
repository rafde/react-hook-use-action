var $56455aab2d865ec7$exports = require("./compareCallback.3bdf13a2.js");
var $0b6f0bd6e9d4ab4e$exports = require("./createDispatchInterface.9c9f833e.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.e5240065.js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTA", () => $7a1f3537a326bb65$export$e7a3b152d8f3410e);



function $7a1f3537a326bb65$export$e7a3b152d8f3410e(useCTAParameter) {
    const { initial: initial } = useCTAParameter;
    const actions = typeof useCTAParameter.actions === 'undefined' ? undefined : {
        ...useCTAParameter.actions
    };
    let history = {
        changes: null,
        current: initial,
        initial: initial,
        previous: null,
        previousInitial: null
    };
    let ctaReducerState = {
        ...history,
        changesMap: new Map()
    };
    const compare = (0, $56455aab2d865ec7$exports.compareCallback)(useCTAParameter.compare);
    const ctaCallback = (0, $0b6f0bd6e9d4ab4e$exports.createDispatchInterface)(function _ctaCallback(nextCTAProps) {
        const newCtaReducerState = (0, $d1a0eb9e2dbe8803$exports.default)({
            actions: actions,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps
        });
        if (newCtaReducerState !== ctaReducerState) {
            ctaReducerState = newCtaReducerState;
            history = {
                changes: ctaReducerState.changes,
                current: ctaReducerState.current,
                initial: ctaReducerState.initial,
                previous: ctaReducerState.previous,
                previousInitial: ctaReducerState.previousInitial
            };
        }
        ctaCallback.history = history;
        return history;
    }, actions);
    ctaCallback.history = history;
    return [
        history,
        ctaCallback
    ];
}


//# sourceMappingURL=createCTA.99f86f49.js.map
