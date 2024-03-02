import { strictDeepEqual, } from 'fast-equals';

import type { CTAInitial, } from '../types/CTAInitial';
import type { CTAParam, } from '../types/CTAParam';
import type { CTATypeRecord, } from '../types/CTATypeRecord';
import type { PrivateCTAState, } from '../types/PrivateCTAState';
import type { NextCTAProps, } from '../types/NextCTAProps';

function _resetCurrentChangesMap<Payload extends CTAInitial>(
	state: Payload,
	initial: Payload,
	changesMap: PrivateCTAState<Payload>['changesMap'],
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

function _replace<Payload extends CTAInitial>(
	privateCTAState: PrivateCTAState<Payload>,
	ctaPayload: Payload,
): PrivateCTAState<Payload> {
	const {
		changesMap,
	} = privateCTAState;
	_resetCurrentChangesMap( ctaPayload, privateCTAState.initial, changesMap, );

	return {
		...privateCTAState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		current: ctaPayload,
		previous: privateCTAState.current,
	};
}

function _replaceInitial<Payload extends CTAInitial>(
	privateCTAState: PrivateCTAState<Payload>,
	initial: Payload,
): PrivateCTAState<Payload> {
	const {
		changesMap,
	} = privateCTAState;
	_resetCurrentChangesMap( privateCTAState.current, initial, privateCTAState.changesMap, );

	return {
		...privateCTAState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		initial,
	};
}

function _update<Payload extends CTAInitial>(
	privateCTAState: PrivateCTAState<Payload>,
	ctaPayload: Partial<Payload>,
): PrivateCTAState<Payload> {
	const current: Record<string, unknown> = {};
	let hasUpdates = false;
	const {
		current: previous,
		...rest
	} = privateCTAState;
	const {
		initial,
		changesMap,
	} = privateCTAState;

	for ( const key in ctaPayload ) {
		const value = ctaPayload[ key ];
		if ( strictDeepEqual( previous[ key as keyof Payload ], value, ) ) {
			continue;
		}

		current[ key ] = value;
		hasUpdates = true;

		if ( strictDeepEqual( initial[ key as keyof Payload ], value, ) ) {
			changesMap.delete( key, );
		} else {
			changesMap.set( key, value, );
		}
	}

	if ( !hasUpdates ) {
		return privateCTAState;
	}

	return {
		...rest,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		current: {
			...previous,
			...ctaPayload,
		},
		previous,
	};
}

export default function ctaReducer<
	Payload extends CTAInitial,
	Actions extends CTATypeRecord<Payload> = undefined
>( params: {
	privateCTAState: PrivateCTAState<Payload>,
	actions?: Actions,
	nextCTAProps: NextCTAProps<Payload, Actions>,
}, ): PrivateCTAState<Payload> {
	const {
		action,
		payload,
	} = params.nextCTAProps;
	const {
		privateCTAState,
		actions,
	} = params;
	const {
		changesMap,
		current,
		initial,
	} = privateCTAState;
	// This can be a custom or overridden action
	const cta = actions?.[ action ];
	const isAction = typeof cta === 'function';
	const ctaParam: CTAParam<Payload> = {
		changes: privateCTAState.changes,
		initial,
		previous: privateCTAState.previous,
	};
	let next = payload;

	if ( action === 'reset' && !payload ) {
		changesMap.clear();

		if ( !isAction ) {
			return {
				...privateCTAState,
				changes: null,
				current: initial,
				previous: current,
			};
		}

		next = cta(
			ctaParam,
			initial,
		);

		if ( typeof next === 'undefined' ) {
			return privateCTAState;
		}

		return {
			...privateCTAState,
			changes: null,
			current: next,
			previous: current,
		};
	}

	if ( typeof payload === 'function' ) {
		next = payload(
			ctaParam,
		);

		if ( typeof next === 'undefined' ) {
			return privateCTAState;
		}
	}

	if ( isAction ) {
		next = cta(
			ctaParam,
			next,
		);
	}

	if ( next && typeof next === 'object' ) {
		if ( action === 'reset' ) {
			changesMap.clear();
			return {
				changesMap,
				changes: null,
				initial: next,
				current: next,
				previous: current,
			};
		}

		if ( action === 'replace' ) {
			return _replace(
				privateCTAState,
				next,
			);
		}

		if ( action === 'replaceInitial' ) {
			return _replaceInitial(
				privateCTAState,
				next,
			);
		}

		if ( action === 'update' || isAction ) {
			return _update(
				privateCTAState,
				next,
			);
		}
	}

	return privateCTAState;
}
