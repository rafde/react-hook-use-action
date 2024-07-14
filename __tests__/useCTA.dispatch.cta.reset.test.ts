import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, payload, resetCTAParams, resetCTAWithOptionsParams, } from './setup/simple';

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

		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
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
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
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
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.current, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( current, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( current, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
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

		expect( result.current[ 0 ], ).toStrictEqual( current, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.reset();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initialExtra, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( current, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should `reset` to `initial`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.update( payload, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
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
					result.current[ 1 ].cta.replaceInitial(
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
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
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
					result.current[ 1 ].cta.replaceInitial( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( newChanges, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( newChanges, );
			}, );
		}, );

		describe( 'with options', () => {
			test( 'should set new `initial`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );
				act( () => {
					result.current[ 1 ].cta.update( payload, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should `reset` with `test1 = 0`', () => {
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
					result.current[ 1 ].cta.replaceInitial(
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
					result.current[ 1 ].cta.reset( undefined, { rejectNegativeTest1: true, }, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not `reset` when `initial.test2 = "be cool"`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );
				const newInitial = {
					...resetCTAWithOptionsParams.initial,
					test2: 'be cool',
				};
				const newChanges = {
					test2: resetCTAWithOptionsParams.initial.test2,
				};

				act( () => {
					result.current[ 1 ].cta.replaceInitial( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( newChanges, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( newChanges, );
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

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should set new `initial` to be `payload` once if `payload` is the same', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.reset( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );

		// ensure that no change happens if the same `payload` is sent again
		act( () => {
			result.current[ 1 ].cta.reset( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
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
			result.current[ 1 ].cta.replaceInitial( newInitial, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );

		act( () => {
			result.current[ 1 ].cta.reset( () => undefined, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( newInitial, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
			test2: initial.test2,
		}, );
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

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
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

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should set new `initial` to be `payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( payload, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
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

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not `reset` when `test2 = "be cool"`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should set new `initial` to be `(ctaParam) => payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						...changes,
					} ), );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
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
					result.current[ 1 ].cta.reset( () => undefined, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );
			}, );
		}, );

		describe( 'with options', () => {
			test( 'should set new `initial` to be `payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( payload, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should `reset` with `test1 = 0`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );
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
						{
							rejectNegativeTest1: true,
						},
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( current, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not `reset` when `test2 = "be cool"`', () => {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						test2: 'be cool',
					} ), );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should set new `initial` to be `(ctaParam) => payload`', function() {
				const { result, } = renderHook( () => useCTA( resetCTAWithOptionsParams, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( {
						...ctaParam.initial,
						...changes,
					} ), );
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
					result.current[ 1 ].cta.reset( () => undefined, );
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
