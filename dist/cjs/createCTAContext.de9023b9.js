var $9038697f50eb2a0e$exports = require("./useCTA.92e002c9.js");
var $lSvo6$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTAContext", () => $1ec304102a8702ca$export$a85baad6d8324b85);


function $1ec304102a8702ca$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = (0, $lSvo6$react.createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = (0, $lSvo6$react.createContext)(null);
    return {
        CTAProvider (props) {
            const { initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare } = props;
            const [value, dispatch] = (0, $9038697f50eb2a0e$exports.useCTA)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: compare
            });
            return (0, $lSvo6$react.createElement)(CTAContextHistory.Provider, {
                value: value,
                children: (0, $lSvo6$react.createElement)(CTAContextDispatch.Provider, {
                    value: dispatch,
                    children: props.children
                })
            });
        },
        useCTAHistoryContext () {
            return (0, $lSvo6$react.useContext)(CTAContextHistory);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $lSvo6$react.useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


//# sourceMappingURL=createCTAContext.de9023b9.js.map
