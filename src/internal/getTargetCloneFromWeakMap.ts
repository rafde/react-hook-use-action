import getCallbackValueFromWeakMap from './getCallbackValueFromWeakMap';

export default function getTargetCloneFromWeakMap<
	T,
	Key extends keyof T,
>(
	target: T,
	key: Key,
	weakMap: WeakMap<WeakKey, T[Key]>,
) {
	const targetValue = target[ key ];
	if ( !targetValue ) {
		return targetValue;
	}
	return getCallbackValueFromWeakMap( weakMap, targetValue, () => structuredClone( targetValue, ), );
}
