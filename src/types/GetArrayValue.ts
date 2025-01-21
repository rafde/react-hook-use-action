export type GetArrayValue<T, K extends ( string | number | symbol )[],> = K extends [infer First,]
	? First extends keyof T
		? T[First]
		: never
	: K extends [infer First, ...infer Rest,]
		? First extends keyof T
			? Rest extends ( string | number | symbol )[]
				? T[First] extends object
					? GetArrayValue<T[First], Rest>
					: never
				: never
			: never
		: never;
