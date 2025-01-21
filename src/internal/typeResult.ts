import type { BuiltInActions, } from '../types/BuiltInActions';
import type { CTAReducerState, } from '../types/CTAReducerState';
import type { CTAState, } from '../types/CTAState';
import type { UseCTAParameterTransform, } from '../types/UseCTAParameterTransform';
import type { CompareCallbackReturnType, } from './compareCallback';

import { ActionType, } from './ActionTypes';
import builtInActions from './builtInActions';
import deepObjectMerge from './deepObjectMerge';
import isPlainObject from './isPlainObject';

function _replace<Initial extends CTAState, >(
	prop: {
		payload: Initial
		a: Initial
		b: Initial
		compare: CompareCallbackReturnType<Initial>
		useBValue?: boolean
	},
) {
	const {
		a,
		b,
		compare,
		payload,
		useBValue,
	} = prop;
	const changesMap = new Map();
	let hasChange = false;
	for ( const key in payload ) {
		const value = payload[ key ];

		if ( !compare( a[ key ], value, key as never, ) ) {
			hasChange = true;
			if ( !compare( b[ key ], value, key as never, ) ) {
				changesMap.set( key, useBValue ? b[ key ] : value, );
			}
		}
	}

	if ( !hasChange ) {
		return;
	}
	return changesMap;
}

type ReplaceState<Initial extends CTAState, > = {
	actionType: BuiltInActions
	compare: CompareCallbackReturnType<Initial>
	ctaReducerState: CTAReducerState<Initial>
	customAction?: string | number
	payload: Initial
};

function _replaceCurrent<Initial extends CTAState, >(
	{ actionType, compare, ctaReducerState, customAction, payload, }: ReplaceState<Initial>,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = _replace( {
		a: current,
		b: initial,
		compare,
		payload,
	}, );

	if ( !changesMap ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: payload,
		previous: ctaReducerState.current,
	};
}

function _replaceInitial<Initial extends CTAState, >(
	{ actionType, compare, ctaReducerState, customAction, payload, }: ReplaceState<Initial>,
): CTAReducerState<Initial> {
	const {
		initial,
		current,
	} = ctaReducerState;
	const changesMap = _replace( {
		a: initial,
		b: current,
		compare,
		payload,
		useBValue: true,
	}, );

	if ( !changesMap ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		previousInitial: initial,
		initial: payload,
	};
}

function _resetState<Initial extends CTAState, >(
	{ actionType, compare, ctaReducerState, customAction, payload, }: ReplaceState<Initial>,
) {
	const {
		current,
		initial,
	} = ctaReducerState;

	let isNextSameAsInitial = true;
	let isNextSameAsCurrent = true;
	for ( const key in payload ) {
		const value = payload[ key as keyof Initial ];

		if ( !compare( initial[ key as keyof Initial ], value, key as never, ) ) {
			isNextSameAsInitial = false;
		}

		if ( !compare( current[ key as keyof Initial ], value, key as never, ) ) {
			isNextSameAsCurrent = false;
		}

		if ( !isNextSameAsInitial && !isNextSameAsCurrent ) {
			break;
		}
	}

	if ( isNextSameAsInitial && isNextSameAsCurrent ) {
		return ctaReducerState;
	}

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap: new Map(),
		changes: null,
		initial: payload as Initial,
		current: payload as Initial,
		previous: current,
		previousInitial: isNextSameAsInitial ? null : initial,
	};
}

function _update<Initial extends CTAState, >(
	prop: {
		a: Initial
		b: Initial
		changesMap: CTAReducerState<Initial>['changesMap']
		compare: CompareCallbackReturnType<Initial>
		deep?: boolean
		payload: Initial
		useCompareValue?: boolean
	},
) {
	const {
		a,
		b,
		compare,
		deep,
		payload,
		useCompareValue,
	} = prop;
	let hasChange = false;
	const next: Record<string, unknown> = {};
	const changesMap = new Map( prop.changesMap, );

	for ( const payloadKey in payload ) {
		let payloadValue = payload[ payloadKey ];
		const aValue = a[ payloadKey as keyof Initial ];
		if ( deep && isPlainObject( payloadValue, ) && isPlainObject( aValue, ) ) {
			const mergedValues = deepObjectMerge(
				aValue,
				payloadValue,
				compare as CompareCallbackReturnType,
				payloadKey,
			);
			if ( mergedValues == null ) {
				continue;
			}
			payloadValue = mergedValues;
		}
		else if ( compare( a[ payloadKey as keyof Initial ], payloadValue, payloadKey as never, ) ) {
			continue;
		}

		next[ payloadKey ] = payloadValue;
		hasChange = true;

		const compareValue = b[ payloadKey as keyof Initial ];
		if ( compare( compareValue, payloadValue, payloadKey as never, ) ) {
			changesMap.delete( payloadKey, );
		}
		else {
			changesMap.set( payloadKey, useCompareValue ? b[ payloadKey ] : payloadValue, );
		}
	}

	if ( !hasChange ) {
		return;
	}

	return {
		next,
		changesMap,
	};
}

