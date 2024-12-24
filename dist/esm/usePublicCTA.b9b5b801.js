import {createDispatchInterface as $ddb1abc523767a90$export$af9ac7063a513c32} from "./createDispatchInterface.1453d2cf.js";
import {useMemo as $fPwYy$useMemo} from "react";



function $56a9759d6a9823a8$export$2e2bcd8739ae039(params) {
    const { actions: actions } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const dispatch = (0, $fPwYy$useMemo)(()=>(0, $ddb1abc523767a90$export$af9ac7063a513c32)(ctaDispatch, actions), [
        ctaDispatch,
        actions
    ]);
    return (0, $fPwYy$useMemo)(()=>{
        const history = {
            changes: ctaState.changes,
            current: ctaState.current,
            initial: ctaState.initial,
            previous: ctaState.previous,
            previousInitial: ctaState.previousInitial
        };
        dispatch.history = history;
        return [
            history,
            dispatch
        ];
    }, [
        ctaState,
        dispatch
    ]);
}


export {$56a9759d6a9823a8$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=usePublicCTA.b9b5b801.js.map
