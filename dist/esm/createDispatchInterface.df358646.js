function $ddb1abc523767a90$export$af9ac7063a513c32(dispatch, actions) {
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
    const dispatchWrapper = Object.assign((value)=>dispatch(value), {
        cta: cta
    });
    if (actions && typeof actions === 'object') {
        const customActions = {};
        for(const type in actions)if (!(type in cta) && typeof actions[type] === 'function') customActions[type] = (payload, ...args)=>dispatch({
                payload: payload,
                type: type,
                args: args
            });
        Object.assign(dispatchWrapper.cta, customActions);
    }
    return dispatchWrapper;
}


export {$ddb1abc523767a90$export$af9ac7063a513c32 as createDispatchInterface};
//# sourceMappingURL=createDispatchInterface.df358646.js.map
