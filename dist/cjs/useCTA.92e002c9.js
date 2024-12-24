var $062383fffa733698$exports = require("./usePrivateCTA.9acd95af.js");
var $217ab95d1d983957$exports = require("./usePublicCTA.5ef318bc.js");
var $5qZYu$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useCTA", () => $9038697f50eb2a0e$export$68a5bb76170d2250);



function $9038697f50eb2a0e$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $5qZYu$react.useMemo)(()=>{
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


//# sourceMappingURL=useCTA.92e002c9.js.map
