export type OmitEmptyRecord<T,> = {
	[K in keyof T as T[K] extends Record<string | number | symbol, never> ? never : K]: T[K]
};
