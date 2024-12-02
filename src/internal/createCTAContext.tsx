import React, { createContext, useContext, } from 'react';
import type { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { useCTA, } from './useCTA';

/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 */
export function createCTAContext<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>( contextParams: UseCTAParameter<Initial, Actions>, ) {
	const CTAContextState = createContext<UseCTAReturnType<Initial, Actions>[0]>( {
		changes: null,
		current: contextParams.initial,
		initial: contextParams.initial,
		previous: null,
		previousInitial: null,
	}, );
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
				compare: contextParams.compare,
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
