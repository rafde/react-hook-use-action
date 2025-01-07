var $062383fffa733698$exports = require("./usePrivateCTA.af33ee94.js");
var $217ab95d1d983957$exports = require("./usePublicCTA.21a1cb20.js");
var $2eF2K$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useCTA", () => $d6e548939060e3ae$export$68a5bb76170d2250);



function $d6e548939060e3ae$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $2eF2K$react.useMemo)(()=>{
        if (useCTAParameter.actions && typeof useCTAParameter.actions === 'object') return {
            ...useCTAParameter.actions
        };
        return useCTAParameter.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $062383fffa733698$exports.default)(useCTAParameter, actions);
    const [ctaReducerState] = stateDispatcher;
    const afterActionChange = (0, $2eF2K$react.useMemo)(()=>{
        const isFunction = typeof useCTAParameter.afterActionChange === 'function';
        let oldState = ctaReducerState;
        return function(ctaReducerState) {
            if (!isFunction || ctaReducerState === oldState) return;
            oldState = ctaReducerState;
            Promise.resolve().then(()=>useCTAParameter?.afterActionChange?.({
                    changes: ctaReducerState.changes,
                    current: ctaReducerState.current,
                    initial: ctaReducerState.initial,
                    previous: ctaReducerState.previous,
                    previousInitial: ctaReducerState.previousInitial
                }, ctaReducerState.actionType, ctaReducerState.customAction));
        };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const res = (0, $217ab95d1d983957$exports.default)({
        actions: actions,
        stateDispatcher: stateDispatcher
    });
    (0, $2eF2K$react.useEffect)(()=>{
        afterActionChange(ctaReducerState);
    }, [
        ctaReducerState,
        afterActionChange
    ]);
    return res;
}


//# sourceMappingURL=useCTA.3e76f5be.js.map
