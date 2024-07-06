export type RestAfterFirst<A,> = A extends [unknown, ...infer R,] ? R extends [] ? never[] : R : never[];
