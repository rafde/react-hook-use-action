var $6c056cda560e414d$exports = require("./createCTAHistory.79c1dff1.js");
var $062383fffa733698$exports = require("./usePrivateCTA.5958acd1.js");
var $217ab95d1d983957$exports = require("./usePublicCTA.7dbefa18.js");
var $2eF2K$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useCTA", () => $d6e548939060e3ae$export$68a5bb76170d2250);




function $d6e548939060e3ae$export$68a5bb76170d2250(props, createFunc = ()=>({})) {
    const actions = (0, $2eF2K$react.useMemo)(()=>{
        if (props.actions && typeof props.actions === 'object') return {
            ...props.actions
        };
        return props.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $062383fffa733698$exports.default)(props, actions);
    const [ctaReducerState] = stateDispatcher;
    const afterActionChange = (0, $2eF2K$react.useMemo)(()=>{
        const isFunction = typeof props.afterActionChange === 'function';
        let oldState = ctaReducerState;
        return function(ctaReducerState) {
            if (!isFunction || ctaReducerState === oldState) return;
            oldState = ctaReducerState;
            Promise.resolve().then(()=>props?.afterActionChange?.((0, $6c056cda560e414d$exports.default)(ctaReducerState), ctaReducerState.actionType, ctaReducerState.customAction));
        };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const res = (0, $217ab95d1d983957$exports.default)({
        actions: actions,
        stateDispatcher: stateDispatcher,
        createFunc: createFunc
    });
    (0, $2eF2K$react.useEffect)(()=>{
        afterActionChange(ctaReducerState);
    }, [
        ctaReducerState,
        afterActionChange
    ]);
    return res;
}


//# sourceMappingURL=useCTA.6fff984a.js.map
