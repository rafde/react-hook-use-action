import { renderHook, act, } from '@testing-library/react';
import { returnCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'custom action with ctaState', () => {
	test( 'should update', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				val( state, payload: string, ) {
					return state.updateAction( {
						test2: payload,
					}, );
				},
			},
		}, ), );
		const test2 = 'payload';
		const changes = {
			test2: test2.trim(),
		};
		const state = {
			...initial,
			...changes,
		};

		act( () => {
			result.current[ 1 ].cta.val( test2, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( state, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

		const calcCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should update initial', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				val( state, payload: string, ) {
					return state.updateInitialAction( {
						test2: payload,
					}, );
				},
			},
		}, ), );
		const test2 = 'payload';
		const changes = {
			test2,
		};
		const state = {
			...initial,
			...changes,
		};
		const initialChanges = {
			test2: initial.test2,
		};

		act( () => {
			result.current[ 1 ].cta.val( test2, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( state, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

		const calcCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should resetCurrent using payload', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				val( state, payload: string, ) {
					return state.resetAction( {
						...state.current,
						test2: payload,
					}, );
				},
			},
		}, ), );
		const test2 = 'payload';
		const changes = {
			test2,
		};
		const state = {
			...initial,
			...changes,
		};

		act( () => {
			result.current[ 1 ].cta.val( test2, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( state, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( state, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const calcCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	describe( 'options', () => {
		const params = returnCTAParameter( {
			initial,
			actions: {
				val( state, payload: string, trim?: boolean, type?: 'initial' | 'resetCurrent', ) {
					let test2 = payload;

					if ( trim ) {
						test2 = payload.trim();
					}
					const next = {
						test2,
					};

					switch ( type ) {
						case 'initial':
							return state.updateInitialAction( next, );
						case 'resetCurrent':
							return state.resetAction( {
								...state.current,
								...next,
							}, );
					}

					return next;
				},
			},
		}, );

		test( 'should update dispatch.cta.val(string)', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const test2 = 'payload';
			const changes = {
				test2,
			};
			const state = {
				...initial,
				...changes,
			};

			act( () => {
				result.current[ 1 ].cta.val( test2, );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( state, );
			expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previousInitial, ).toBeNull( );
			expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

			const calcCTADispatchState = result.current[ 1 ].history;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
		}, );

		test( 'should update with trim with dispatch.cta.val(string, boolean)', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const test2 = '      payload      ';
			const changes = {
				test2: test2.trim(),
			};
			const state = {
				...initial,
				...changes,
			};

			act( () => {
				result.current[ 1 ].cta.val( test2, true, );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( state, );
			expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previousInitial, ).toBeNull( );
			expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

			const calcCTADispatchState = result.current[ 1 ].history;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
					args: [true,],
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
		}, );

		test( 'should update initial with dispatch.cta.val(string, boolean, "initial")', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const test2 = 'payload';
			const changes = {
				test2,
			};
			const state = {
				...initial,
				...changes,
			};
			const initialChanges = {
				test2: initial.test2,
			};

			act( () => {
				result.current[ 1 ].cta.val( test2, false, 'initial', );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previous, ).toBeNull( );
			expect( result.current[ 0 ].initial, ).toStrictEqual( state, );
			expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
			expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

			const calcCTADispatchState = result.current[ 1 ].history;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
					args: [
						false,
						'initial',
					],
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
		}, );

		test( 'should resetCurrent using payload with dispatch.cta.val(string, boolean, "resetCurrent")', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const test2 = 'payload';
			const changes = {
				test2,
			};
			const state = {
				...initial,
				...changes,
			};

			act( () => {
				result.current[ 1 ].cta.val( test2, false, 'resetCurrent', );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( state, );
			expect( result.current[ 0 ].previous, ).toBe( initial, );
			expect( result.current[ 0 ].initial, ).toStrictEqual( state, );
			expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull( );

			const calcCTADispatchState = result.current[ 1 ].history;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
					args: [
						false,
						'resetCurrent',
					],
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
		}, );
	}, );

	describe( 'required parameters', () => {
		const params = returnCTAParameter( {
			initial,
			actions: {
				setter( state, test1: number, test2: string, test3: boolean, ) {
					return {
						test1,
						test2,
						test3,
					};
				},
			},
		}, );

		test( 'should change with dispatch.cta.setter(number, string, boolean)', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const test1 = 11;
			const test2 = 'payload';
			const test3 = false;
			const changes = {
				test1,
				test2,
				test3,
			};
			const current = {
				...initial,
				...changes,
			};
			act( () => {
				result.current[ 1 ].cta.setter( test1, test2, test3, );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( current, );
			expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previousInitial, ).toBeNull( );
			expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );
		}, );

		test( 'should not change with dispatch.cta.setter(number, string, boolean)', () => {
			const { result, } = renderHook( () => useCTA( params, ), );
			const [oldHistory,] = result.current;
			act( () => {
				result.current[ 1 ].cta.setter( initial.test1, initial.test2, initial.test3, );
			}, );

			expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previous, ).toBeNull( );
			expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
			expect( result.current[ 0 ].previousInitial, ).toBeNull( );
			expect( result.current[ 0 ].changes, ).toBeNull( );
			expect( result.current[ 0 ], ).toStrictEqual( oldHistory, );
		}, );
	}, );
}, );
