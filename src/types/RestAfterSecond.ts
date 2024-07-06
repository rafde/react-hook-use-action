export type RestAfterSecond<A,> = A extends [unknown, unknown, ...infer R,] ? R : never[];
