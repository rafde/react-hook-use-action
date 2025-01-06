var $56455aab2d865ec7$exports = require("./compareCallback.3bdf13a2.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.0be33229.js");
var $k1nAk$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $062383fffa733698$export$2e2bcd8739ae039);



function $062383fffa733698$var$_init(privateCTAState, init) {
    const changesMap = new Map();
    if (typeof init !== 'function') return {
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
function $062383fffa733698$export$2e2bcd8739ae039(params, actions) {
    const compare = (0, $k1nAk$react.useMemo)(()=>(0, $56455aab2d865ec7$exports.compareCallback)(params.compare), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const init = (0, $k1nAk$react.useMemo)(()=>({
            changes: null,
            // Set changesMap in init to avoid re-instantiating a new Map everytime this is called
            changesMap: undefined,
            current: params.initial,
            initial: params.initial,
            previous: null,
            previousInitial: null
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const reducerCallback = (0, $k1nAk$react.useCallback)((ctaReducerState, nextCTAProps)=>(0, $d1a0eb9e2dbe8803$exports.default)({
            actions: actions,
            afterActionChange: params.afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps,
            transform: params.transform
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const onInit = (0, $k1nAk$react.useCallback)((privateCTAState)=>$062383fffa733698$var$_init(privateCTAState, params.onInit), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (0, $k1nAk$react.useReducer)(reducerCallback, init, onInit);
}


//# sourceMappingURL=usePrivateCTA.550540e9.js.map
