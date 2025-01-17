var $6c056cda560e414d$exports = require("./createCTAHistory.e642bcd3.js");
var $d6e548939060e3ae$exports = require("./useCTA.a52b0aea.js");
var $9znZ4$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createCTAContext", () => $1045ff876afe552c$export$a85baad6d8324b85);



function $1045ff876afe552c$export$a85baad6d8324b85(props, createFunc = ()=>({})) {
    const CTAContextHistory = (0, $9znZ4$react.createContext)((0, $6c056cda560e414d$exports.default)({
        initial: props.initial
    }));
    const CTAContextDispatch = (0, $9znZ4$react.createContext)(null);
    return {
        CTAProvider ({ initial: initial = props.initial, onInit: onInit = props.onInit, compare: compare = props.compare, afterActionChange: afterActionChange = props.afterActionChange, children: children, transform: transform = props.transform }) {
            const [value, dispatch] = (0, $d6e548939060e3ae$exports.useCTA)({
                actions: props.actions,
                afterActionChange: afterActionChange,
                compare: compare,
                initial: initial,
                onInit: onInit,
                transform: transform
            }, createFunc);
            return (0, $9znZ4$react.createElement)(CTAContextHistory.Provider, {
                value: value
            }, (0, $9znZ4$react.createElement)(CTAContextDispatch.Provider, {
                value: dispatch
            }, children));
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $9znZ4$react.useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        },
        useCTAHistoryContext () {
            return (0, $9znZ4$react.useContext)(CTAContextHistory);
        }
    };
}


//# sourceMappingURL=createCTAContext.7e048d19.js.map
