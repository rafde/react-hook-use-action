import $cde3e3dbd0d3bcac$export$2e2bcd8739ae039 from "./createCTAHistory.f4f571d2.js";
import $ddb1abc523767a90$export$2e2bcd8739ae039 from "./createDispatchInterface.4f05f0bd.js";
import {useMemo as $fPwYy$useMemo} from "react";




function $56a9759d6a9823a8$export$2e2bcd8739ae039(params) {
    const { actions: actions, createFunc: createFunc } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const dispatch = (0, $fPwYy$useMemo)(()=>(0, $ddb1abc523767a90$export$2e2bcd8739ae039)((...args)=>{
            ctaDispatch(...args);
        }, ctaState, createFunc, actions), // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (0, $fPwYy$useMemo)(()=>{
        const history = (0, $cde3e3dbd0d3bcac$export$2e2bcd8739ae039)(ctaState);
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
//# sourceMappingURL=usePublicCTA.d81bdb0d.js.map
