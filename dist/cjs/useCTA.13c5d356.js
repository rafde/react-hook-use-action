var $062383fffa733698$exports = require("./usePrivateCTA.3985132e.js");
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
    return (0, $217ab95d1d983957$exports.default)({
        actions: actions,
        stateDispatcher: stateDispatcher
    });
}


//# sourceMappingURL=useCTA.13c5d356.js.map
