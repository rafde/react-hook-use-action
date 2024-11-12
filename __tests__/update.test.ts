import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, updateCTAParam, } from './setup/simple';

const actions = {
	customAction() {
		return undefined;
	},
};

describe( 'dispatch.cta.update( partialState | ( state => partialState | undefined ))', function() {
	test( 'should `update` "test1"', function() {
		const payload = {
			test1: 2,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...payload,
		};
		act( () => {
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should set changes to null if payload is initial', function() {
		const payload = {
			test1: 2,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...payload,
		};
		act( () => {
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.update( initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

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
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
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
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should `update` "test1" and "test2"', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...changes,
		};

		act( () => {
			result.current[ 1 ].cta.update( changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: changes,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should `update` when `payload` is function', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...changes,
		};

		act( () => {
			result.current[ 1 ].cta.update( () => changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( changes, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: () => changes,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not `update` when `payload` is function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( () => payload, );
		}, );

		expect( result.current[ 0 ].current === initial, ).toBe( true, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );

		const updateCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'update',
				payload: () => payload,
			}, );
		}, );

		expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not `update` when `payload` does not change state', function() {
		const payload = { test1: 1, };
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current === initial, ).toBe( true, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
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
				const nextState = {
					...initial,
					...payload,
				};
				act( () => {
					result.current[ 1 ].cta.update(
						payload,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should update using () => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: 1000,
				};
				const nextState = {
					...initial,
					...payload,
				};
				act( () => {
					result.current[ 1 ].cta.update(
						() => payload,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => payload,
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should update using (ctaParam) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const test1 = result.current[ 1 ].state.current.test1 + result.current[ 1 ].state.initial.test1;
				const nextState = {
					...initial,
					test1,
				};

				act( () => {
					result.current[ 1 ].cta.update(
						ctaState => ( {
							test1: ctaState.current.test1 + ctaState.initial.test1,
						} ),
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
					test1,
				}, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: ctaState.current.test1,
						} ),
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update using negative Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ].cta.update(
						payload,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update using negative (ctaState) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				act( () => {
					result.current[ 1 ].cta.update(
						ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update with () => undefined', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );

				act( () => {
					result.current[ 1 ].cta.update(
						() => undefined,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload: () => undefined,
					}, );
				}, );

				expect( updateCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );
		}, );
	}, );
}, );

describe( 'dispatch.cta.update(key, value)', function() {
	test( 'should `update` "test1"', function() {
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
			result.current[ 1 ].cta.update( 'test1', payload.test1, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
	}, );

	test( 'should not `update` "test1" once if "test1" is the same', function() {
		const payload = {
			test1: 2,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const nextState = {
			...initial,
			...payload,
		};
		act( () => {
			result.current[ 1 ].cta.update( 'test1', payload.test1, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );

		act( () => {
			result.current[ 1 ].cta.update( initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should not `update` "test1"', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( 'test1', initial.test1, );
		}, );

		expect( result.current[ 0 ].current === initial, ).toBe( true, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
	}, );

	test( 'should update "test2"', function() {
		const payload = {
			test2: 'me',
		};
		const nextState = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( 'test2', payload.test2, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
	}, );

	test( 'should update 2', function() {
		const payload = {
			2: 222,
		};
		const nextState = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( 2, payload[ 2 ], );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
	}, );

	test( 'should `update` "test2" when custom action is defined', function() {
		const payload = {
			test2: 2,
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
			result.current[ 1 ].cta.update( 'test2', payload.test2, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toBe( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should update', () => {
				const payload = {
					test1: 11,
				};
				const nextState = {
					...initial,
					...payload,
				};
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				act( () => {
					result.current[ 1 ].cta.update(
						'test1',
						payload.test1,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( payload, );
			}, );

			test( 'should not update', () => {
				const { result, } = renderHook( () => useCTA( updateCTAParam, ), );
				const payload = {
					test1: -11,
				};
				act( () => {
					result.current[ 1 ].cta.update(
						'test1',
						payload.test1,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );
			}, );
		}, );
	}, );
}, );
