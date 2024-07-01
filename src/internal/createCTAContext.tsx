import React, { createContext, useContext, } from 'react';
import { useCTA, } from '../index';
import type { CTAInitial, } from '../types/CTAInitial';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnTypeDispatch, } from '../types/UseCTAReturnTypeDispatch';

/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 * @param contextParams
 */
export function createCTAContext<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
>( contextParams: UseCTAParameter<Initial, Actions>, ) {
	const CTAContextState = createContext( contextParams.initial, );
	const CTAContextDispatch = createContext<UseCTAReturnTypeDispatch<Initial, Actions> | null>( null, );

	return {
		CTAProvider( props: React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'onInit'>>>, ) {
			const {
				initial = contextParams.initial,
				onInit = contextParams.onInit,
			} = props;
			const [
				state,
				dispatcher,
			] = useCTA( {
				initial,
				onInit,
				actions: contextParams.actions,
			}, );
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
			const ctaDispatchContext = useContext( CTAContextDispatch, );
			if ( ctaDispatchContext == null ) {
				console.error( 'useCTADispatchContext was called outside it\'s Provider', );
				return ctaDispatchContext satisfies null;
			}

			return ctaDispatchContext satisfies UseCTAReturnTypeDispatch<Initial, Actions>;
		},
	};
}
