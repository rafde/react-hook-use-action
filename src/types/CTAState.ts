export type CTAState<Initial> = Readonly<{
	readonly changes: Partial<Initial> | null,
	changesMap: Map<string | number, unknown>,
	readonly current: Initial,
	readonly initial: Initial,
	readonly previous: Initial,
}>;
