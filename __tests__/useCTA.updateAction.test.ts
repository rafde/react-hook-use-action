import { act, renderHook, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'updateAction', () => {
	const nextStatePartial: Partial<typeof initial> = {
		test1: 7,
		test2: 'updateAction',
	};

	const params = returnUseCTAParameter( {
		initial,
		actions: {
			update( ctaState, payload, test: boolean, ) {
				if ( test ) {
					return payload;
				}
				return {
					...payload,
					test2: payload.test2 === 'updateAction' ? 'done' : ctaState.current.test2,
				};
			},
		},
	}, );

	test( 'should use augmented `update` without option', () => {
		const nextChange = {
			...nextStatePartial,
			test2: 'done',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdate( state, ) {
					return state.updateAction( nextStatePartial, );
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextChange,
		};
		act( () => {
			result.current[ 1 ].cta.customUpdate();
		}, );
		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( nextChange, );
		expect( result.current[ 1 ].state.current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdate',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should use augmented `update` with option', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdateWithOption( state, ) {
					return state.updateAction( nextStatePartial, { options: true, }, );
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextStatePartial,
		};
		act( () => {
			result.current[ 1 ].cta.customUpdateWithOption();
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( nextStatePartial, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateWithOption',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not use augmented `update`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customUpdateDefault( state, ) {
					return state.updateAction( nextStatePartial, { useDefault: true, }, );
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextStatePartial,
		};
		act( () => {
			result.current[ 1 ].cta.customUpdateDefault();
		}, );
		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( nextStatePartial, );
		expect( result.current[ 1 ].state.current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );
}, );
