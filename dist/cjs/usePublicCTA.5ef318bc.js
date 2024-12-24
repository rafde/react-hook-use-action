var $0b6f0bd6e9d4ab4e$exports = require("./createDispatchInterface.9c9f833e.js");
var $h8IZn$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $217ab95d1d983957$export$2e2bcd8739ae039);


function $217ab95d1d983957$export$2e2bcd8739ae039(params) {
    const { actions: actions } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const dispatch = (0, $h8IZn$react.useMemo)(()=>(0, $0b6f0bd6e9d4ab4e$exports.createDispatchInterface)(ctaDispatch, actions), [
        ctaDispatch,
        actions
    ]);
    return (0, $h8IZn$react.useMemo)(()=>{
        const history = {
            changes: ctaState.changes,
            current: ctaState.current,
            initial: ctaState.initial,
            previous: ctaState.previous,
            previousInitial: ctaState.previousInitial
        };
        dispatch.history = history;
        return [
            history,
            dispatch
        ];
    }, [
        ctaState,
        dispatch
    ]);
}


//# sourceMappingURL=usePublicCTA.5ef318bc.js.map
