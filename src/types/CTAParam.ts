export type CTAParam<Initial> = {
	readonly changes: Partial<Initial> | null,
	readonly initial: Initial,
	readonly previous: Initial,
}
