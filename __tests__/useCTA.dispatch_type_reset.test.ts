import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, payload, resetCTAParams, resetCTAWithOptionsParams, } from './setup/simple';

// Ensures typescript checking works. Primary tests are in __tests__/useCTA.dispatch.cta.reset.test.ts

describe( 'dispatch({type: "reset"})', () => {
	test( 'should reset to `initial`', function() {
		const payload = {
			test1: 2,
		};
		const nextState = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should `reset` to `initial` when custom action is defined', function() {
		const payload = {
			test1: 2,
		};
		const nextState = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				customAction() {
					return undefined;
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should reset with test1 = 0', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );
				const current = {
					...initial,
					test1: 0,
				};
				const newInitial = {
					...initial,
					test1: -1,
				};
				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaParam => ( {
							...ctaParam.initial,
							test1: -1,
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( { test1: initial.test1, }, );

				act( () => {
					act( () => {
						result.current[ 1 ]( {
							type: 'reset',
						}, );
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );
		}, );

		describe( 'with options', () => {
			test( 'should reset with test1 = 0', () => {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );
				const current = {
					...initial,
					test1: 0,
				};
				const newInitial = {
					...initial,
					test1: -1,
				};

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaParam => ( {
							...ctaParam.initial,
							test1: -1,
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( { test1: initial.test1, }, );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						options: { rejectNegativeTest1: true, },
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );
		}, );
	}, );
}, );

describe( 'dispatch.cta.reset( payload )', function() {
	test( 'should set new `initial` to be `payload`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const newInitial = {
			...initial,
			test2: 'newInitial',
		};

		act( () => {
			result.current[ 1 ].cta.updateInitial( newInitial, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );

		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload: () => undefined,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );
	}, );

	test( 'should set new `initial` to be `payload` when custom action is defined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				customAction() {
					return undefined;
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should set new `initial` to be `(ctaParam) => payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: ctaParam => ( {
							...ctaParam.initial,
							...changes,
						} ),
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should reset with test1 = 0', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );
				const current = {
					...initial,
					test1: 0,
				};
				const newInitial = {
					...initial,
					test1: -1,
				};
				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaParam => ( {
							...ctaParam.initial,
							test1: -1,
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( { test1: initial.test1, }, );

				act( () => {
					act( () => {
						result.current[ 1 ]( {
							type: 'reset',
						}, );
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not `reset` to `initial` if `payload = () => undefined`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.update( changes, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: () => undefined,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );
			}, );
		}, );

		describe( 'with options', () => {
			test( 'should reset with test1 = 0', () => {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );
				const current = {
					...initial,
					test1: 0,
				};
				const newInitial = {
					...initial,
					test1: -1,
				};

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaParam => ( {
							...ctaParam.initial,
							test1: -1,
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( { test1: initial.test1, }, );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						options: { rejectNegativeTest1: true, },
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should set new `initial` to be `(ctaParam) => payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: ctaParam => ( {
							...ctaParam.initial,
							...changes,
						} ),
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not `reset` to `initial` if `payload = () => undefined`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );

				act( () => {
					result.current[ 1 ].cta.update( changes, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: () => undefined,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );
			}, );
		}, );
	}, );
}, );
