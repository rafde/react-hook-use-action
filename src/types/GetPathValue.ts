// if to hard, consider https://github.com/sindresorhus/type-fest/blob/main/source/get.d.ts

type ToNumber<T extends string,> = T extends `${infer N extends number}` ? N : never;

export type SplitAtFirstUnescapedDot<
	Bod extends string,
	A extends string = '',
> = Bod extends `${infer Head}.${infer Tail}`
	? Head extends `${string}\\`
		? Head extends `${infer B}\\`
			? SplitAtFirstUnescapedDot<
				Tail,
				`${A}${B}.`
			>
			: never
		: Tail extends string ? [`${A}${Head}`, Tail,] : [`${A}${Head}`, undefined,]
	: [`${A}${Bod}`, undefined,];

type HeadAndShoulders<
	Full extends string | number | symbol,
> = Full extends number
	? [Full, undefined,]
	: Full extends string
		? SplitAtFirstUnescapedDot<Full> extends [infer Head, infer Shoulders,]
			? [Head, Shoulders,]
			: Full extends `${infer H}.${infer S}`
				? [H, S,]
				: never
		: [Full, undefined,];

type Get<Obj, Head, Tail,> = Head extends keyof Obj
	? Obj[Head] extends Record<string | number, unknown> | Array<unknown>
		? Tail extends string | number ? GetPathValue<Obj[Head], Tail> : Obj[Head]
		: Obj[Head]
	: never;

export type GetPathValue<Obj, Key extends string | number | symbol,> = HeadAndShoulders<Key> extends [infer Head, infer Shoulders,]
	? Head extends keyof Obj
		? Get<Obj, Head, Shoulders>
		: Head extends `${number}`
			? Get<Obj, ToNumber<Head>, Shoulders>
			: never
	: never;
