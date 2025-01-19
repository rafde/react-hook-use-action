export type NestedKeyArray<T,> = T extends Record<string | number | symbol, unknown>
	? {
		[K in keyof T & string]: T[K] extends Record<string | number | symbol, unknown>
			? [K,] | [...[K,], ...NestedKeyArray<T[K]>,]
			: [K,];
	}[keyof T & string]
	: never;
