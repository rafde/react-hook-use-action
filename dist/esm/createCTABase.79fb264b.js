import $ae55f4861d2c7e56$export$2e2bcd8739ae039 from "./compareCallback.e79af8ad.js";
import $ddb1abc523767a90$export$2e2bcd8739ae039 from "./createDispatchInterface.4f05f0bd.js";
import $cde3e3dbd0d3bcac$export$2e2bcd8739ae039 from "./createCTAHistory.529bd146.js";
import $f0f97a638af05ef2$export$2e2bcd8739ae039 from "./ctaReducer.c21ef13b.js";





function $18361302265c0809$export$2e2bcd8739ae039(params, createFunc) {
    const { initial: initial, onStateChange: onStateChange = (history)=>history } = params;
    const actions = typeof params.actions === 'undefined' ? undefined : {
        ...params.actions
    };
    let history = (0, $cde3e3dbd0d3bcac$export$2e2bcd8739ae039)({
        current: initial
    });
    let ctaReducerState = {
        ...history,
        actionType: '',
        customAction: undefined,
        changesMap: new Map()
    };
    const compare = (0, $ae55f4861d2c7e56$export$2e2bcd8739ae039)(params.compare);
    const dispatch = (0, $ddb1abc523767a90$export$2e2bcd8739ae039)(function ctaBaseCallback(nextCTAProps) {
        const next = (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            actions: actions,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps,
            transform: params.transform
        });
        if (next === ctaReducerState) return onStateChange?.(history, ctaReducerState);
        ctaReducerState = next;
        history = (0, $cde3e3dbd0d3bcac$export$2e2bcd8739ae039)(next);
        dispatch.history = history;
        params.afterActionChange?.(history, ctaReducerState.actionType, ctaReducerState.customAction);
        return onStateChange?.(history, ctaReducerState);
    }, history, createFunc, actions);
    return {
        history: history,
        dispatch: dispatch
    };
}


export {$18361302265c0809$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=createCTABase.79fb264b.js.map
