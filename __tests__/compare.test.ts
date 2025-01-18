import { describe, test, vi, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { useCTA, UseCTAParameterCompare, } from '../src';

class CompareTest {
	value: unknown;
	constructor( value: unknown, ) {
		this.value = value;
	}

	getValue() {
		return this.value;
	}
}

describe( 'useCTA parameter: compare', () => {
	const initial = {
		test1: new CompareTest( 'test', ),
		test2: 2,
	};
	const compareFn: UseCTAParameterCompare<typeof initial> = ( prev, next, extra, ) => {
		let p = prev;
		let n = next;

		if ( extra.key === 'test1' ) {
			if ( prev instanceof CompareTest ) {
				p = prev.getValue();
			}
			if ( n instanceof CompareTest ) {
				n = n.getValue();
			}
		}

		return extra.cmp( p, n, );
	};

	test( 'should use custom compare function to determine state changes', () => {
		const initial = {
			test1: new CompareTest( 'test', ),
			test2: 2,
		};
		const compare = vi.fn( compareFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			compare,
		}, ), );
		const test1 = new CompareTest( 'update', );
		const newPayload = {
			...initial,
			test1,
		};

		act( () => {
			result.current[ 1 ].cta.update( 'test1', test1, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( newPayload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( { test1, }, );
		expect( compare, ).toHaveBeenCalledTimes( 2, );

		const [state,] = result.current;

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: {
					test1,
				},
			}, );
		}, );
		expect( state === result.current[ 0 ], ).toBe( true, );
		expect( compare, ).toHaveBeenCalledTimes( 3, );
	}, );

	test( 'should not change when using custom compare function', () => {
		const compare = vi.fn( compareFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			compare,
		}, ), );
		const [state,] = result.current;

		act( () => {
			result.current[ 1 ].cta.update( 'test1', initial.test1, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( state === result.current[ 0 ], ).toBe( true, );
		expect( compare, ).toHaveBeenCalledTimes( 1, );
	}, );
}, );
