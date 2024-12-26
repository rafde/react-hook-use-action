import React, { createContext, useContext, } from 'react';
import type { CTAState, } from '../types/CTAState';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import { ActionsRecordProp, UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import { UseCTAReturnType, } from '../types/UseCTAReturnType';
import { useCTA, } from './useCTA';

/**
 * https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
 */
export function createCTAContext<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends Partial<DefaultActionsRecord<Initial>> ? ActionsRecordProp<Initial, Actions> : Actions,
>( contextParams: UseCTAParameter<Initial, Actions>, ): {
	CTAProvider: React.FC<React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'onInit' | 'compare'>>>>
	useCTAHistoryContext: () => UseCTAReturnType<Initial, Actions>[0]
	useCTADispatchContext: () => UseCTAReturnType<Initial, ActionsRecord>[1] | null
} {
	const CTAContextHistory = createContext<UseCTAReturnType<Initial, Actions>[0]>( {
		changes: null,
		current: contextParams.initial,
		initial: contextParams.initial,
		previous: null,
		previousInitial: null,
	}, );
	const CTAContextDispatch = createContext<UseCTAReturnType<Initial, ActionsRecord>[1] | null>( null, );

	return {
		CTAProvider( props: React.PropsWithChildren<Partial<Pick<UseCTAParameter<Initial, Actions>, 'initial' | 'onInit' | 'compare'>>>, ) {
			const {
				initial = contextParams.initial,
				onInit = contextParams.onInit,
				compare = contextParams.compare,
			} = props;
			const [
				state,
				dispatcher,
			] = useCTA( {
				initial,
				onInit,
				actions: contextParams.actions,
				compare,
			}, );
			return <CTAContextHistory.Provider value={state}>
				<CTAContextDispatch.Provider value={dispatcher as unknown as UseCTAReturnType<Initial, ActionsRecord>[1]}>
					{props.children}
				</CTAContextDispatch.Provider>
			</CTAContextHistory.Provider>;
		},
		useCTAHistoryContext() {
			return useContext( CTAContextHistory, );
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
