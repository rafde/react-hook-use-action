import React, { createContext, useContext, } from 'react';
import { useCTA, UseCTAReturnType, } from '../index';
import type { CTAInitial, } from '../types/CTAInitial';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';

/**
 * @link https://react.dev/reference/react/useContext#updating-data-passed-via-context
 * @param contextParams
 */
export function createCTAContext<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
>( contextParams: UseCTAParameter<Initial, Actions>, ) {
	const CTAContextState = createContext( contextParams.initial, );
	const CTAContextDispatch = createContext<null | UseCTAReturnType<Initial, Actions>[1]>( null, );

	return {
		CTAProvider( props: React.PropsWithChildren, ) {
			const [
				state,
				dispatcher,
			] = useCTA( contextParams, );
			return <CTAContextState.Provider value={state}>
				<CTAContextDispatch.Provider value={dispatcher}>
					{props.children}
				</CTAContextDispatch.Provider>
			</CTAContextState.Provider>;
		},
		useCTAStateContext() {
			return useContext( CTAContextState, );
		},
		useCTADispatchContext() {
			return useContext( CTAContextDispatch, );
		},
	};
}
