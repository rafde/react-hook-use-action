import React, { createContext, useContext, } from 'react';
import { useCTA, UseCTAReturnType, } from '../index';
import type { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';

/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 */
export function createCTAContext<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>( contextParams: UseCTAParameter<Initial, Actions>, ) {
	const CTAContextState = createContext( contextParams.initial, );
	const CTAContextDispatch = createContext<UseCTAReturnType<Initial, ActionsRecord>[1] | null>( null, );

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
				<CTAContextDispatch.Provider value={dispatcher as unknown as UseCTAReturnType<Initial, ActionsRecord>[1]}>
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

			return ctaDispatchContext satisfies UseCTAReturnType<Initial, ActionsRecord>[1];
		},
	};
}
