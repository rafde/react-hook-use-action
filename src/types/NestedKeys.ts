// worst case, consider https://github.com/sindresorhus/type-fest/blob/main/source/paths.d.ts

type IsPlainObject<T,> = T extends Record<string | number | symbol, unknown>
	? T extends Array<unknown>
		? false
		: T extends Date
			? false
			: T extends Set<unknown>
				? false
				: T extends Map<unknown, unknown>
					? false
					// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
					: T extends Function
						? false
						: T extends RegExp
							? false
							: true
	: false;

type EscapeDots<S extends string,> = S extends `${infer F}.${infer R}`
	? `${F}\\.${EscapeDots<R>}`
	: S;

export type NestedKeys<T,> = T extends Record<string | number | symbol, unknown>
	? {
		[K in keyof T & string]: IsPlainObject<T[K]> extends true
			? K extends `${string}.${string}`
				? EscapeDots<K> | `${EscapeDots<K>}.${NestedKeys<T[K]>}`
				: K | `${K}.${NestedKeys<T[K]>}`
			: K extends `${string}.${string}`
				? EscapeDots<K>
				: K;
	}[keyof T & string]
	: never;
