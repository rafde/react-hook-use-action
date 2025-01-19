import getTargetCloneFromWeakMap from './getTargetCloneFromWeakMap';
import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';

export default function createCTAHistoryProxy<
	Initial extends CTAState,
>( ctaHistory: CTAHistory<Initial>, ) {
	const weakMap = new WeakMap();
	return new Proxy(
		ctaHistory, {
			get( target, key: keyof typeof ctaHistory, ) {
				return getTargetCloneFromWeakMap( target, key, weakMap, );
			},
			set() {
				return false;
			},
		},
	);
}
