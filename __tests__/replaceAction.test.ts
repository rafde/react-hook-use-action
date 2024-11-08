import { act, renderHook, } from '@testing-library/react';
import { returnUseCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'replaceAction', () => {
	const nextStatePartial: Partial<typeof initial> = {
		test1: 7,
		test2: 'replaceAction',
	};
	const params = returnUseCTAParameter( {
		initial,
		actions: {
			replace( ctaState, payload, ) {
				return {
					...initial,
					...payload,
					test2: payload.test2 === 'replaceAction' ? 'done' : ctaState.current.test2,
				};
			},
		},
	}, );

	test( 'should use augmented `replace`', () => {
		const nextChange = {
			...nextStatePartial,
			test2: 'done',
		};
		const { result, } = renderHook( () => useCTA( {
			...params,
			initial,
			actions: {
				...params.actions,
				customReplace( state, ) {
					return state.replaceAction( {
						...initial,
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
			result.current[ 1 ].cta.customReplace();
		}, );
		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( nextChange, );
		expect( result.current[ 1 ].state.current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customReplace',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );

	test( 'should not use augmented `replace`', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				...params.actions,
				customReplaceDefault( state, ) {
					return state.replaceAction(
						{
							...initial,
							...nextStatePartial,
						},
						{ useDefault: true, },
					);
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextStatePartial,
		};
		act( () => {
			result.current[ 1 ].cta.customReplaceDefault();
		}, );
		expect( result.current[ 0 ], ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( nextStatePartial, );
		expect( result.current[ 1 ].state.current, ).toStrictEqual( nextState, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].state;
		act( () => {
			result.current[ 1 ]( {
				type: 'customReplaceDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].state, ).toBe( true, );
	}, );
}, );
