import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, updateCTAParam, updateCTAWithOptionParam, } from './setup/simple';

const actions = {
	customAction() {
		return undefined;
	},
};

// Ensures typescript checking works. Primary tests are in __tests__/useCTA.dispatch.cta.update.test.ts

describe( 'dispatch({type: "update", payload: unknown})', () => {
	test( 'should `update` "test2"', function() {
		const payload = {
			test2: 'me',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...payload,
		};

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
			result.current[ 1 ].cta.update( initial, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should `update` "test2" when custom action is defined', function() {
		const payload = {
			test1: 2,
		};
		const nextState = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
	}, );

	test( 'should `update` when `payload` is function', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: () => changes,
			}, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( {
			...initial,
			...changes,
		}, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );
	}, );

	test( 'should not `update` when `payload` is function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: () => payload,
			}, );
		}, );

		expect( result.current[ 0 ] === initial, ).toBe( true, );
		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should not `update` when `payload` does not change state', function() {
		const payload = { test1: 1, };
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( result.current[ 0 ] === initial, ).toBe( true, );
		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should update', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: 1000,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update using () => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: 1000,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update using (ctaParam) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const test1 = result.current[ 1 ].state.current.test1 + result.current[ 1 ].state.initial.test1;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: ctaState.current.test1 + ctaState.initial.test1,
						} ),
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					test1,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
					test1,
				}, );
			}, );

			test( 'should not update using negative Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );

				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update using negative () => Partial<Initial> without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );

				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update using negative (ctaState) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update with () => undefined', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => undefined,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );

				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );
		}, );

		describe( 'with options', () => {
			test( 'should update without using option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update with option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
						options: {
							rejectNegativeTest1: false,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update using () => Partial<Initial> without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -2,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update using () => Partial<Initial> with option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -2,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => payload,
						options: {
							rejectNegativeTest1: false,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					...payload,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should update using (ctaState) => Partial<Initial> without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const test1 = -( result.current[ 1 ].state.current.test1 + result.current[ 1 ].state.initial.test1 );
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					test1,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
					test1,
				}, );
			}, );

			test( 'should update using (ctaState) => Partial<Initial> with option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const test1 = -( result.current[ 1 ].state.current.test1 + result.current[ 1 ].state.initial.test1 );
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
						options: {
							rejectNegativeTest1: false,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( {
					...initial,
					test1,
				}, );

				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
					test1,
				}, );
			}, );

			test( 'should not update using negative Partial<Initial> without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
						options: {
							rejectNegativeTest1: true,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update using negative () => Partial<Initial> without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => payload,
						options: {
							rejectNegativeTest1: true,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update using negative (ctaState) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
						options: {
							rejectNegativeTest1: true,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update with () => undefined without option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => undefined,
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );

			test( 'should not update with () => undefined with option', () => {
				const { result, } = renderHook( () => useCTA( updateCTAWithOptionParam, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => undefined,
						options: {
							rejectNegativeTest1: false,
						},
					}, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );
		}, );
	}, );
}, );
