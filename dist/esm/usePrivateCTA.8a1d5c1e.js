import {compareCallback as $ae55f4861d2c7e56$export$29227ec4dc2b4d64} from "./compareCallback.fbe36f3f.js";
import $f0f97a638af05ef2$export$2e2bcd8739ae039 from "./ctaReducer.91b86e70.js";
import {useMemo as $9y7Gj$useMemo, useReducer as $9y7Gj$useReducer} from "react";




function $2c88330f69c778dc$var$_init(privateCTAState, init) {
    const changesMap = new Map();
    if (typeof init !== 'function') return {
        ...privateCTAState,
        changesMap: changesMap
    };
    const initial = init(privateCTAState.current);
    return {
        ...privateCTAState,
        changesMap: changesMap,
        current: initial,
        initial: initial
    };
}
function $2c88330f69c778dc$export$2e2bcd8739ae039(params, actions) {
    const compare = (0, $9y7Gj$useMemo)(()=>(0, $ae55f4861d2c7e56$export$29227ec4dc2b4d64)(params.compare), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (0, $9y7Gj$useReducer)(function reducerCallback(ctaReducerState, nextCTAProps) {
        return (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            ctaReducerState: ctaReducerState,
            actions: actions,
            nextCTAProps: nextCTAProps,
            compare: compare
        });
    }, {
        changes: null,
        // Set changesMap in init to avoid re-instantiating a new Map everytime this is called
        changesMap: undefined,
        current: params.initial,
        initial: params.initial,
        previous: null,
        previousInitial: null
    }, function _onInit(privateCTAState) {
        return $2c88330f69c778dc$var$_init(privateCTAState, params.onInit);
    });
}


export {$2c88330f69c778dc$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=usePrivateCTA.8a1d5c1e.js.map
