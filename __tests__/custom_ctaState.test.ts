import { renderHook, act, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
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
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBeNull( );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

		const calcCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
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
		expect( result.current[ 1 ].state.previous, ).toBeNull( );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( state, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const calcCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
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
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( state, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull( );

		const calcCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'val',
				payload: test2,
			}, );
		}, );

		expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	describe( 'options', () => {
		const params = returnUseCTAParameter( {
			initial,
			actions: {
				val( state, payload: string, trim?: boolean, type?: 'initial' | 'resetCurrent', ) {
					let test2 = payload;

					if ( typeof payload !== 'string' ) {
						return;
					}

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

		test( 'should update', () => {
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
			expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBeNull( );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

			const calcCTADispatchState = result.current[ 1 ].state;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );

		test( 'should update with trim', () => {
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
			expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.previousInitial, ).toBeNull( );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

			const calcCTADispatchState = result.current[ 1 ].state;
			act( () => {
				result.current[ 1 ]( {
					type: 'val',
					payload: test2,
					args: [true,],
				}, );
			}, );

			expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );

		test( 'should update initial', () => {
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
			expect( result.current[ 1 ].state.previous, ).toBeNull( );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( state, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
			expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

			const calcCTADispatchState = result.current[ 1 ].state;
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

			expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );

		test( 'should resetCurrent using payload', () => {
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
			expect( result.current[ 1 ].state.previous, ).toBe( initial, );
			expect( result.current[ 1 ].state.initial, ).toStrictEqual( state, );
			expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
			expect( result.current[ 1 ].state.changes, ).toBeNull( );

			const calcCTADispatchState = result.current[ 1 ].state;
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

			expect( calcCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
		}, );
	}, );
}, );
