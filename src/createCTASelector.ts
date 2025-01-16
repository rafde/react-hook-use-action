import { strictDeepEqual, } from 'fast-equals';
import { useCallback, useRef, useSyncExternalStore, } from 'react';
import createCTABase from './internal/createCTABase';

import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CreateCTASelectorProps, } from './types/CreateCTASelectorProps';
import type {
	UseCTASelector,
	CTASelector,
} from './types/UseCTASelector';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type {
	UseCTAParameterCreateFunc,
	UseCTAParameterCreateFuncReturnRecord,
} from './types/UseCTAParameterCreateFunc';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './types/CTAHistory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterAfterActionChange, } from './types/UseCTAParameterAfterActionChange';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterTransform, } from './types/UseCTAParameterTransform';

/**
 * Creates a selector hook for managing state with CTA (Call To Action) pattern
 *
 * @template {CTAState} Initial - The type of the initial state object extending CTAState
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions - Optional record of action functions extending UseCTAParameterActionsRecordProp
 * @template GR - Record of getter functions that return values
 * @template ActionsRecord - Derived type for actions, either default or provided actions
 *
 * @param {CreateCTASelectorProps} props - Configuration object for the selector
 *
 * @param {CTAState} props.initial - Initial {@link CTAState} `object` for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare}
 * - comparison `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [props.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param {UseCTAParameterCreateFunc} [createFunc] - Optional {@link UseCTAParameterCreateFunc}
 * - A `function` callback that receives {@link UseCTAReturnTypeDispatch} and expects an object Record of `function`s to be returned.
 * - @see {@link https://rafde.github.io/react-hook-use-cta/##use-cta-parameter-create-func Params: createFunc}
 *
 * @param {UseCTAReturnTypeDispatch} createFunc.dispatch - The parameter passed to {@link UseCTAParameterCreateFunc}
 * - @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 *
 * @returns A {@link UseCTASelector} selector hook that provides access to dispatch, gets, current, previous, changes, initial, and previousInitial
 *
 * @example
 * const useMySelector = createCTASelector({
 *   initial: { count: 0 },
 *   actions: {
 *     increment: (state) => ({ count: state.current.count + 1 })
 *   }
 * });
 *
 * useMySelector.dispatch.cta.increment();
 *
 * export default function MyView() {
 *   const count = useMySelector(({current}) => current.count);
 *   const increment = useMySelector(({dispatch}) => dispatch.cta.increment);
 *
  *  return <button onClick={increment}>{count}</div>;
 * }
 */
export function createCTASelector<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never,
>(
	props: CreateCTASelectorProps<Initial, ActionsRecord>,
	createFunc: UseCTAParameterCreateFunc<Initial, ActionsRecord, FR, void> = () => ( {} as FR ),
): UseCTASelector<Initial, ActionsRecord, FR> {
	const ctaReducerResults = createCTABase(
		{
			...props,
			onStateChange: ( newHistory, ) => {
				history = newHistory;
				snapshot = {
					...newHistory,
					dispatch,
				};
				listeners.forEach( listener => listener( snapshot, ), );
			},
		},
		createFunc,
	);
	let { history, } = ctaReducerResults;
	const { dispatch, } = ctaReducerResults;
	const initialSnapshot = {
		...history,
		dispatch,
	};
	let snapshot = initialSnapshot;

	function getHistory() {
		return dispatch.history;
	}

	type Selector = CTASelector<Initial, ActionsRecord, FR>;
	const listeners = new Set<Selector>();
	function subscribe( listener: Selector, ) {
		listeners.add( listener, );
		return () => {
			listeners.delete( listener, );
		};
	}

	const defaultSelector: CTASelector<Initial, ActionsRecord, FR, UseCTAReturnType<Initial, ActionsRecord, FR, void>> = ( { dispatch, ...history }, ) => [
		history,
		dispatch,
	];

	function useCTASelector<
		Selector extends CTASelector<Initial, ActionsRecord, FR> = typeof defaultSelector,
	>( _selector?: Selector, ) {
		const selector = typeof _selector === 'function' ? _selector : defaultSelector;
		const resultRef = useRef( null as ReturnType<typeof selector>, );
		const selectorCallback = useCallback(
			( snapshot: typeof initialSnapshot, ) => {
				const result = selector( snapshot, );
				if ( !strictDeepEqual( resultRef.current, result, ) ) {
					resultRef.current = result as ReturnType<typeof selector>;
				}
				return resultRef.current;
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[],
		);
		// @see {@link https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js}
		return useSyncExternalStore<ReturnType<typeof selector>>(
			subscribe,
			() => selectorCallback( snapshot, ),
			() => selectorCallback( initialSnapshot, ),
		);
	}
	return Object.assign(
		useCTASelector as UseCTASelector<Initial, ActionsRecord, FR>,
		{
			dispatch,
			getHistory,
		},
	);
}
