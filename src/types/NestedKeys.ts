// if this doesn't work consider https://github.com/sindresorhus/type-fest/blob/main/source/paths.d.ts

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

type IsArray<T,> = T extends Array<infer U> ? U : never;

type EscapeDots<S extends ( string | number ),> = S extends `${infer F}.${infer R}`
	? `${F}\\.${EscapeDots<R>}`
	: S;

type ArrayKey<K extends string | number, T,> =
	| K
	| `${K}.${number}`
	| `${K}.${number}.${NestedKeys<IsArray<T>>}`;

export type NestedKeys<T,> = T extends Record<string | number | symbol, unknown>
	? {
		[K in keyof T & ( string | number )]: IsArray<T[K]> extends never
			? IsPlainObject<T[K]> extends true
				? K extends `${string | number}.${string | number}`
					? EscapeDots<K> | `${EscapeDots<K>}.${NestedKeys<T[K]>}`
					: K | `${K}.${NestedKeys<T[K]>}`
				: K extends `${string | number}.${string | number}`
					? EscapeDots<K>
					: K
			: ArrayKey<K & string, T[K]>;
	}[keyof T & ( string | number )]
	: never;
