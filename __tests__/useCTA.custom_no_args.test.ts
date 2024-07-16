import { act, renderHook, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
import { initial, updateCTAParam, } from './setup/simple';

const changes = {
	test1: -1,
};
const payload = {
	...initial,
	...changes,
};
const customCTAParam = returnUseCTAParameter( {
	initial,
	actions: {
		customNoArgs() {
			return changes;
		},
	},
}, );

const customAndUpdateCTAParam = returnUseCTAParameter( {
	...customCTAParam,
	actions: {
		...customCTAParam.actions,
		...updateCTAParam.actions,
	},
}, );

describe( 'custom action without arguments', () => {
	test( 'should `update` "test2"', function() {
		const { result, } = renderHook( () => useCTA( customCTAParam, ), );

		act( () => {
			result.current[ 1 ].cta.customNoArgs();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

		const customNoArgsCTADispatchState = result.current[ 1 ].state;

		act( () => {
			result.current[ 1 ]( {
				type: 'customNoArgs',
			}, );
		}, );

		expect( customNoArgsCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	describe( 'with augmented update', function() {
		test( 'should `update` "test2"', function() {
			const changes = {
				test1: 10,
			};
			const payload = {
				...initial,
				...changes,
			};
			const { result, } = renderHook( () => useCTA( {
				...customAndUpdateCTAParam,
				actions: {
					...customAndUpdateCTAParam.actions,
					customNoArgs() {
						return changes;
					},
				},
			}, ), );

			act( () => {
				result.current[ 1 ].cta.customNoArgs();
			}, );

			expect( result.current[ 0 ], ).toStrictEqual( payload, );
			expect( result.current[ 1 ].state.previous, ).toBe( initial, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

			const customNoArgsCTADispatchState = result.current[ 1 ].state;

			act( () => {
				result.current[ 1 ]( {
					type: 'customNoArgs',
				}, );
			}, );

			expect( customNoArgsCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );

		test( 'should not `update` "test2"', function() {
			const { result, } = renderHook( () => useCTA( customAndUpdateCTAParam, ), );
			act( () => {
				result.current[ 1 ].cta.customNoArgs();
			}, );

			expect( result.current[ 0 ], ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previous, ).toBe( null, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( null, );

			const customNoArgsCTADispatchState = result.current[ 1 ].state;

			act( () => {
				result.current[ 1 ]( {
					type: 'customNoArgs',
				}, );
			}, );

			expect( customNoArgsCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );
	}, );
}, );
