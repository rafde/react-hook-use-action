export type NestedArrayValue<T, K extends string[],> = K extends [infer First,]
	? First extends keyof T
		? T[First]
		: never
	: K extends [infer First, ...infer Rest,]
		? First extends keyof T
			? Rest extends string[]
				? T[First] extends object
					? NestedArrayValue<T[First], Rest>
					: never
				: never
			: never
		: never;
