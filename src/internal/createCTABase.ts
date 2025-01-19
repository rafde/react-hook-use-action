import compareCallback from './compareCallback';
import createDispatchInterface from './createDispatchInterface';
import createCTAHistory from './createCTAHistory';
import ctaReducer from './ctaReducer';

import type { CTAReducerState, } from 'src/types/CTAReducerState';
import type { UseCTAParameterAfterActionChange, } from '../types/UseCTAParameterAfterActionChange';
import type { UseCTAParameterCompare, } from '../types/UseCTAParameterCompare';
import type {
	UseCTAParameterCreateFunc,
	UseCTAParameterCreateFuncReturnRecord,
} from '../types/UseCTAParameterCreateFunc';
import type { UseCTAParameterTransform, } from '../types/UseCTAParameterTransform';
import type { CTAState, } from '../types/CTAState';
import type { CTAHistory, } from '../types/CTAHistory';

const _afterActionChange = () => undefined;

export default function createCTABase<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
	ReturnType,
>(
	params: {
		initial: Initial
		actions?: Actions
		compare?: UseCTAParameterCompare<Initial>
		transform?: UseCTAParameterTransform<Initial>
		afterActionChange?: UseCTAParameterAfterActionChange<Initial>
		onStateChange?: ( history: CTAHistory<Initial>, ctaReducerState: CTAReducerState<Initial> ) => ReturnType
	},
	createFunc: UseCTAParameterCreateFunc<Initial, Actions, FR, ReturnType>,
) {
	const {
		initial,
		onStateChange = history => history,
		afterActionChange = _afterActionChange,
	} = params;
	const actions = typeof params.actions === 'undefined'
		? undefined
		: {
			...params.actions,
		};
	let history = createCTAHistory( { initial, }, );
	let ctaReducerState: CTAReducerState<Initial> = {
		...history,
		actionType: '' as 'update',
		customAction: undefined,
		changesMap: new Map(),
	};
	const compare = compareCallback( params.compare, );

	const dispatch = createDispatchInterface(
		function ctaBaseCallback( nextCTAProps, ) {
			const next = ctaReducer( {
				actions,
				compare,
				ctaReducerState,
				nextCTAProps,
				transform: params.transform,
			}, );

			if ( next === ctaReducerState ) {
				return onStateChange( history, ctaReducerState, ) as ReturnType;
			}

			ctaReducerState = next;
			history = createCTAHistory( next, );
			dispatch.history = history;
			afterActionChange( history, ctaReducerState.actionType, ctaReducerState.customAction, );

			return onStateChange( history, ctaReducerState, ) as ReturnType;
		},
		history,
		createFunc,
		actions,
	);

	return {
		history,
		dispatch,
	};
}
