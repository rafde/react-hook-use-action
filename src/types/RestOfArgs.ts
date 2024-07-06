// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RestOfArgs<T,> = T extends ( ( first: any, second: any, ...args: infer P ) => any ) ? P : never[];
