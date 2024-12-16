import {useCTA as $e6132079d5aa8029$export$68a5bb76170d2250} from "./useCTA.57ff798a.js";
import {jsx as $1XY9O$jsx} from "react/jsx-runtime";
import {createContext as $1XY9O$createContext, useContext as $1XY9O$useContext} from "react";




function $e33a9a219f4ab8aa$export$a85baad6d8324b85(contextParams) {
    const CTAContextState = /*#__PURE__*/ (0, $1XY9O$createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = /*#__PURE__*/ (0, $1XY9O$createContext)(null);
    return {
        CTAProvider (props) {
            const { initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit } = props;
            const [state, dispatcher] = (0, $e6132079d5aa8029$export$68a5bb76170d2250)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: contextParams.compare
            });
            return /*#__PURE__*/ (0, $1XY9O$jsx)(CTAContextState.Provider, {
                value: state,
                children: /*#__PURE__*/ (0, $1XY9O$jsx)(CTAContextDispatch.Provider, {
                    value: dispatcher,
                    children: props.children
                })
            });
        },
        useCTAStateContext () {
            return (0, $1XY9O$useContext)(CTAContextState);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $1XY9O$useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


export {$e33a9a219f4ab8aa$export$a85baad6d8324b85 as createCTAContext};
//# sourceMappingURL=createCTAContext.79a54b07.js.map
