import { strictDeepEqual, } from 'fast-equals';

export type UseCTAParameterCompare = ( a: unknown, b: unknown, cmp: typeof strictDeepEqual ) => boolean;
