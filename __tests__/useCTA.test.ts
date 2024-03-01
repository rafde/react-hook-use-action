import { renderHook, act, } from '@testing-library/react';
import { CTAParam, useCTA, } from '../src';

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
	const changes = {
		there: 'me',
		you: 'yes, you.',
		2: 22,
	};
	const payload = {
		...changes,
		hi: 1,
	};
	const arbitraryKey = {
		'arbitrary key': 'value',
	};
	const changesWithArbitraryKey = {
		...changes,
		...arbitraryKey,
	};
	const payloadWithArbitraryKey = {
		...changesWithArbitraryKey,
		hi: 1,
	};

	describe( 'dispatch.replace( state | (state => state | undefined ))', function() {
		test( 'should `replace` state', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );
			act( () => {
				result.current[ 1 ].replace( payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payload, );
			expect( result.current[ 0 ].changes, ).toEqual( changes, );

			act( () => {
				result.current[ 1 ].replace( initial, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );

		test( 'should `replace` state that includes `{"arbitrary key": "value"}`', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( payloadWithArbitraryKey, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payloadWithArbitraryKey, );
			expect( result.current[ 0 ].changes, ).toEqual( changesWithArbitraryKey, );

			act( () => {
				result.current[ 1 ].replace( initial, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );

		test( 'should `replace` state when `payload` is a function', function() {
			const payload = {
				there: 'me',
				hi: 1,
				you: 'yes, you.',
				2: 22,
			};
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( () => payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payload, );
			expect( result.current[ 0 ].changes, ).toEqual( changes, );

			act( () => {
				result.current[ 1 ].replace( initial, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );

		test( 'should `replace` state when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( () => payloadWithArbitraryKey, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payloadWithArbitraryKey, );
			expect( result.current[ 0 ].changes, ).toEqual( changesWithArbitraryKey, );
		}, );

		test( 'should not `replace` state when `payload` is a function that returns `undefined`', function() {
			const payload = undefined;
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( () => payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();

			act( () => {
				result.current[ 1 ].replace( initial, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );
	}, );

	describe( 'dispatch.replaceInitial( initial | (state => initial | undefined ))', function() {
		test( 'should set new `initial`', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( payload, );
				result.current[ 1 ].replaceInitial( payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payload, );
			expect( result.current[ 0 ].changes, ).toBeNull();
			expect( result.current[ 0 ].initial, ).toEqual( payload, );
		}, );

		test( 'should set new `initial` when `payload` is a function', function() {
			const payload = {
				there: 'me',
				hi: 1,
				you: 'yes, you.',
				2: 22,
			};
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( () => payload, );
				result.current[ 1 ].replaceInitial( () => payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payload, );
			expect( result.current[ 0 ].changes, ).toBeNull();
			expect( result.current[ 0 ].initial, ).toEqual( payload, );
		}, );

		test( 'should set new `initial` when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replace( () => payloadWithArbitraryKey, );
				result.current[ 1 ].replaceInitial( () => payloadWithArbitraryKey, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( payloadWithArbitraryKey, );
			expect( result.current[ 0 ].changes, ).toBeNull();
			expect( result.current[ 0 ].initial, ).toEqual( payloadWithArbitraryKey, );

			act( () => {
				result.current[ 1 ].replace( initial, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toEqual( {
				...arbitraryKey,
				...initialChanges,
			}, );
			expect( result.current[ 0 ].initial, ).toEqual( payloadWithArbitraryKey, );
		}, );

		test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
			const payload = undefined;
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replaceInitial( () => payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
			expect( result.current[ 0 ].initial, ).toEqual( initial, );
		}, );

		test( 'should have `changes` when setting new `initial`', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ].replaceInitial( payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toEqual( initialChanges, );
			expect( result.current[ 0 ].initial, ).toEqual( payload, );
		}, );

		test( 'should have `changes` when setting new `initial` with arbitrary key', function() {
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );
			const payload = {
				...initial,
				...arbitraryKey,
			};
			act( () => {
				result.current[ 1 ].replaceInitial( payload, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toEqual( arbitraryKey, );
			expect( result.current[ 0 ].initial, ).toEqual( payload, );
		}, );
	}, );

	describe( 'dispatch.reset', function() {
		test( 'dispatch.reset()`', function() {
			const payload = {
				hi: 2,
			};
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					action: 'update',
					payload,
				}, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( {
				...initial,
				...payload,
			}, );
			expect( result.current[ 0 ].changes, ).toEqual( payload, );

			act( () => {
				result.current[ 1 ].reset();
			}, );

			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );

		test( 'using `init`', function() {
			const payload = {
				hi: 2,
			};
			const initExtra = {
				oops: 'my mistake',
			};
			const { result, } = renderHook( () => useCTA( {
				initial,
				onInit( state, ) {
					return {
						...state,
						...initExtra,
					};
				},
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					action: 'update',
					payload,
				}, );
			}, );

			expect( result.current[ 0 ].current, ).toEqual( {
				...initial,
				...initExtra,
				...payload,
			}, );
			expect( result.current[ 0 ].changes, ).toEqual( payload, );

			act( () => {
				result.current[ 1 ].reset();
			}, );

			expect( result.current[ 0 ].current, ).toEqual( {
				...initial,
				...initExtra,
			}, );
			expect( result.current[ 0 ].changes, ).toBeNull();
		}, );

		describe( 'dispatch.reset( initial | (state => initial | undefined ) )', function() {
			test( 'should set new `initial` to be `payload`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].reset( payload, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( payload, );
				expect( result.current[ 0 ].changes, ).toBeNull();
				expect( result.current[ 0 ].initial, ).toEqual( payload, );
			}, );

			test( 'should set new `initial` when `payload` is a function', function() {
				const payload = {
					there: 'me',
					hi: 1,
					you: 'yes, you.',
					2: 22,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].reset( () => payload, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( payload, );
				expect( result.current[ 0 ].changes, ).toBeNull();
				expect( result.current[ 0 ].initial, ).toEqual( payload, );
			}, );

			test( 'should set new `initial` when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].reset( () => payloadWithArbitraryKey, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( payloadWithArbitraryKey, );

				expect( result.current[ 0 ].changes, ).toBeNull();
				expect( result.current[ 0 ].initial, ).toEqual( payloadWithArbitraryKey, );

				act( () => {
					result.current[ 1 ].replace( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					...arbitraryKey,
					...initialChanges,
				}, );
				expect( result.current[ 0 ].initial, ).toEqual( payloadWithArbitraryKey, );
			}, );

			test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
				const payload = undefined;
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].reset( () => payload, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
				expect( result.current[ 0 ].initial, ).toEqual( initial, );
			}, );
		}, );
	}, );

	describe( 'dispatch.update', function() {
		describe( 'dispatch.update( partialState | ( state => partialState | undefined ))', function() {
			test( 'should `update` `hi`', function() {
				const payload = {
					hi: 2,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( payload, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should `update` `there`', function() {
				const payload = {
					there: 'me',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( payload, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should `update` `you` and `there`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( changes, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( payload, );
				expect( result.current[ 0 ].changes, ).toEqual( changes, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should `update` when `payload` is function', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( () => changes, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...changes,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( changes, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should not `update` when `payload` is function that returns `undefined`', function() {
				const payload = undefined;
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( () => payload, );
				}, );

				expect( result.current[ 0 ].current === initial, ).toBe( true, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should not `update` when `payload` does not change state', function() {
				const payload = { hi: 1, };
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( payload, );
				}, );

				expect( result.current[ 0 ].current === initial, ).toBe( true, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );
		}, );

		describe( 'dispatch.update(key, value)', function() {
			test( 'should `update` `hi`', function() {
				const payload = {
					hi: 2,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( 'hi', payload.hi, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should not `update` `hi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( 'hi', initial.hi, );
				}, );

				expect( result.current[ 0 ].current === initial, ).toBe( true, );
				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should update `there`', function() {
				const payload = {
					there: 'me',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( 'there', payload.there, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );

			test( 'should update `2`', function() {
				const payload = {
					2: 222,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].update( 2, payload[ 2 ], );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].update( initial, );
				}, );

				expect( result.current[ 0 ].current, ).toEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull();
			}, );
		}, );
	}, );

	describe( 'unknown action', function() {
		test( 'should not change state', function() {
			const payload = 'not updating';
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					action: 'arbitrary action',
					payload,
				}, );
			}, );

			expect( result.current[ 0 ].current === initial, ).toBe( true, );
			expect( result.current[ 0 ].current, ).toEqual( initial, );
			expect( result.current[ 0 ].changes, ).toBeNull( );
		}, );
	}, );

	describe( 'custom actions', function() {
		describe( 'calc', function() {
			const actions = {
				calc( state: CTAParam<typeof initial>, payload: Pick<typeof initial, 'hi'>, ) {
					const {
						hi,
					} = payload;

					if ( typeof hi !== 'number' ) {
						return;
					}

					return {
						hi: state.previous.hi + hi,
					};
				},
			};
			describe( 'dispatch({action: "calc", payload: unknown}})', () => {
				test( 'should `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ]( {
							action: 'calc',
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
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						there: '',
					};
					act( () => {
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						result.current[ 1 ]( {
							action: 'calc',
							payload,
						}, );
					}, );

					expect( result.current[ 0 ].current === initial, ).toBe( true, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );

				test( 'should `calc` `hi` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ]( {
							action: 'calc',
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

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							calc( state, payload: Pick<typeof initial, 'hi'>, ) {
								const {
									hi,
								} = payload;

								if ( typeof hi !== 'number' ) {
									return;
								}

								return {
									hi: state.previous.hi + hi,
								};
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							action: 'calc',
							payload: () => undefined,
						}, );
					}, );

					expect( result.current[ 0 ].current === initial, ).toBe( true, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );
			}, );
			describe( 'dispatch.calc( unknown )', function() {
				test( 'should `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const val = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ].calc( val, );
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
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							calc( state, payload: Pick<typeof initial, 'hi'>, ) {
								const {
									hi,
								} = payload;

								if ( typeof hi !== 'number' ) {
									return;
								}

								return {
									hi: state.previous.hi + hi,
								};
							},
						},
					}, ), );

					const payload = {
						there: '',
					};
					act( () => {
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						result.current[ 1 ].calc( payload, );
					}, );

					expect( result.current[ 0 ].current === initial, ).toBe( true, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );

				test( 'should `calc` `hi` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							calc( state, payload: Pick<typeof initial, 'hi'>, ) {
								const {
									hi,
								} = payload;

								if ( typeof hi !== 'number' ) {
									return;
								}

								return {
									hi: state.previous.hi + hi,
								};
							},
						},
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ].calc( () => payload, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 0 ].changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							calc( state, payload: Pick<typeof initial, 'hi'>, ) {
								const {
									hi,
								} = payload;

								if ( typeof hi !== 'number' ) {
									return;
								}

								return {
									hi: state.previous.hi + hi,
								};
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ].calc( () => undefined, );
					}, );

					expect( result.current[ 0 ].current === initial, ).toBe( true, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'doubleHi', function() {
			describe( 'dispatch({action: "doubleHi"}})', () => {
				test( 'should double `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							double( state, ) {
								return {
									hi: state.previous.hi * 2,
								};
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							action: 'double',
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
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							double( state, ) {
								return {
									hi: state.previous.hi * 2,
								};
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ].double();
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

		describe( 'val', function() {
			describe( 'dispatch({action: "val", payload: unknown})', () => {
				test( 'should add to `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 4;
					act( () => {
						result.current[ 1 ]( {
							action: 'val',
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
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 's';
					act( () => {
						result.current[ 1 ]( {
							action: 'val',
							// @ts-expect-error make sure payload is not used by calc when payload is forced
							payload,
						}, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull();
				}, );

				test( 'should add to `hi` when payload is a function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 4;
					act( () => {
						result.current[ 1 ]( {
							action: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 0 ].changes, ).toEqual( {
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
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 'sdd';
					act( () => {
						result.current[ 1 ]( {
							action: 'val',
							// @ts-expect-error make sure payload is not used by calc when payload is forced
							payload,
						}, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );
				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ]( {
							action: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );
			}, );

			describe( 'dispatch.val(unknown)', function() {
				test( 'should add to `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 4;
					act( () => {
						result.current[ 1 ].val( payload, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( {
						...initial,
						hi: initial.hi + payload,
					}, );
					expect( result.current[ 0 ].changes, ).toEqual( {
						hi: initial.hi + payload,
					}, );
				}, );

				test( 'should add to `hi` when payload is a function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 4;
					act( () => {
						result.current[ 1 ].val( payload, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 0 ].changes, ).toEqual( {
						hi: initial.hi + payload(),
					}, );
				}, );

				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ].val( payload, );
					}, );
					expect( result.current[ 0 ].current, ).toEqual( initial, );
					expect( result.current[ 0 ].changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'override `update`', function() {
			test( 'should retain `dispatch.update(key, value)`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						update( state, payload, ) {
							const {
								hi,
								..._payload
							} = payload;

							if ( typeof hi !== 'number' ) {
								return _payload;
							}

							return {
								..._payload,
								hi: state.previous.hi + hi,
							};
						},
					},
				}, ), );

				const payload = {
					hi: 4,
				};
				const hi = initial.hi + payload.hi;
				act( () => {
					result.current[ 1 ].update( 'hi', payload.hi, );
				}, );
				expect( result.current[ 0 ].current, ).toEqual( {
					...initial,
					hi,
				}, );
				expect( result.current[ 0 ].changes, ).toEqual( {
					hi,
				}, );
			}, );
		}, );
	}, );
}, );
