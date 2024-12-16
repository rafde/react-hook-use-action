import { act, renderHook, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'resetAction', () => {
	const nextStatePartial: typeof initial = {
		test1: 7,
		test2: 'resetAction',
		test3: false,
		2: 4,
	};
	const emptyPayload: typeof initial = {
		test1: 100,
		test2: 'empty resetAction',
		test3: false,
		2: 404,
	};
	const params = returnUseCTAParameter( {
		initial,
		actions: {
			reset( ctaState, payload, ) {
				if ( !payload ) {
					return emptyPayload;
				}
				return {
					...payload,
					test2: payload.test2 === 'resetAction' ? 'done' : ctaState.current.test2,
				};
			},
		},
	}, );

	test( 'should use augmented `reset`', () => {
		const { result, } = renderHook( () => useCTA( {
			...params,
			initial,
			actions: {
				...params.actions,
				customReset( state, ) {
					return state.resetAction();
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customReset();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( emptyPayload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( emptyPayload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customReset',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not trigger with invalid `payload`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customResetInvalidArray( state, ) {
					// @ts-expect-error check that it doesn't trigger for invalid `payload`
					return state.resetAction( [], );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customResetInvalidArray();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customResetInvalidArray',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not trigger with `payload = null`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customResetNull( state, ) {
					// @ts-expect-error check that it doesn't trigger for invalid `payload`
					return state.resetAction( null, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customResetNull();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customResetNull',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should use augmented `reset` with `payload`', () => {
		const nextState = {
			...initial,
			...nextStatePartial,
		};
		const next = {
			...nextState,
			test2: 'done',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customResetWithPayload( state, ) {
					return state.resetAction( nextState, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customResetWithPayload();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( next, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( next, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customResetWithPayload',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not use augmented `reset`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customResetUndefinedDefault( state, ) {
					return state.resetAction(
						undefined,
						{
							useDefault: true,
						},
					);
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customResetUndefinedDefault();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customResetUndefinedDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not use augmented `reset` with `payload`', () => {
		const nextState = {
			...initial,
			...nextStatePartial,
		};

		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customResetNextStateDefault( state, ) {
					return state.resetAction(
						nextState,
						{
							useDefault: true,
						},
					);
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customResetNextStateDefault();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customResetNextStateDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );
