import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import {
	arbitraryKey,
	changes,
	initial,
	initialChanges,
	payload,
	updateInitialCTAParam,
} from './setup/simple';

const actions = {
	customAction() {
		return undefined;
	},
};

describe( 'dispatch.cta.updateInitial( payload )', function() {
	test( 'should `updateInitial`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should `updateInitial` when custom action is defined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
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
			result.current[ 1 ].cta.updateInitial( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( { 'arbitrary key': undefined, }, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should `updateInitial` when `payload = () => Partial<Initial>`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( () => changes, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: () => changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should have `changes = null` if `current` and `initial` are the same', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( changes, );
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( () => payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: () => payload,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `null`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			// @ts-expect-error making sure invalid return is not evaluated
			result.current[ 1 ].cta.updateInitial( () => null, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );

		const updateInitialCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				// @ts-expect-error making sure invalid return is not evaluated
				payload: () => null,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should `updateInitial`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				act( () => {
					result.current[ 1 ].cta.updateInitial( changes, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should `updateInitial` when custom action is defined', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...updateInitialCTAParam,
						...actions,
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial( changes, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should have `changes` when setting new `initial` with arbitrary key', function() {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				const payload = {
					...initial,
					...arbitraryKey,
				};
				act( () => {
					result.current[ 1 ].cta.updateInitial( payload, );
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( { 'arbitrary key': undefined, }, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should update when `payload = () => Partial<Initial>`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						() => changes,
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: () => changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should update when `payload = (ctaParam) => Partial<Initial>`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				const test1 = result.current[ 1 ].state.current.test1 + result.current[ 1 ].state.initial.test1;
				const nextState = {
					...initial,
					test1,
				};

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaState => ( {
							test1: ctaState.current.test1 + ctaState.initial.test1,
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( nextState, );
				expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toStrictEqual( {
					test1: initial.test1,
				}, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: ctaState => ( {
							test1: ctaState.initial.test1,
						} ),
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update using negative Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				const payload = {
					test1: -1,
				};
				act( () => {
					result.current[ 1 ].cta.updateInitial(
						payload,
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update using negative (ctaState) => Partial<Initial>', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				act( () => {
					result.current[ 1 ].cta.updateInitial(
						ctaState => ( {
							test1: -( ctaState.current.test1 + ctaState.initial.test1 ),
						} ),
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: ctaState => ( {
							test1: ctaState.initial.test1,
						} ),
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );

			test( 'should not update with () => undefined', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						() => undefined,
					);
				}, );

				expect( result.current[ 0 ], ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toBe( null, );
				expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
				expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
				expect( result.current[ 1 ].state.changes, ).toBe( null, );

				const updateInitialCTADispatchState = result.current[ 1 ].state;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: () => undefined,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
			}, );
		}, );
	}, );
}, );
