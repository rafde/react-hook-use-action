var $6c056cda560e414d$exports = require("./createCTAHistory.e642bcd3.js");
var $062383fffa733698$exports = require("./usePrivateCTA.83837696.js");
var $217ab95d1d983957$exports = require("./usePublicCTA.8886a347.js");
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
        const { afterActionChange: afterActionChange } = props;
        const isFunction = typeof afterActionChange === 'function';
        if (!isFunction) return ()=>{};
        let oldState = ctaReducerState;
        return function(ctaReducerState) {
            if (ctaReducerState === oldState) return;
            oldState = ctaReducerState;
            Promise.resolve().then(()=>afterActionChange((0, $6c056cda560e414d$exports.default)(ctaReducerState), ctaReducerState.actionType, ctaReducerState.customAction));
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


//# sourceMappingURL=useCTA.a52b0aea.js.map
