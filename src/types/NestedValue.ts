type UnescapeDots<S extends string | number | symbol,> = S extends `${infer F}\\.${infer R}`
	? `${F}.${UnescapeDots<R>}`
	: S;

export type NestedValue<T, K extends string | number | symbol,> = K extends keyof T
	? T[K]
	: UnescapeDots<K> extends `${infer First}.${infer Rest}`
		? First extends keyof T
			? T[First] extends object
				? NestedValue<T[First], Rest>
				: never
			: never
		: never;
