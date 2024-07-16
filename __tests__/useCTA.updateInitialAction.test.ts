import { act, renderHook, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
import { initial, initialChanges, } from './setup/simple';

describe( 'updateInitialAction', () => {
	const nextStatePartial: Partial<typeof initial> = {
		test1: 7,
		test2: 'updateInitialAction',
	};

	const params = returnUseCTAParameter( {
		initial,
		actions: {
			updateInitial( ctaState, payload, option?: boolean, ) {
				if ( option ) {
					return payload;
				}

				return {
					...payload,
					test2: payload.test2 === 'updateInitialAction' ? 'done' : ctaState.current.test2,
				};
			},
		},
	}, );

	test( 'should use augmented `updateInitial`', () => {
		const nextChange: Partial<typeof initial> = {
			...nextStatePartial,
			test2: 'done',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdateInitial( state, ) {
					return state.updateInitialAction( {
						...state.current,
						...nextStatePartial,
					}, );
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextChange,
		};

		act( () => {
			result.current[ 1 ].cta.customUpdateInitial();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( null, );
		expect( result.current[ 1 ].state.initial, ).toEqual( nextState, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateInitial',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should use augmented `updateInitial` with option', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdateInitialWithOption( state, ) {
					return state.updateInitialAction(
						{
							...state.current,
							...nextStatePartial,
						},
						{ options: true, },
					);
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextStatePartial,
		};

		act( () => {
			result.current[ 1 ].cta.customUpdateInitialWithOption();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( null, );
		expect( result.current[ 1 ].state.initial, ).toEqual( nextState, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateInitialWithOption',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not use augmented `updateInitial`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdateInitialDefault( state, ) {
					return state.updateInitialAction(
						{
							...state.current,
							...nextStatePartial,
						},
						{
							useDefault: true,
						},
					);
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextStatePartial,
		};

		act( () => {
			result.current[ 1 ].cta.customUpdateInitialDefault();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateInitialDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );
}, );
