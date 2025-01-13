var $6c056cda560e414d$exports = require("./createCTAHistory.79c1dff1.js");
var $0b6f0bd6e9d4ab4e$exports = require("./createDispatchInterface.a0edd5d1.js");
var $h8IZn$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $217ab95d1d983957$export$2e2bcd8739ae039);



function $217ab95d1d983957$export$2e2bcd8739ae039(params) {
    const { actions: actions, createFunc: createFunc } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const dispatch = (0, $h8IZn$react.useMemo)(()=>(0, $0b6f0bd6e9d4ab4e$exports.default)((...args)=>{
            ctaDispatch(...args);
        }, ctaState, createFunc, actions), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (0, $h8IZn$react.useMemo)(()=>{
        const history = (0, $6c056cda560e414d$exports.default)(ctaState);
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


//# sourceMappingURL=usePublicCTA.7dbefa18.js.map
