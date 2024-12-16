import $2c88330f69c778dc$export$2e2bcd8739ae039 from "./usePrivateCTA.09391aa1.js";
import $56a9759d6a9823a8$export$2e2bcd8739ae039 from "./usePublicCTA.3048e208.js";
import {useMemo as $f6bYW$useMemo} from "react";




function $e6132079d5aa8029$export$68a5bb76170d2250(useCTAParameter) {
    const actions = (0, $f6bYW$useMemo)(()=>{
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


export {$e6132079d5aa8029$export$68a5bb76170d2250 as useCTA};
//# sourceMappingURL=useCTA.57ff798a.js.map
