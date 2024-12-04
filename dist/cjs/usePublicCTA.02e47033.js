var $h8IZn$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $217ab95d1d983957$export$2e2bcd8739ae039);

function $217ab95d1d983957$var$mergeCustomCTAWithDefaultCTA(dispatch, defaultCTARecord, ctaRecord) {
    let hasCustomAction = false;
    const customActions = {};
    const dispatcher = dispatch;
    for(const type in ctaRecord){
        if (type in defaultCTARecord || typeof ctaRecord[type] !== 'function') continue;
        customActions[type] = (payload, ...args)=>{
            dispatcher({
                type: type,
                payload: payload,
                options: args[0],
                args: args
            });
        };
        hasCustomAction = true;
    }
    if (!hasCustomAction) return defaultCTARecord;
    return Object.assign(defaultCTARecord, customActions);
}
function $217ab95d1d983957$var$wrapPrivateDispatcher(dispatcher, actions) {
    const publicDispatcher = (cta)=>{
        dispatcher(cta);
    };
    const cta = {
        replace (payload) {
            publicDispatcher({
                payload: payload,
                type: 'replace'
            });
        },
        replaceInitial (payload) {
            publicDispatcher({
                payload: payload,
                type: 'replaceInitial'
            });
        },
        reset (payload) {
            publicDispatcher({
                payload: payload,
                type: 'reset'
            });
        },
        update (payload, ...args) {
            switch(typeof payload){
                case 'number':
                case 'string':
                    {
                        const [_payload] = args;
                        publicDispatcher({
                            payload: {
                                [payload]: _payload
                            },
                            type: 'update'
                        });
                        break;
                    }
                default:
                    publicDispatcher({
                        payload: payload,
                        type: 'update'
                    });
                    break;
            }
        },
        updateInitial (payload) {
            publicDispatcher({
                payload: payload,
                type: 'updateInitial'
            });
        }
    };
    if (actions == null || typeof actions !== 'object') return Object.assign(publicDispatcher, {
        cta: cta
    });
    return Object.assign(publicDispatcher, {
        cta: $217ab95d1d983957$var$mergeCustomCTAWithDefaultCTA(publicDispatcher, cta, actions)
    });
}
function $217ab95d1d983957$export$2e2bcd8739ae039(params) {
    const { actions: actions } = params;
    const [ctaState, ctaDispatch] = params.stateDispatcher;
    const augmentedDispatcher = (0, $h8IZn$react.useMemo)(()=>$217ab95d1d983957$var$wrapPrivateDispatcher(ctaDispatch, actions), [
        ctaDispatch,
        actions
    ]);
    return (0, $h8IZn$react.useMemo)(()=>{
        const state = {
            changes: ctaState.changes,
            current: ctaState.current,
            initial: ctaState.initial,
            previous: ctaState.previous,
            previousInitial: ctaState.previousInitial
        };
        const dispatch = Object.assign(augmentedDispatcher, {
            state: state
        });
        return [
            state,
            dispatch
        ];
    }, [
        ctaState,
        augmentedDispatcher
    ]);
}


//# sourceMappingURL=usePublicCTA.02e47033.js.map
