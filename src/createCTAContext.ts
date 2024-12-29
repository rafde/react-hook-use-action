import { createContext, useContext, createElement, } from 'react';
import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CreateCTAContextReturn, } from './types/CreateCTAContextReturn';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
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
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} contextParams - {@link UseCTAParameter} parameter.
 *
 * @param {UseCTAParameterOnInit} [contextParams.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [contextParams.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [contextParams.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {CreateCTAContextReturn} A {@link CreateCTAContextReturn} object. See {@link https://rafde.github.io/react-hook-use-cta/#create-cta-context-return createCTAContext return value}.
 * Has the following properties:
 * - {@link CreateCTAContextReturn.CTAProvider} - {@link CreateCTAContextReturnCTAProvider} component that requires `children` prop is required.
 * Has options to accept `initial`, `onInit`, and `compare` props.
 * - {@link CreateCTAContextReturn.useCTAHistoryContext} - A hook for returning {@link CTAHistory} from context.
 * - {@link CreateCTAContextReturn.useCTADispatchContext} - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * Returns `null` if called outside the `CTAProvider`.
 *
 * `useCTADispatchContext()?.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 * - `useCTADispatchContext()?.update( Partial<CTAState> )`
 * - `useCTADispatchContext()?.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `useCTADispatchContext()?.update( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `useCTADispatchContext()?.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 * - `useCTADispatchContext()?.replace( CTAState )`
 * - `useCTADispatchContext()?.replace( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `useCTADispatchContext()?.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 * - `useCTADispatchContext()?.reset()` - Resets the `current` state back to the `initial` state.
 * - `useCTADispatchContext()?.reset( CTAState )` - Synchronizes the `current` state with the `initial` state.
 * - `useCTADispatchContext()?.reset( ( CTAHistory<CTAState> ) => CTAState | undefined )` - Synchronizes the `current` state with the `initial` state.
 * `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `useCTADispatchContext()?.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 * - `useCTADispatchContext()?.updateInitial( Partial<CTAState> )`
 * - `useCTADispatchContext()?.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )` - `undefined` prevents triggering action
 * - `useCTADispatchContext()?.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] )`
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `useCTADispatchContext()?.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 * - `useCTADispatchContext()?.replaceInitial( CTAState )`
 * - `useCTADispatchContext()?.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined )` - `undefined` prevents triggering action
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `useCTADispatchContext()?.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 * - `useCTADispatchContext()?.YourCustomAction( ...args )`
 */
export function createCTAContext<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
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
