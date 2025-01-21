// if this doesn't work consider https://github.com/sindresorhus/type-fest/blob/main/source/partial-deep.d.ts
export type NestedPartial<T,> = T extends Record<string | number | symbol, unknown> ? {
	[P in keyof T]?: T[P] extends Record<string | number | symbol, unknown>
		? NestedPartial<T[P]>
		: T[P];
} : T;
