import $2c88330f69c778dc$export$2e2bcd8739ae039 from "./usePrivateCTA.5afcf50e.js";
import $56a9759d6a9823a8$export$2e2bcd8739ae039 from "./usePublicCTA.bf8d881d.js";
import {useMemo as $9iAxI$useMemo, useEffect as $9iAxI$useEffect} from "react";




function $5faadda8f7072751$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $9iAxI$useMemo)(()=>{
        if (useCTAParameter.actions && typeof useCTAParameter.actions === 'object') return {
            ...useCTAParameter.actions
        };
        return useCTAParameter.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $2c88330f69c778dc$export$2e2bcd8739ae039)(useCTAParameter, actions);
    const [ctaReducerState] = stateDispatcher;
    const afterActionChange = (0, $9iAxI$useMemo)(()=>{
        const isFunction = typeof useCTAParameter.afterActionChange === 'function';
        let oldState = ctaReducerState;
        return function(ctaReducerState) {
            if (!isFunction || ctaReducerState === oldState) return;
            oldState = ctaReducerState;
            Promise.resolve().then(()=>useCTAParameter?.afterActionChange?.({
                    changes: ctaReducerState.changes,
                    current: ctaReducerState.current,
                    initial: ctaReducerState.initial,
                    previous: ctaReducerState.previous,
                    previousInitial: ctaReducerState.previousInitial
                }, ctaReducerState.actionType, ctaReducerState.customAction));
        };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const res = (0, $56a9759d6a9823a8$export$2e2bcd8739ae039)({
        actions: actions,
        stateDispatcher: stateDispatcher
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
//# sourceMappingURL=useCTA.77e930a3.js.map
