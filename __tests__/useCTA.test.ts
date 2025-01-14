import { renderHook, act, waitFor, } from '@testing-library/react';
import { returnCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'useCTA', () => {
	const props = returnCTAParameter( {
		initial,
		afterActionChange: () => {},
		compare: ( a, b, { cmp, }, ) => cmp( a, b, ),
		transform: payload => payload,
		onInit: initial => initial,
	}, );

	const afterActionChange = jest.spyOn( props, 'afterActionChange', );
	const compare = jest.spyOn( props, 'compare', );
	const transform = jest.spyOn( props, 'transform', );
	const onInit = jest.spyOn( props, 'onInit', );

	test( 'should return useCTA values', async() => {
		const { result, } = renderHook( () => useCTA( props, ), );
		expect( result.current, ).toBeDefined();

		expect( compare, ).not.toHaveBeenCalled();
		expect( transform, ).not.toHaveBeenCalled();
		expect( onInit, ).toHaveBeenCalledTimes( 1, );

		await waitFor( async() => {
			expect( afterActionChange, ).not.toHaveBeenCalled();
		}, );
	}, );

	describe( 'check for edge cases', () => {
		test( 'should not create a new dispatch when an action is called', async() => {
			const { result, } = renderHook( () => useCTA( props, ), );
			const [
				,
				initDispatch,
			] = result.current;

			act( () => {
				result.current[ 1 ].cta.update( 'test1', 2, );
			}, );

			expect( initDispatch, ).toStrictEqual( result.current[ 1 ], );

			expect( compare, ).toHaveBeenCalled();
			expect( transform, ).toHaveBeenCalledTimes( 1, );
			expect( onInit, ).toHaveBeenCalledTimes( 1, );

			await waitFor( async() => {
				expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
			}, );

			await waitFor( async() => {
				expect( afterActionChange, ).toHaveBeenCalledWith( initDispatch.history, 'update', undefined, );
			}, );
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
