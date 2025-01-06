import {compareCallback as $ae55f4861d2c7e56$export$29227ec4dc2b4d64} from "./compareCallback.6be7201d.js";
import {createDispatchInterface as $ddb1abc523767a90$export$af9ac7063a513c32} from "./createDispatchInterface.df358646.js";
import $f0f97a638af05ef2$export$2e2bcd8739ae039 from "./ctaReducer.8e0078fa.js";




function $777e399f220f5c9c$export$e7a3b152d8f3410e(ctaParameter) {
    const { initial: initial } = ctaParameter;
    const actions = typeof ctaParameter.actions === 'undefined' ? undefined : {
        ...ctaParameter.actions
    };
    let history = {
        changes: null,
        current: initial,
        initial: initial,
        previous: null,
        previousInitial: null
    };
    let ctaReducerState = {
        ...history,
        changesMap: new Map()
    };
    const compare = (0, $ae55f4861d2c7e56$export$29227ec4dc2b4d64)(ctaParameter.compare);
    const ctaCallback = (0, $ddb1abc523767a90$export$af9ac7063a513c32)(function _ctaCallback(nextCTAProps) {
        const newCtaReducerState = (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            actions: actions,
            afterActionChange: ctaParameter.afterActionChange,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps,
            transform: ctaParameter.transform
        });
        if (newCtaReducerState !== ctaReducerState) {
            ctaReducerState = newCtaReducerState;
            history = {
                changes: ctaReducerState.changes,
                current: ctaReducerState.current,
                initial: ctaReducerState.initial,
                previous: ctaReducerState.previous,
                previousInitial: ctaReducerState.previousInitial
            };
        }
        ctaCallback.history = history;
        return history;
    }, actions);
    ctaCallback.history = history;
    return [
        history,
        ctaCallback
    ];
}


export {$777e399f220f5c9c$export$e7a3b152d8f3410e as createCTA};
//# sourceMappingURL=createCTA.96c77b2d.js.map
