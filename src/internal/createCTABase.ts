import { UseCTAParameterAfterActionChange, } from '../types/UseCTAParameterAfterActionChange';
import { UseCTAParameterCompare, } from '../types/UseCTAParameterCompare';
import { UseCTAParameterTransform, } from '../types/UseCTAParameterTransform';
import compareCallback from './compareCallback';
import createDispatchInterface from './createDispatchInterface';
import createCTAHistory from './createCTAHistory';
import ctaReducer, { type CTAReducerState, } from './ctaReducer';
import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';

export default function createCTABase<
	Initial extends CTAState,
	Actions,
	ReturnType = CTAHistory<Initial>,
>(
	params: {
		initial: Initial
		actions?: Actions
		compare?: UseCTAParameterCompare<Initial>
		transform?: UseCTAParameterTransform<Initial>
		afterActionChange?: UseCTAParameterAfterActionChange<Initial>
		onStateChange?: ( history: CTAHistory<Initial>, ctaReducerState: CTAReducerState<Initial> ) => ReturnType
	},
) {
	const {
		initial,
		onStateChange = history => history,
	} = params;
	const actions = typeof params.actions === 'undefined'
		? undefined
		: {
			...params.actions,
		};
	let history: CTAHistory<Initial> = createCTAHistory( { current: initial, }, );
	let ctaReducerState: CTAReducerState<Initial> = {
		...history,
		actionType: '' as 'update',
		customAction: undefined,
		changesMap: new Map(),
	};
	const compare = compareCallback( params.compare, );

	const dispatch = createDispatchInterface<Initial, Actions, ReturnType>(
		function ctaBaseCallback( nextCTAProps, ) {
			const next = ctaReducer<Initial, Actions>( {
				actions,
				compare,
				ctaReducerState,
				nextCTAProps,
				transform: params.transform,
			}, );

			if ( next === ctaReducerState ) {
				return onStateChange?.( history, ctaReducerState, ) as ReturnType;
			}

			ctaReducerState = next;
			history = createCTAHistory( next, );
			dispatch.history = history;
			params.afterActionChange?.( history, ctaReducerState.actionType, ctaReducerState.customAction, );

			return onStateChange?.( history, ctaReducerState, ) as ReturnType;
		},
		actions,
		history,
	);

	return {
		history,
		dispatch,
	};
}
