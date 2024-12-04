var $56455aab2d865ec7$exports = require("./compareCallback.6bb63cab.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.aa05e2aa.js");
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
    return (0, $k1nAk$react.useReducer)(function reducerCallback(ctaReducerState, nextCTAProps) {
        return (0, $d1a0eb9e2dbe8803$exports.default)({
            ctaReducerState: ctaReducerState,
            actions: actions,
            nextCTAProps: nextCTAProps,
            compare: compare
        });
    }, {
        changes: null,
        // Set changesMap in init to avoid re-instantiating a new Map everytime this is called
        changesMap: undefined,
        current: params.initial,
        initial: params.initial,
        previous: null,
        previousInitial: null
    }, function _onInit(privateCTAState) {
        return $062383fffa733698$var$_init(privateCTAState, params.onInit);
    });
}


//# sourceMappingURL=usePrivateCTA.24f0a03a.js.map