type UpdateState<Initial extends CTAState, > = {
	actionType: BuiltInActions
	compare: CompareCallbackReturnType<Partial<Initial>>
	ctaReducerState: CTAReducerState<Initial>
	customAction?: string | number
	deep?: boolean
	payload: Partial<Initial>
};

function _updateInitial<Initial extends CTAState, >(
	{ actionType, compare, ctaReducerState, customAction, payload, deep, }: UpdateState<Initial>,
): CTAReducerState<Initial> {
	const {
		current,
		initial,
	} = ctaReducerState;
	const nextUpdate = _update( {
		a: initial,
		b: current,
		changesMap: ctaReducerState.changesMap,
		compare,
		payload,
		useCompareValue: true,
		deep,
	}, );

	if ( !nextUpdate ) {
		return ctaReducerState;
	}
	const {
		next,
		changesMap,
	} = nextUpdate;

	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial: {
			...initial,
			...next,
		},
		previousInitial: initial,
	};
}

function _updateCurrent<Initial extends CTAState, >(
	{ actionType, compare, ctaReducerState, customAction, payload, deep, }: UpdateState<Initial>,
): CTAReducerState<Initial> {
	const {
		current,
		initial,
	} = ctaReducerState;
	const nextUpdate = _update( {
		a: current,
		b: initial,
		changesMap: ctaReducerState.changesMap,
		compare,
		payload,
		deep,
	}, );

	if ( !nextUpdate ) {
		return ctaReducerState;
	}

	const {
		next,
		changesMap,
	} = nextUpdate;
	return {
		...ctaReducerState,
		actionType,
		customAction,
		changesMap,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: {
			...current,
			...next,
		},
		previous: current,
	};
}

export default function typeResult<
	Initial extends CTAState,
	Type extends BuiltInActions,
	Next = Type extends 'update' | 'updateInitial' ? Partial<Initial> : Initial,
>(
	param: {
		action?: string | number
		compare: CompareCallbackReturnType<Initial>
		ctaReducerState: CTAReducerState<Initial>
		next: Next
		transform: UseCTAParameterTransform<Initial>
		type: Type
	},
) {
	const {
		next,
		ctaReducerState,
	} = param;

	if ( next == null || Array.isArray( next, ) || next instanceof ActionType ) {
		return ctaReducerState;
	}

	const {
		type,
		compare,
		action,
	} = param;

	const transformedNext = param.transform(
		next,
		{
			changes: ctaReducerState.changes,
			current: ctaReducerState.current,
			initial: ctaReducerState.initial,
			previous: ctaReducerState.previous,
			previousInitial: ctaReducerState.previousInitial,
			actionType: type,
			customAction: action as string | number,
		},
	);

	if ( transformedNext == null ) {
		return ctaReducerState;
	}

	let result;

	switch ( type ) {
		case builtInActions.replace:
			result = _replaceCurrent( {
				actionType: type,
				compare,
				ctaReducerState,
				customAction: action,
				payload: transformedNext as Initial,
			}, );
			break;
		case builtInActions.replaceInitial:
			result = _replaceInitial( {
				actionType: type,
				compare,
				ctaReducerState,
				customAction: action,
				payload: transformedNext as Initial,
			}, );
			break;
		case builtInActions.reset:
			result = _resetState( {
				actionType: type,
				compare,
				ctaReducerState,
				customAction: action,
				payload: transformedNext as Initial,
			}, );
			break;
		case builtInActions.updateInitial:
			result = _updateInitial( {
				actionType: type,
				compare: compare as CompareCallbackReturnType<Partial<Initial>>,
				ctaReducerState,
				customAction: action,
				payload: transformedNext as Partial<Initial>,
			}, );
			break;
		case builtInActions.deepUpdateInitial:
			result = _updateInitial( {
				actionType: type,
				compare: compare as CompareCallbackReturnType<Partial<Initial>>,
				ctaReducerState,
				customAction: action,
				deep: true,
				payload: transformedNext as Partial<Initial>,
			}, );
			break;
		case builtInActions.deepUpdate:
			result = _updateCurrent( {
				actionType: type,
				compare: compare as CompareCallbackReturnType<Partial<Initial>>,
				ctaReducerState,
				customAction: action,
				deep: true,
				payload: transformedNext as Partial<Initial>,
			}, );
			break;
		default:
			result = _updateCurrent( {
				actionType: type,
				compare: compare as CompareCallbackReturnType<Partial<Initial>>,
				ctaReducerState,
				customAction: action,
				payload: transformedNext as Partial<Initial>,
			}, );
			break;
	}

	return result;
}
