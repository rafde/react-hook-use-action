import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, payload, resetCTAParams, } from './setup/simple';

describe( 'dispatch.cta.reset()', () => {
	test( 'should `reset` to `initial`', function() {
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

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
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

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
	}, );

	test( 'should `reset` using `init` result', function() {
		const payload = {
			test1: 2,
		};
		const initExtra = {
			oops: 'my mistake',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			onInit( initial, ) {
				return {
					...initial,
					...initExtra,
				};
			},
		}, ), );
		const initialExtra = {
			...initial,
			...initExtra,
		};
		const current = {
			...initial,
			...initExtra,
			...payload,
		};
		expect( result.current[ 0 ].initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].current, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( current, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( current, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
	}, );

	test( 'should `reset` using `init` and custom action is defined', function() {
		const payload = {
			test1: 2,
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
			actions: {
				customAction() {
					return undefined;
				},
			},
		}, ), );
		const initialExtra = {
			...initial,
			...initExtra,
		};
		const current = {
			...initial,
			...initExtra,
			...payload,
		};
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( current, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].previous, ).toStrictEqual( current, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should `reset` to `initial`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.update( payload, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );

			test( 'should `reset` with test1 = 0', () => {
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

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( { test1: initial.test1, }, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( current, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( current, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );

			test( 'should not `reset` when `initial.test2 = "be cool"`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );
				const newInitial = {
					...resetCTAParams.initial,
					test2: 'be cool',
				};
				const newChanges = {
					test2: resetCTAParams.initial.test2,
				};

				act( () => {
					result.current[ 1 ].cta.updateInitial( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( newChanges, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( newChanges, );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
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
			result.current[ 1 ].cta.reset( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );
	}, );

	test( 'should set new `initial` when `payload` is a function and returns a new state', function() {
		const payload = {
			test2: 'me',
			test1: 100,
			test3: false,
			2: 22,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.reset( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload: () => payload,
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
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

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );

		act( () => {
			result.current[ 1 ].cta.reset( () => undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload: () => undefined,
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
	}, );

	test( 'should not set new `initial` when `payload` = `initial`', function() {
		const payload = {
			test1: 1,
			test2: 'me',
			test3: true,
			2: 2,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.reset( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
				payload: () => payload,
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
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
			result.current[ 1 ].cta.reset( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const [resetCTADispatchState,] = result.current;
		act( () => {
			result.current[ 1 ]( {
				type: 'reset',
			}, );
		}, );

		expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
	}, );

	test( 'should not reset when previous is null', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		const [state,] = result.current;
		act( () => {
			// @ts-expect-error test `null` case
			result.current[ 1 ].cta.reset( state => state.previous, );
		}, );

		expect( result.current[ 0 ], ).toBe( state, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should set new `initial` to be `payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( payload, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload,
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );

			test( 'should `reset` with `test1 = 0`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );
				const current = {
					...initial,
					test1: 0,
				};
				act( () => {
					result.current[ 1 ].cta.reset(
						ctaParam => ( {
							...ctaParam.initial,
							test1: -1,
						} ),
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( current, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( current, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );
			}, );

			test( 'should not `reset` when `test2 = "be cool"`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: ctaParam => ( {
							...ctaParam.initial,
							test2: 'be cool',
						} ),
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );

			test( 'should set new `initial` to be `(ctaParam) => payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						...changes,
					} ), );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: ctaParam => ( {
							...ctaParam.initial,
							...changes,
						} ),
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );

			test( 'should not `reset` to `initial` if `payload = () => undefined`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.update( changes, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.reset( () => undefined, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toStrictEqual( changes, );

				const [resetCTADispatchState,] = result.current;
				act( () => {
					result.current[ 1 ]( {
						type: 'reset',
						payload: () => undefined,
					}, );
				}, );

				expect( resetCTADispatchState === result.current[ 0 ], ).toBe( true, );
			}, );
		}, );
	}, );
}, );
