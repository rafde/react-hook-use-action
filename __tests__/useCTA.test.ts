import { renderHook, act, } from '@testing-library/react';
import { useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'useCTA', () => {
	test( 'should return useCTA values', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			async afterActionChange() {
				// here for verifying that it accepts parameter
			},
			compare() {
				return true;
			},
			onInit( initial, ) {
				return initial;
			},
			transform( payload, ) {
				return payload;
			},
		}, ), );
		expect( result.current, ).toBeDefined();
	}, );

	describe( 'check for edge cases', () => {
		test( 'should not create a new dispatch when an action is called', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );
			const [
				,
				initDispatch,
			] = result.current;

			act( () => {
				result.current[ 1 ].cta.update( 'test1', 2, );
			}, );

			expect( initDispatch, ).toStrictEqual( result.current[ 1 ], );
		}, );

		test( 'should have history equal to dispatch.history', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );
			const [
				history,
				dispatch,
			] = result.current;

			expect( history, ).toEqual( dispatch.history, );
		}, );

		test( 'should not change state when type is not defined', function() {
			const payload = 'not updating';
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					// @ts-expect-error force payload to test no state change
					type: 'arbitrary type',
					// @ts-expect-error force payload to test no state change
					payload,
				}, );
			}, );

			expect( result.current[ 0 ].current === initial, ).toBe( true, );
			expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull( );
			expect( result.current[ 0 ].previous, ).toBeNull( );
		}, );

		test( 'should not create a new dispatch when a custom action is called', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
				actions: {
					customAction() {
						return {
							test2: 'customAction',
						};
					},
				},
			}, ), );
			const [
				,
				initDispatch,
			] = result.current;

			act( () => {
				result.current[ 1 ].cta.customAction();
			}, );

			expect( initDispatch, ).toStrictEqual( result.current[ 1 ], );
		}, );
	}, );

	describe( 'with invalid results', () => {
		test( 'should not make changes when type is `invalid`', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
				actions: {
					double( state, ) {
						return [
							'invalid',
							{
								...state.current,
								hi: 33333,
							},
						];
					},
				},
			}, ), );

			act( () => {
				// @ts-expect-error check to make sure this does not make changes with invalid type
				result.current[ 1 ].cta.double();
			}, );
			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull( );
		}, );

		test( 'should not make changes when next state is `invalid`', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
				actions: {
					double( state, ) {
						// @ts-expect-error check to make sure this does not make changes with invalid type
						return state.updateAction( 'invalid', );
					},
				},
			}, ), );

			act( () => {
				result.current[ 1 ].cta.double();
			}, );
			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull( );
		}, );

		test( 'should accept createFunc', () => {
			const { result, } = renderHook( () => useCTA(
				{
					initial,
				},
				dispatch => ( {
					getHistory() {
						return dispatch.history.current.test1 * 3;
					},
				} ),
			), );
			expect( result.current[ 0 ].current.test1 * 3, ).toEqual( result.current[ 1 ].func.getHistory(), );
		}, );
	}, );
}, );
