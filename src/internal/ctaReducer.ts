import { strictDeepEqual, } from 'fast-equals';

import type { CTAInitial, } from '../types/CTAInitial';
import type { CTAParam, } from '../types/CTAParam';
import type { DispatchCTA, UseCTAReturnTypeDispatchState, } from '../types/UseCTAReturnTypeDispatch';

function _resetCurrentChangesMap<Initial extends CTAInitial>(
	state: Initial,
	initial: CTAReducerState<Initial>['initial'],
	changesMap: CTAReducerState<Initial>['changesMap'],
) {
	const checkedKeys: Record<string, boolean> = {};
	changesMap.clear();

	for ( const key in state ) {
		const value = state[ key ];
		checkedKeys[ key ] = true;

		if ( strictDeepEqual( initial[ key ], value, ) ) {
			changesMap.delete( key, );
			continue;
		}
		changesMap.set( key , value, );
	}

	for ( const key in initial ) {
		if ( checkedKeys[ key ] ) {
			continue;
		}
		const value = initial[ key ];
		changesMap.set( key, value, );
	}
}

function _replace<Initial extends CTAInitial>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_resetCurrentChangesMap( payload, ctaReducerState.initial, changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: payload,
		previous: ctaReducerState.current,
	};
}

function _replaceInitial<Initial extends CTAInitial>(
	ctaReducerState: CTAReducerState<Initial>,
	initial: Initial,
): CTAReducerState<Initial> {
	const {
		changesMap,
	} = ctaReducerState;
	_resetCurrentChangesMap( ctaReducerState.current, initial, ctaReducerState.changesMap, );

	return {
		...ctaReducerState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		initial,
	};
}

function _update<Initial extends CTAInitial>(
	ctaReducerState: CTAReducerState<Initial>,
	payload: Partial<Initial>,
): CTAReducerState<Initial> {
	const current: Record<string, unknown> = {};
	let hasUpdates = false;
	const {
		current: previous,
		...rest
	} = ctaReducerState;
	const {
		initial,
		changesMap,
	} = ctaReducerState;

	for ( const key in payload ) {
		const value = payload[ key ];
		if ( strictDeepEqual( previous[ key as keyof Initial ], value, ) ) {
			continue;
		}

		current[ key ] = value;
		hasUpdates = true;

		if ( strictDeepEqual( initial[ key as keyof Initial ], value, ) ) {
			changesMap.delete( key, );
		} else {
			changesMap.set( key, value, );
		}
	}

	if ( !hasUpdates ) {
		return ctaReducerState;
	}

	return {
		...rest,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Initial>> : null,
		current: {
			...previous,
			...payload,
		},
		previous,
	};
}

export type CTAReducerState<Initial extends CTAInitial> = UseCTAReturnTypeDispatchState<Initial> & {
	changesMap: Map<string | number, unknown>,
}

export default function ctaReducer<
	Initial extends CTAInitial,
	Actions = undefined
>( params: {
	ctaReducerState: CTAReducerState<Initial>,
	actions?: Actions,
	nextCTAProps: Parameters<DispatchCTA<Initial, Actions>>[0],
}, ): CTAReducerState<Initial> {
	const {
		type,
		payload,
	} = params.nextCTAProps;
	const {
		ctaReducerState,
		actions,
	} = params;
	const {
		changesMap,
		current,
		initial,
	} = ctaReducerState;
	// This can be a custom or overridden action
	const cta = actions?.[ type as keyof typeof actions ];
	const isAction = typeof cta === 'function';

	const ctaParam: CTAParam<Initial> = {
		changes: ctaReducerState.changes,
		initial,
		previous: ctaReducerState.previous,
	};
	let next = payload;

	if ( type === 'reset' && !payload ) {
		changesMap.clear();

		if ( !isAction ) {
			return {
				...ctaReducerState,
				changes: null,
				current: initial,
				previous: current,
			};
		}

		next = cta(
			ctaParam,
		);

		if ( typeof next === 'undefined' ) {
			return ctaReducerState;
		}

		return {
			...ctaReducerState,
			changes: null,
			current: next as Initial,
			previous: current,
		};
	}

	if ( payload instanceof Function ) {
		next = payload(
			ctaParam,
		);

		if ( typeof next === 'undefined' ) {
			return ctaReducerState;
		}
	}

	if ( isAction ) {
		next = cta(
			ctaParam,
			next,
		);
	}

	if ( next && typeof next === 'object' ) {
		if ( type === 'reset' ) {
			changesMap.clear();
			return {
				changesMap,
				changes: null,
				initial: next as Initial,
				current: next as Initial,
				previous: current,
			};
		}

		if ( type === 'replace' ) {
			return _replace(
				ctaReducerState,
				next as Initial,
			);
		}

		if ( type === 'replaceInitial' ) {
			return _replaceInitial(
				ctaReducerState,
				next as Initial,
			);
		}

		if ( type === 'update' || isAction ) {
			return _update(
				ctaReducerState,
				next,
			);
		}
	}

	return ctaReducerState;
}
