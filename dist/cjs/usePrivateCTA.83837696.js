var $56455aab2d865ec7$exports = require("./compareCallback.07cc881e.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.0617486f.js");
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
    const compare = (0, $k1nAk$react.useMemo)(()=>(0, $56455aab2d865ec7$exports.default)(params.compare), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const init = (0, $k1nAk$react.useMemo)(()=>({
            actionType: '',
            customAction: undefined,
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


//# sourceMappingURL=usePrivateCTA.83837696.js.map
