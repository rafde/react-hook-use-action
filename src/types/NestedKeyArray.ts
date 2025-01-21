export type NestedKeyArray<T,> = T extends Record<string | number | symbol, unknown>
	? {
		[K in keyof T & ( string | number )]: T[K] extends Record<string | number | symbol, unknown>
			? [K,] | [...[K,], ...NestedKeyArray<T[K]>,]
			: [K,];
	}[keyof T & ( string | number )]
	: never;
