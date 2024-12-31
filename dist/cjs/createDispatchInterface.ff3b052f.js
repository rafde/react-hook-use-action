
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createDispatchInterface", () => $0b6f0bd6e9d4ab4e$export$af9ac7063a513c32);
function $0b6f0bd6e9d4ab4e$export$af9ac7063a513c32(dispatch, actions) {
    const dispatchWrapper = (value)=>dispatch(value);
    const cta = {
        replace: (payload)=>dispatch({
                payload: payload,
                type: 'replace'
            }),
        replaceInitial: (payload)=>dispatch({
                payload: payload,
                type: 'replaceInitial'
            }),
        reset: (payload)=>dispatch({
                payload: payload,
                type: 'reset'
            }),
        update (payload, value) {
            if (typeof payload === 'number' || typeof payload === 'string') return dispatch({
                payload: {
                    [payload]: value
                },
                type: 'update'
            });
            return dispatch({
                payload: payload,
                type: 'update'
            });
        },
        updateInitial (payload, value) {
            if (typeof payload === 'number' || typeof payload === 'string') return dispatch({
                payload: {
                    [payload]: value
                },
                type: 'updateInitial'
            });
            return dispatch({
                payload: payload,
                type: 'updateInitial'
            });
        }
    };
    const props = {
        cta: cta
    };
    if (actions == null || typeof actions !== 'object') return Object.assign(dispatchWrapper, props);
    const customActions = {};
    for(const type in actions)if (!(type in cta) && typeof actions[type] === 'function') customActions[type] = (payload, ...args)=>dispatch({
            payload: payload,
            type: type,
            args: args
        });
    Object.assign(props.cta, customActions);
    return Object.assign(dispatchWrapper, props);
}


//# sourceMappingURL=createDispatchInterface.ff3b052f.js.map
