var $d6e548939060e3ae$exports = require("./useCTA.13c5d356.js");
var $9znZ4$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTAContext", () => $1045ff876afe552c$export$a85baad6d8324b85);


function $1045ff876afe552c$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = (0, $9znZ4$react.createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = (0, $9znZ4$react.createContext)(null);
    return {
        CTAProvider ({ initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare, afterActionChange: afterActionChange = contextParams.afterActionChange, children: children }) {
            const [value, dispatch] = (0, $d6e548939060e3ae$exports.useCTA)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: compare,
                afterActionChange: afterActionChange
            });
            return (0, $9znZ4$react.createElement)(CTAContextHistory.Provider, {
                value: value
            }, (0, $9znZ4$react.createElement)(CTAContextDispatch.Provider, {
                value: dispatch
            }, children));
        },
        useCTAHistoryContext () {
            return (0, $9znZ4$react.useContext)(CTAContextHistory);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $9znZ4$react.useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


//# sourceMappingURL=createCTAContext.36fcb167.js.map
