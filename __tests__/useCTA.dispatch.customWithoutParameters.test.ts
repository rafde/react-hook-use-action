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
		customWithoutParameters() {
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

describe( 'custom action without parameters', () => {
	test( 'should `update` "test2"', function() {
		const { result, } = renderHook( () => useCTA( customCTAParam, ), );

		act( () => {
			result.current[ 1 ].cta.customWithoutParameters();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

		const customWithoutParametersCTADispatchState = result.current[ 1 ].state;

		act( () => {
			result.current[ 1 ]( {
				type: 'customWithoutParameters',
			}, );
		}, );

		expect( customWithoutParametersCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
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
					customWithoutParameters() {
						return changes;
					},
				},
			}, ), );

			act( () => {
				result.current[ 1 ].cta.customWithoutParameters();
			}, );

			expect( result.current[ 0 ], ).toStrictEqual( payload, );
			expect( result.current[ 1 ].state.previous, ).toBe( initial, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

			const customWithoutParametersCTADispatchState = result.current[ 1 ].state;

			act( () => {
				result.current[ 1 ]( {
					type: 'customWithoutParameters',
				}, );
			}, );

			expect( customWithoutParametersCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );

		test( 'should not `update` "test2"', function() {
			const { result, } = renderHook( () => useCTA( customAndUpdateCTAParam, ), );
			act( () => {
				result.current[ 1 ].cta.customWithoutParameters();
			}, );

			expect( result.current[ 0 ], ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previous, ).toBe( null, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( null, );

			const customWithoutParametersCTADispatchState = result.current[ 1 ].state;

			act( () => {
				result.current[ 1 ]( {
					type: 'customWithoutParameters',
				}, );
			}, );

			expect( customWithoutParametersCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );
	}, );
}, );
