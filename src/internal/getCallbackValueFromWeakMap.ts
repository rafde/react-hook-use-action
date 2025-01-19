export default function getCallbackValueFromWeakMap<
	T,
	Create extends () => T,
>( weakMap: WeakMap<WeakKey, T>, key: WeakKey, create: Create, ): T {
	if ( weakMap.has( key, ) ) {
		return weakMap.get( key, )!;
	}
	const value = create();
	weakMap.set( key, value, );
	return value;
}
