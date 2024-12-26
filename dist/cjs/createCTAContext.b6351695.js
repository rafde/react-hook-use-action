var $9038697f50eb2a0e$exports = require("./useCTA.92e002c9.js");
var $iaJ98$reactjsxruntime = require("react/jsx-runtime");
var $iaJ98$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTAContext", () => $34d6e107948ce469$export$a85baad6d8324b85);



function $34d6e107948ce469$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = /*#__PURE__*/ (0, $iaJ98$react.createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = /*#__PURE__*/ (0, $iaJ98$react.createContext)(null);
    return {
        CTAProvider (props) {
            const { initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare } = props;
            const [state, dispatcher] = (0, $9038697f50eb2a0e$exports.useCTA)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: compare
            });
            return /*#__PURE__*/ (0, $iaJ98$reactjsxruntime.jsx)(CTAContextHistory.Provider, {
                value: state,
                children: /*#__PURE__*/ (0, $iaJ98$reactjsxruntime.jsx)(CTAContextDispatch.Provider, {
                    value: dispatcher,
                    children: props.children
                })
            });
        },
        useCTAHistoryContext () {
            return (0, $iaJ98$react.useContext)(CTAContextHistory);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $iaJ98$react.useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


//# sourceMappingURL=createCTAContext.b6351695.js.map
