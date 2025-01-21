import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { returnCTAParameter, useCTA, } from '../src';
import {
	arbitraryKey,
	changes,
	initial,
	initialChanges,
	payload,
	updateInitialCTAParam,
} from './setup/simple';

const { actions, } = returnCTAParameter( {
	initial,
	actions: {
		customAction() {
			return {};
		},
	},
}, );

describe( 'dispatch.cta.updateInitial( payload )', function() {
	test( 'should `updateInitial`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `updateInitial` with consecutive changes', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitial( 'test1', changes.test1, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			test1: changes.test1,
		}, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test1: initial.test1,
		}, );

		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: {
					test2: changes.test2,
				},
			}, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...payload,
			...changes,
		}, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( {
			...initial,
			test1: changes.test1,
		}, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test1: initial.test1,
			test2: initial.test2,
		}, );
	}, );

	test( 'should `updateInitial` when custom action is defined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
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

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( { 'arbitrary key': undefined, }, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `updateInitial` when `payload = () => Partial<Initial>`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( () => changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: () => changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should have `changes = null` if `current` and `initial` are the same', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( changes, );
			result.current[ 1 ].cta.updateInitial( changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: changes,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				payload: () => payload,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `null`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			// @ts-expect-error making sure invalid return is not evaluated
			result.current[ 1 ].cta.updateInitial( () => null, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );

		const updateInitialCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'updateInitial',
				// @ts-expect-error making sure invalid return is not evaluated
				payload: () => null,
			}, );
		}, );
		expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	describe( 'as augmented action', function() {
		describe( 'without options', () => {
			test( 'should `updateInitial`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				act( () => {
					result.current[ 1 ].cta.updateInitial( changes, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
			}, );

			test( 'should `updateInitial` when custom action is defined', function() {
				const { result, } = renderHook( () => useCTA( {
					...updateInitialCTAParam,
					initial,
					actions: {
						...updateInitialCTAParam.actions,
						...actions,
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial( changes, );
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
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

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toStrictEqual( { 'arbitrary key': undefined, }, );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
			}, );

			test( 'should update when `payload = () => Partial<Initial>`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						() => changes,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
				expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( initialChanges, );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: () => changes,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
			}, );

			test( 'should update when `payload = (ctaParam) => Partial<Initial>`', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );
				const test1 = result.current[ 0 ].current.test1 + result.current[ 0 ].initial.test1;
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

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( nextState, );
				expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].changes, ).toStrictEqual( {
					test1: initial.test1,
				}, );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: ctaState => ( {
							test1: ctaState.initial.test1,
						} ),
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
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

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
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

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: ctaState => ( {
							test1: ctaState.initial.test1,
						} ),
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
			}, );

			test( 'should not update with () => undefined', () => {
				const { result, } = renderHook( () => useCTA( updateInitialCTAParam, ), );

				act( () => {
					result.current[ 1 ].cta.updateInitial(
						() => undefined,
					);
				}, );

				expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previous, ).toBeNull( );
				expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
				expect( result.current[ 0 ].previousInitial, ).toBeNull( );
				expect( result.current[ 0 ].changes, ).toBeNull( );

				const updateInitialCTADispatchState = result.current[ 1 ].history;
				act( () => {
					result.current[ 1 ]( {
						type: 'updateInitial',
						payload: () => undefined,
					}, );
				}, );
				expect( updateInitialCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
			}, );
		}, );
	}, );
}, );
