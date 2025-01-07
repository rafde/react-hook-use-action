import {useCTA as $5faadda8f7072751$export$68a5bb76170d2250} from "./useCTA.77e930a3.js";
import {createContext as $dFrC2$createContext, createElement as $dFrC2$createElement, useContext as $dFrC2$useContext} from "react";



function $0520831b50975271$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = (0, $dFrC2$createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = (0, $dFrC2$createContext)(null);
    return {
        CTAProvider ({ initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare, afterActionChange: afterActionChange = contextParams.afterActionChange, children: children, transform: transform = contextParams.transform }) {
            const [value, dispatch] = (0, $5faadda8f7072751$export$68a5bb76170d2250)({
                actions: contextParams.actions,
                afterActionChange: afterActionChange,
                compare: compare,
                initial: initial,
                onInit: onInit,
                transform: transform
            });
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
//# sourceMappingURL=createCTAContext.43a41724.js.map
