var $86ac65d171f749b0$exports = require("./createCTABase.d2829587.js");
var $9UBRr$fastequals = require("fast-equals");
var $9UBRr$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTASelector", () => $ad2fe70b3c7d29fa$export$32d3704051e6d520);



function $ad2fe70b3c7d29fa$export$32d3704051e6d520(props, createFunc = ()=>({})) {
    const ctaReducerResults = (0, $86ac65d171f749b0$exports.default)({
        ...props,
        onStateChange: (newHistory)=>{
            history = newHistory;
            snapshot = {
                ...newHistory,
                dispatch: dispatch
            };
            listeners.forEach((listener)=>listener(snapshot));
        }
    }, createFunc);
    let { history: history } = ctaReducerResults;
    const { dispatch: dispatch } = ctaReducerResults;
    const initialSnapshot = {
        ...history,
        dispatch: dispatch
    };
    let snapshot = initialSnapshot;
    function getHistory() {
        return dispatch.history;
    }
    const listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return ()=>{
            listeners.delete(listener);
        };
    }
    function useCTASelector(selector) {
        const resultRef = (0, $9UBRr$react.useRef)(null);
        const selectorCallback = (0, $9UBRr$react.useCallback)((snapshot)=>{
            const result = selector(snapshot);
            if (!(0, $9UBRr$fastequals.strictDeepEqual)(resultRef.current, result)) resultRef.current = result;
            return resultRef.current;
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
        // @see {@link https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js}
        return (0, $9UBRr$react.useSyncExternalStore)(subscribe, ()=>selectorCallback(snapshot), ()=>selector(initialSnapshot));
    }
    return Object.assign(useCTASelector, {
        dispatch: dispatch,
        getHistory: getHistory
    });
}


//# sourceMappingURL=createCTASelector.a37141b1.js.map
