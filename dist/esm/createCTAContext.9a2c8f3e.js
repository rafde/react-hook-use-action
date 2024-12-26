import {useCTA as $e6132079d5aa8029$export$68a5bb76170d2250} from "./useCTA.575281f8.js";
import {createContext as $a4giA$createContext, createElement as $a4giA$createElement, useContext as $a4giA$useContext} from "react";



function $892b065d456c8764$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = (0, $a4giA$createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = (0, $a4giA$createContext)(null);
    return {
        CTAProvider (props) {
            const { initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare } = props;
            const [value, dispatch] = (0, $e6132079d5aa8029$export$68a5bb76170d2250)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: compare
            });
            return (0, $a4giA$createElement)(CTAContextHistory.Provider, {
                value: value,
                children: (0, $a4giA$createElement)(CTAContextDispatch.Provider, {
                    value: dispatch,
                    children: props.children
                })
            });
        },
        useCTAHistoryContext () {
            return (0, $a4giA$useContext)(CTAContextHistory);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $a4giA$useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


export {$892b065d456c8764$export$a85baad6d8324b85 as createCTAContext};
//# sourceMappingURL=createCTAContext.9a2c8f3e.js.map
