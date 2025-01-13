function $ddb1abc523767a90$export$2e2bcd8739ae039(dispatch, history, createFunc, actions) {
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
    const dispatchWrapper = Object.assign(dispatch, {
        cta: cta,
        history: history
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
    return Object.assign(dispatchWrapper, {
        func: createFunc(dispatchWrapper)
    });
}


export {$ddb1abc523767a90$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=createDispatchInterface.4f05f0bd.js.map
