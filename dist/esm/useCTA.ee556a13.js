import $cde3e3dbd0d3bcac$export$2e2bcd8739ae039 from "./createCTAHistory.529bd146.js";
import $2c88330f69c778dc$export$2e2bcd8739ae039 from "./usePrivateCTA.82bfbbd1.js";
import $56a9759d6a9823a8$export$2e2bcd8739ae039 from "./usePublicCTA.c78b1fbe.js";
import {useMemo as $9iAxI$useMemo, useEffect as $9iAxI$useEffect} from "react";





function $5faadda8f7072751$export$68a5bb76170d2250(props, createFunc = ()=>({})) {
    const actions = (0, $9iAxI$useMemo)(()=>{
        if (props.actions && typeof props.actions === 'object') return {
            ...props.actions
        };
        return props.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $2c88330f69c778dc$export$2e2bcd8739ae039)(props, actions);
    const [ctaReducerState] = stateDispatcher;
    const afterActionChange = (0, $9iAxI$useMemo)(()=>{
        const isFunction = typeof props.afterActionChange === 'function';
        let oldState = ctaReducerState;
        return function(ctaReducerState) {
            if (!isFunction || ctaReducerState === oldState) return;
            oldState = ctaReducerState;
            Promise.resolve().then(()=>props?.afterActionChange?.((0, $cde3e3dbd0d3bcac$export$2e2bcd8739ae039)(ctaReducerState), ctaReducerState.actionType, ctaReducerState.customAction));
        };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const res = (0, $56a9759d6a9823a8$export$2e2bcd8739ae039)({
        actions: actions,
        stateDispatcher: stateDispatcher,
        createFunc: createFunc
    });
    (0, $9iAxI$useEffect)(()=>{
        afterActionChange(ctaReducerState);
    }, [
        ctaReducerState,
        afterActionChange
    ]);
    return res;
}


export {$5faadda8f7072751$export$68a5bb76170d2250 as useCTA};
//# sourceMappingURL=useCTA.ee556a13.js.map
