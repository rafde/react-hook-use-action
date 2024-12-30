import { renderHook, act, } from '@testing-library/react';
import { returnCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'custom action with ctaState', () => {
	describe( 'actions.val(CTAHistory, string)', () => {
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
	}, );

	describe( 'actions.val(CTAHistory, CTAState["hi"])', () => {
		const initialChanges = {
			there: 'you',
			you: 'me?',
			2: 2,
		};
		const initial = {
			...initialChanges,
			hi: 1,
		};
		describe( 'dispatch({type: "val", payload: unknown})', () => {
			test( 'should add to `hi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
							return {
								hi: state.current.hi + payload,
							};
						},
					},
				}, ), );

				const payload = 4;
				act( () => {
					result.current[ 1 ]( {
						type: 'val',
						payload,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi + payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi + payload,
				}, );
			}, );

			test( 'should not add to `hi` if payload is not a number', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
							if ( typeof payload !== 'number' ) {
								return;
							}
							return {
								hi: state.current.hi + payload,
							};
						},
					},
				}, ), );

				const payload = 's';
				act( () => {
					result.current[ 1 ]( {
						type: 'val',
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						payload,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );

			test( 'should not add to `hi` when payload is a function that returns a string', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
							if ( typeof payload !== 'number' ) {
								return;
							}
							return {
								hi: state.current.hi + payload,
							};
						},
					},
				}, ), );

				const payload = () => 'sdd';
				act( () => {
					result.current[ 1 ]( {
						type: 'val',
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						payload,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );
		}, );

		describe( 'dispatch.cta.val(unknown)', function() {
			test( 'should add to `hi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
							return {
								hi: state.current.hi + payload,
							};
						},
					},
				}, ), );

				const payload = 4;
				act( () => {
					result.current[ 1 ].cta.val( payload, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi + payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi + payload,
				}, );
			}, );
		}, );
	}, );

	describe( 'actions.val(CTAHistory, string, boolean?, string?)', () => {
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

		test( 'should update with trim with dispatch.cta.val(string, boolean?)', () => {
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

		test( 'should update initial with dispatch.cta.val(string, boolean?, "initial")', () => {
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

		test( 'should resetCurrent using payload with dispatch.cta.val(string, boolean?, "resetCurrent")', () => {
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

	describe( 'actions.setter(CTAHistory, number, string, boolean)', () => {
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

	describe( 'actions.calc(CTAHistory, CTAState["hi"], {ignoreNegatives: boolean, bbb?: number}?)', function() {
		const initialChanges = {
			there: 'you',
			you: 'me?',
			2: 2,
		};
		const initial = {
			...initialChanges,
			hi: 1,
		};
		const params = returnCTAParameter( {
			initial,
			actions: {
				calc(
					state,
					payload: Pick<typeof initial, 'hi'>,
					options?: {
						ignoreNegatives: boolean
						bbb?: number
					},
				) {
					const {
						hi,
					} = payload;

					if ( options?.ignoreNegatives ) {
						return;
					}

					if ( typeof hi !== 'number' ) {
						return;
					}

					return {
						hi: state.current.hi + hi,
					};
				},
			},
		}, );

		describe( 'dispatch({type: "calc", payload: unknown}})', () => {
			test( 'should `calc` `hi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						calc(
							state,
							payload: Pick<typeof initial, 'hi'>,
							options?: {
								ignoreNegatives: boolean
								bbb?: number
							},
						) {
							const {
								hi,
							} = payload;

							if ( options?.ignoreNegatives ) {
								return;
							}

							if ( typeof hi !== 'number' ) {
								return;
							}

							return {
								hi: state.current.hi + hi,
							};
						},
					},
				}, ), );

				const payload = {
					hi: 4,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'calc',
						payload,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi + payload.hi,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi + payload.hi,
				}, );
			}, );

			test( 'should not `calc` `hi`', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const payload = {
					hi: '',
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'calc',
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						payload,
					}, );
				}, );

				expect( result.current[ 0 ].current === initial, ).toBe( true, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );

			test( 'should `calc` `hi` when `payload` is function', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const payload = {
					hi: 4,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'calc',
						payload,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi + payload.hi,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi + payload.hi,
				}, );
			}, );

			test( 'should not `calc` when `payload` is negative and `options.ignoreNegatives` === true', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const payload = {
					hi: -4,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'calc',
						payload,
						args: [
							{
								ignoreNegatives: true,
							},
						],
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi,
				}, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );
		}, );
		describe( 'dispatch.cta.calc( unknown )', function() {
			test( 'should `calc` `hi`', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const val = {
					hi: 4,
				};
				act( () => {
					result.current[ 1 ].cta.calc( val, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi + val.hi,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi + val.hi,
				}, );
			}, );

			test( 'should not `calc` `hi`', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const payload = {
					there: '',
				};
				act( () => {
					// @ts-expect-error make sure payload is not used by calc when payload is forced
					result.current[ 1 ].cta.calc( payload, );
				}, );

				expect( result.current[ 0 ].current === initial, ).toBe( true, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );

			test( 'should not `calc` when `payload` is negative and `options.ignoreNegatives` === true', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				const payload = {
					hi: -4,
				};
				act( () => {
					result.current[ 1 ].cta.calc( payload, {
						ignoreNegatives: true,
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi,
				}, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );
		}, );
	}, );

	describe( 'actions.doubleHi(CTAHistory)', function() {
		const initialChanges = {
			there: 'you',
			you: 'me?',
			2: 2,
		};
		const initial = {
			...initialChanges,
			hi: 1,
		};
		const params = returnCTAParameter( {
			initial,
			actions: {
				double( state, ) {
					return {
						hi: state.current.hi * 2,
					};
				},
			},
		}, );

		describe( 'dispatch({type: "doubleHi"}})', () => {
			test( 'should double `hi`', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'double',
					}, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi * 2,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi * 2,
				}, );
			}, );
		}, );
		describe( 'dispatch.double', function() {
			test( 'should double `hi`', function() {
				const { result, } = renderHook( () => useCTA( params, ), );

				act( () => {
					result.current[ 1 ].cta.double();
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi: initial.hi * 2,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi: initial.hi * 2,
				}, );
			}, );
		}, );
	}, );
}, );
