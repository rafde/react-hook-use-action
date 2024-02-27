import { strictDeepEqual, } from 'fast-equals';
import { CTAParams, } from '../types/CTAParams';

import { CTAState, } from '../types/CTAState';
import { CTATypeRecord, } from '../types/CTATypeRecord';
import { NextCTAProps, } from '../types/NextCTAProps';

function _resetCurrentChangesMap<Payload>(
	state: Payload,
	initial: Payload,
	changesMap: CTAState<Payload>['changesMap'],
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

function _replace<Payload>(
	ctaState: CTAState<Payload>,
	ctaPayload: Payload,
): CTAState<Payload> {
	const {
		changesMap,
	} = ctaState;
	_resetCurrentChangesMap( ctaPayload, ctaState.initial, changesMap, );

	return {
		...ctaState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		previous: ctaState.current,
		current: ctaPayload,
	};
}

function _replaceInitial<Payload>(
	ctaState: CTAState<Payload>,
	initial: Payload,
): CTAState<Payload> {
	const {
		changesMap,
	} = ctaState;
	_resetCurrentChangesMap( ctaState.current, initial, ctaState.changesMap, );

	return {
		...ctaState,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		initial,
	};
}

function _update<Payload>(
	ctaState: CTAState<Payload>,
	ctaPayload: Partial<Payload>,
): CTAState<Payload> {
	const current: Record<string, unknown> = {};
	let hasUpdates = false;
	const {
		current: previous,
		...rest
	} = ctaState;
	const {
		initial,
		changesMap,
	} = ctaState;

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
		return ctaState;
	}

	return {
		...rest,
		changes: changesMap.size ? Object.fromEntries( changesMap, ) as Readonly<Partial<Payload>> : null,
		previous,
		current: {
			...previous,
			...ctaPayload,
		},
	};
}

export default function ctaReducer<
	Payload,
	Actions extends CTATypeRecord<Payload> = undefined
>( params: {
	ctaState: CTAState<Payload>,
	actions?: Actions,
	nextCTAProps: NextCTAProps<Payload, Actions>,
}, ): CTAState<Payload> {
	const {
		action,
		payload,
	} = params.nextCTAProps;
	const {
		ctaState,
		actions,
	} = params;
	const {
		changesMap,
		current,
		initial,
	} = ctaState;

	if ( action === 'reset' && !payload ) {
		changesMap.clear();

		return {
			...ctaState,
			changes: null,
			current: initial,
			previous: current,
		};
	}

	const ctaParams: CTAParams<Payload> = {
		changes: ctaState.changes,
		initial,
		previous: ctaState.previous,
	};
	let next = payload;
	if ( typeof payload === 'function' ) {
		next = payload(
			ctaParams,
		);

		if ( typeof next === 'undefined' ) {
			return ctaState;
		}
	}

	// This can be a custom or overridden action
	const cta = actions?.[ action ];
	const isAction = typeof cta === 'function';
	if ( isAction ) {
		next = cta(
			ctaParams,
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
				ctaState,
				next,
			);
		}

		if ( action === 'replaceInitial' ) {
			return _replaceInitial(
				ctaState,
				next,
			);
		}

		if ( action === 'update' || isAction ) {
			return _update(
				ctaState,
				next,
			);
		}
	}

	return ctaState;
}
