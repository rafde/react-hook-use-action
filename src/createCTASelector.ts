import { useSyncExternalStore, } from 'react';
import compareCallback from './internal/compareCallback';
import createDispatchInterface from './internal/createDispatchInterface';
import createCTAHistory from './internal/createCTAHistory';
import ctaReducer, { type CTAReducerState, } from './internal/ctaReducer';
import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CreateCTASelectorProps, } from './types/CreateCTASelectorProps';
import type { CTAHistory, } from './types/CTAHistory';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

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
 * @param {CreateCTASelectorProps} ctaParameter - Configuration object for the selector
 *
 * @param {CTAState} ctaParameter.initial - Initial {@link CTAState} `object` for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterCompare} [ctaParameter.compare] - Optional {@link UseCTAParameterCompare}
 * - comparison `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterAfterActionChange} [ctaParameter.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange}
 * - `function` than only runs after an action has changed the hook state history.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
 *
 * @param {UseCTAParameterTransform} [ctaParameter.transform] - Optional {@link UseCTAParameterTransform}
 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
 * the result of a custom action or overridden default action.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
 *
 * @param {UseCTAParameterActionsRecordProp} [ctaParameter.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @param getters - Function that returns an object of getter methods
 * - @see {@link https://rafde.github.io/react-hook-use-cta/#create-cta-selector-parameter-getters Params: getters}
 * @param getters.params - Object containing dispatch and getHistory
 * @param getters.param.dispatch - Dispatch interface for triggering actions
 * @param getters.param.getHistory - Function to retrieve current history state
 *
 * @returns A selector hook that provides access to dispatch, gets, current, previous, changes, initial, and previousInitial
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
	GR extends Record<string, ( ...args: never[] ) => unknown >,
	ActionsRecord = Actions extends undefined ? UseCTAParameterActionsOptionalDefaultRecord<Initial> : Actions extends UseCTAParameterActionsRecordProp<Initial> ? ActionsRecordProp<Initial, Actions> : never,
>(
	ctaParameter: CreateCTASelectorProps<Initial, ActionsRecord>,
	getters: (
		( param: {
			dispatch: UseCTAReturnTypeDispatch<Initial, ActionsRecord>
			getHistory: () => CTAHistory<Initial>
		} ) => GR
	) = () => ( {} as GR ),
) {
	const {
		initial,
	} = ctaParameter;
	const actions = typeof ctaParameter.actions === 'undefined'
		? undefined
		: {
			...ctaParameter.actions,
		};
	let history: CTAHistory<Initial> = createCTAHistory( { current: initial, }, );
	let ctaReducerState: CTAReducerState<Initial> = {
		...history,
		actionType: '' as 'update',
		customAction: undefined,
		changesMap: new Map(),
	};
	const compare = compareCallback( ctaParameter.compare, );
	const dispatch = createDispatchInterface<
		Initial,
		ActionsRecord
	>(
		function ctaSelectorState( nextCTAProps, ) {
			const next = ctaReducer<Initial, ActionsRecord>( {
				actions,
				compare,
				ctaReducerState,
				nextCTAProps,
				transform: ctaParameter.transform,
			}, );

			if ( next === ctaReducerState ) {
				return;
			}

			ctaReducerState = next;
			history = createCTAHistory( next, );
			dispatch.history = history;

			snapshot = {
				...history,
				dispatch,
				gets,
			};
			listeners.forEach( listener => listener( snapshot, ), );
			ctaParameter.afterActionChange?.( history, ctaReducerState.actionType, ctaReducerState.customAction, );
		},
		actions,
		history,
	);
	function getHistory() {
		return history;
	}
	const gets = getters( {
		dispatch,
		getHistory,
	}, );
	type Listener<SelectorReturn = unknown,> = ( params: CTAHistory<Initial> & {
		dispatch: typeof dispatch
		gets: typeof gets
	} ) => SelectorReturn;
	// const initialSnapshot = {
	// 	...history,
	// 	dispatch,
	// 	gets,
	// };
	let snapshot = {
		...history,
		dispatch,
		gets,
	};
	const listeners = new Set<Listener>();
	function subscribe( listener: Listener, ) {
		listeners.add( listener, );
		return () => {
			listeners.delete( listener, );
		};
	}

	function useCTASelector<SelectorReturn,>( selector: Listener<SelectorReturn>, ) {
		return useSyncExternalStore(
			subscribe,
			() => selector( snapshot, ),
			// () => selector( initialSnapshot, ),
		);
	}
	return Object.assign(
		useCTASelector,
		{
			dispatch,
			getHistory,
		},
	);
}
