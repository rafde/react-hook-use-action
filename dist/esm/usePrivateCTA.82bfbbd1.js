import $ae55f4861d2c7e56$export$2e2bcd8739ae039 from "./compareCallback.e79af8ad.js";
import $f0f97a638af05ef2$export$2e2bcd8739ae039 from "./ctaReducer.2c7c7d4d.js";
import {useMemo as $9y7Gj$useMemo, useCallback as $9y7Gj$useCallback, useReducer as $9y7Gj$useReducer} from "react";




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
    const compare = (0, $9y7Gj$useMemo)(()=>(0, $ae55f4861d2c7e56$export$2e2bcd8739ae039)(params.compare), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const init = (0, $9y7Gj$useMemo)(()=>({
            actionType: '',
            customAction: undefined,
            changes: null,
            // Set changesMap in init to avoid re-instantiating a new Map everytime this is called
            changesMap: undefined,
            current: params.initial,
            initial: params.initial,
            previous: null,
            previousInitial: null
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const reducerCallback = (0, $9y7Gj$useCallback)((ctaReducerState, nextCTAProps)=>(0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            actions: actions,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps,
            transform: params.transform
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const onInit = (0, $9y7Gj$useCallback)((privateCTAState)=>$2c88330f69c778dc$var$_init(privateCTAState, params.onInit), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (0, $9y7Gj$useReducer)(reducerCallback, init, onInit);
}


export {$2c88330f69c778dc$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=usePrivateCTA.82bfbbd1.js.map
