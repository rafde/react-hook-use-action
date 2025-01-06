import $2c88330f69c778dc$export$2e2bcd8739ae039 from "./usePrivateCTA.4a0552bb.js";
import $56a9759d6a9823a8$export$2e2bcd8739ae039 from "./usePublicCTA.bf8d881d.js";
import {useMemo as $9iAxI$useMemo} from "react";




function $5faadda8f7072751$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $9iAxI$useMemo)(()=>{
        if (useCTAParameter.actions && typeof useCTAParameter.actions === 'object') return {
            ...useCTAParameter.actions
        };
        return useCTAParameter.actions;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const stateDispatcher = (0, $2c88330f69c778dc$export$2e2bcd8739ae039)(useCTAParameter, actions);
    return (0, $56a9759d6a9823a8$export$2e2bcd8739ae039)({
        actions: actions,
        stateDispatcher: stateDispatcher
    });
}


export {$5faadda8f7072751$export$68a5bb76170d2250 as useCTA};
//# sourceMappingURL=useCTA.3be40a11.js.map
