import { act, renderHook, } from '@testing-library/react';
import { useCTA, UseCTAParameter, } from '../src';

class CompareTest {
	value: unknown;
	constructor( value: unknown, ) {
		this.value = value;
	}

	getValue() {
		return this.value;
	}
}

describe( 'useCTA compare parameter', () => {
	const initial = {
		test1: new CompareTest( 'test', ),
		test2: 2,
	};
	const compareFn: UseCTAParameter<Record<string, unknown>, undefined>['compare'] = ( prev, next, cmp, ) => {
		let p = prev;
		let n = next;
		if ( p instanceof CompareTest ) {
			p = p.getValue();
		}

		if ( n instanceof CompareTest ) {
			n = n.getValue();
		}

		return cmp( p, n, );
	};

	it( 'should use custom compare function to determine state changes', () => {
		const initial = {
			test1: new CompareTest( 'test', ),
			test2: 2,
		};
		const compare = jest.fn( compareFn, );
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
		expect( result.current[ 0 ].previousInitial, ).toBe( null, );
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

	it( 'should not change when using custom compare function', () => {
		const compare = jest.fn( compareFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			compare,
		}, ), );
		const [state,] = result.current;

		act( () => {
			result.current[ 1 ].cta.update( 'test1', initial.test1, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBe( null, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBe( null, );
		expect( result.current[ 0 ].changes, ).toBe( null, );
		expect( state === result.current[ 0 ], ).toBe( true, );
		expect( compare, ).toHaveBeenCalledTimes( 1, );
	}, );
}, );
