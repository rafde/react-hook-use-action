export type Mutable<T,> = T extends ( infer R )[]
	? Array<Mutable<R>>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	: T extends Function
		? T
		: T extends object
			? { -readonly [P in keyof T]: Mutable<T[P]> }
			: T;

export type DeepMutableArray<T,> = Array<DeepMutable<T>>;

export type DeepMutable<T,> = T extends ( infer R )[]
	? DeepMutableArray<R>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	: T extends Function
		? T
		: T extends object
			? { -readonly [P in keyof T]: DeepMutable<T[P]> }
			: T;
