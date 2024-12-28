import { createContext, useContext, createElement, } from 'react';
import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CreateCTAContextReturn, } from './types/CreateCTAContextReturn';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsOptionalRecordProp, } from './types/UseCTAParameterActionsOptionalRecordProp';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './types/CTAHistory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './types/UseCTAParameterOnInit';

import { useCTA, } from './useCTA';

/**
 * A `function` that returns a React Context to use with {@link useCTA}
 * for managing {@link CTAHistory state history} and {@link UseCTAReturnTypeDispatch dispatch} in a `CTAProvider`.
 *
 * This handles the boilerplate of creating a React Context and Provider.
 * @see {@link https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file}
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsOptionalRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} contextParams - {@link UseCTAParameter} parameter.
 *
 * @param {CTAState} contextParams.initial - initial {@link CTAState}.
 *
 * @param {UseCTAParameterOnInit<Initial>} [contextParams.onInit]
 * - {@link UseCTAParameterOnInit} `function` that runs once on component mount.
 *
 * @param {UseCTAParameterCompare<Initial>} [contextParams.compare]
 * - {@link UseCTAParameterCompare} `function` that compares the previous and current state.
 *
 * @param {UseCTAParameterActionsOptionalRecordProp<Initial> | undefined} [contextParams.actions]
 * - {@link UseCTAParameterActionsOptionalRecordProp} `object` type to define custom and/or overridden actions for state management.
 *
 * @returns type {@link CreateCTAContextReturn} object.
 */
export function createCTAContext<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsOptionalRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>( contextParams: UseCTAParameter<Initial, Actions>, ): CreateCTAContextReturn<Initial, ActionsRecord> {
	const CTAContextHistory = createContext<UseCTAReturnType<Initial, Actions>[0]>( {
		changes: null,
		current: contextParams.initial,
		initial: contextParams.initial,
		previous: null,
		previousInitial: null,
	}, );
	const CTAContextDispatch = createContext<UseCTAReturnType<Initial, ActionsRecord>[1] | null>( null, );

	return {
		CTAProvider( props, ) {
			const {
				initial = contextParams.initial,
				onInit = contextParams.onInit,
				compare = contextParams.compare,
			} = props;
			const [
				value,
				dispatch,
			] = useCTA( {
				initial,
				onInit,
				actions: contextParams.actions,
				compare,
			}, );

			return createElement( CTAContextHistory.Provider, {
				value,
				children: createElement( CTAContextDispatch.Provider, {
					value: dispatch as unknown as UseCTAReturnType<Initial, ActionsRecord>[1],
					children: props.children,
				}, ),
			}, );
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
