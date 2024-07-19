type ArgsProp<Args extends unknown[],> = Args extends []
	? { // []
		args?: undefined
	} : (
		// [options?: unknown, ...any[]]
		[undefined,] extends Args ? {
			args?: Args
		} : { // [options: unknown, ...any[]]
			args: Args
		}
	);

export type DispatchValueActionPayloadArgsProps<Args extends unknown[],> = Args extends [infer Payload, ...infer A,]
	? (
		{ // (payload: unknown, ...any[]) => any
			payload: Payload
		} & ArgsProp<A>
	)
	: Args extends []
		? { // handle () => any
			payload?: undefined
			args?: undefined
		}
		: (
			[undefined,] extends Args
				? (
					{ // (payload?: unknown, ...any[]) => any
						payload?: Args[0]
					} & (
					Args extends [unknown?, ...infer Options,]
						// (payload?: unknown, ...any[]) => any
						? ArgsProp<Options>
						: { // (payload?: unknown) => any
							args?: undefined
						}
					)
				)
				: never
		);
