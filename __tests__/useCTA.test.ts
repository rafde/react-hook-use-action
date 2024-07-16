import { renderHook, act, } from '@testing-library/react';
import { useCTA, returnUseCTAParameter, } from '../src';
import { initial, } from './setup/simple';

describe( 'useCTA', () => {
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

			expect( result.current[ 0 ] === initial, ).toBe( true, );
			expect( result.current[ 0 ], ).toStrictEqual( initial, );
			expect( result.current[ 1 ].state.changes, ).toBe( null, );
			expect( result.current[ 1 ].state.previous, ).toBe( null, );
		}, );

		test( 'should not create a new dispatch when an action is called', () => {
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
			expect( result.current[ 0 ], ).toEqual( initial, );
			expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
			expect( result.current[ 0 ], ).toEqual( initial, );
			expect( result.current[ 1 ].state.changes, ).toBeNull( );
		}, );
	}, );
}, );

describe( 'useCTA', function() {
	const initialChanges = {
		there: 'you',
		you: 'me?',
		2: 2,
	};
	const initial = {
		...initialChanges,
		hi: 1,
	};

	describe( 'custom actions', function() {
		describe( 'calc', function() {
			const params = returnUseCTAParameter( {
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
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

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( params, ), );

					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							payload: () => undefined,
						}, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + val.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
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

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );

				test( 'should `calc` `hi` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( params, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ].cta.calc( () => payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( params, ), );

					act( () => {
						result.current[ 1 ].cta.calc( () => undefined, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'doubleHi', function() {
			const params = returnUseCTAParameter( {
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi * 2,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi * 2,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi * 2,
					}, );
				}, );
			}, );
		}, );

		describe( 'val', function() {
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
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
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBe( null, );
				}, );

				test( 'should add to `hi` when payload is a function', function() {
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

					const payload = () => 4;
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload(),
					}, );
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
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
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

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
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
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload,
					}, );
				}, );

				test( 'should add to `hi` when payload is a function', function() {
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

					const payload = () => 4;
					act( () => {
						result.current[ 1 ].cta.val( payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload(),
					}, );
				}, );

				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
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

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ].cta.val( payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
		}, );
	}, );
}, );
