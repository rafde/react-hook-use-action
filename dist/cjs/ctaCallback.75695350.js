var $56455aab2d865ec7$exports = require("./compareCallback.3bdf13a2.js");
var $d1a0eb9e2dbe8803$exports = require("./ctaReducer.820a236d.js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ctaCallback", () => $ee907cda9f5a0d85$export$f9d5111f4ab455f8);


function $ee907cda9f5a0d85$export$f9d5111f4ab455f8(useCTAParameter) {
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
    const compare = (0, $56455aab2d865ec7$exports.compareCallback)(useCTAParameter.compare);
    function _ctaCallback(nextCTAProps) {
        const newCtaReducerState = (0, $d1a0eb9e2dbe8803$exports.default)({
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


//# sourceMappingURL=ctaCallback.75695350.js.map
