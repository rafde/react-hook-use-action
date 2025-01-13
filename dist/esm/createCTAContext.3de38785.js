import $cde3e3dbd0d3bcac$export$2e2bcd8739ae039 from "./createCTAHistory.529bd146.js";
import {useCTA as $5faadda8f7072751$export$68a5bb76170d2250} from "./useCTA.b5644d53.js";
import {createContext as $dFrC2$createContext, createElement as $dFrC2$createElement, useContext as $dFrC2$useContext} from "react";




function $0520831b50975271$export$a85baad6d8324b85(props, createFunc = ()=>({})) {
    const CTAContextHistory = (0, $dFrC2$createContext)((0, $cde3e3dbd0d3bcac$export$2e2bcd8739ae039)({
        current: props.initial
    }));
    const CTAContextDispatch = (0, $dFrC2$createContext)(null);
    return {
        CTAProvider ({ initial: initial = props.initial, onInit: onInit = props.onInit, compare: compare = props.compare, afterActionChange: afterActionChange = props.afterActionChange, children: children, transform: transform = props.transform }) {
            const [value, dispatch] = (0, $5faadda8f7072751$export$68a5bb76170d2250)({
                actions: props.actions,
                afterActionChange: afterActionChange,
                compare: compare,
                initial: initial,
                onInit: onInit,
                transform: transform
            }, createFunc);
            return (0, $dFrC2$createElement)(CTAContextHistory.Provider, {
                value: value
            }, (0, $dFrC2$createElement)(CTAContextDispatch.Provider, {
                value: dispatch
            }, children));
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $dFrC2$useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        },
        useCTAHistoryContext () {
            return (0, $dFrC2$useContext)(CTAContextHistory);
        }
    };
}


export {$0520831b50975271$export$a85baad6d8324b85 as createCTAContext};
//# sourceMappingURL=createCTAContext.3de38785.js.map
