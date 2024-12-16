import {compareCallback as $ae55f4861d2c7e56$export$29227ec4dc2b4d64} from "./compareCallback.fbe36f3f.js";
import $f0f97a638af05ef2$export$2e2bcd8739ae039 from "./ctaReducer.91b86e70.js";



function $805e16138c5c87b4$export$f9d5111f4ab455f8(useCTAParameter) {
    const { initial: initial } = useCTAParameter;
    const actions = typeof useCTAParameter.actions === 'undefined' ? undefined : {
        ...useCTAParameter.actions
    };
    let state = {
        changes: null,
        current: initial,
        initial: initial,
        previous: null,
        previousInitial: null
    };
    let ctaReducerState = {
        ...state,
        changesMap: new Map()
    };
    const compare = (0, $ae55f4861d2c7e56$export$29227ec4dc2b4d64)(useCTAParameter.compare);
    function _ctaCallback(nextCTAProps) {
        const newCtaReducerState = (0, $f0f97a638af05ef2$export$2e2bcd8739ae039)({
            actions: actions,
            compare: compare,
            ctaReducerState: ctaReducerState,
            nextCTAProps: nextCTAProps
        });
        if (newCtaReducerState !== ctaReducerState) {
            ctaReducerState = newCtaReducerState;
            state = {
                changes: ctaReducerState.changes,
                current: ctaReducerState.current,
                initial: ctaReducerState.initial,
                previous: ctaReducerState.previous,
                previousInitial: ctaReducerState.previousInitial
            };
        }
        _ctaCallback.state = state;
        return state;
    }
    _ctaCallback.state = state;
    _ctaCallback.cta = {
        replace: (payload)=>_ctaCallback({
                payload: payload,
                type: 'replace'
            }),
        replaceInitial: (payload)=>_ctaCallback({
                payload: payload,
                type: 'replaceInitial'
            }),
        reset: (payload)=>_ctaCallback({
                payload: payload,
                type: 'reset'
            }),
        update (payload, value) {
            switch(typeof payload){
                case 'number':
                case 'string':
                    return _ctaCallback({
                        payload: {
                            [payload]: value
                        },
                        type: 'update'
                    });
                default:
                    return _ctaCallback({
                        payload: payload,
                        type: 'update'
                    });
            }
        },
        updateInitial: (payload)=>_ctaCallback({
                payload: payload,
                type: 'updateInitial'
            })
    };
    if (actions == null || typeof actions !== 'object') return [
        state,
        _ctaCallback
    ];
    const defaultCTARecord = _ctaCallback.cta;
    let hasCustomAction = false;
    const customActions = {};
    for(const type in actions){
        if (type in defaultCTARecord || typeof actions[type] !== 'function') continue;
        customActions[type] = (payload, ...args)=>_ctaCallback({
                payload: payload,
                type: type,
                args: args
            });
        hasCustomAction = true;
    }
    if (hasCustomAction) Object.assign(_ctaCallback.cta, customActions);
    return [
        state,
        _ctaCallback
    ];
}


export {$805e16138c5c87b4$export$f9d5111f4ab455f8 as ctaCallback};
//# sourceMappingURL=ctaCallback.9cc35201.js.map
