import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { returnCTAParameter, useCTA, } from '../src';
import { initial, } from './setup/simple';

describe( 'updateAction', () => {
	const nextStatePartial = {
		test1: 7,
		test2: 'updateAction',
	};

	const params = returnCTAParameter( {
		initial,
		actions: {
			update( ctaState, payload, ) {
				return {
					...payload,
					test2: payload.test2 === 'updateAction' ? 'done' : ctaState.current.test2,
				};
			},
		},
	}, );

	test( 'should use augmented `update`', () => {
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
		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( nextChange, );
		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdate',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should use custom increment update', () => {
		const payload = {
			test1: initial.test1 + 1,
		};
		const nextChange = {
			...initial,
			...payload,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				increment( state, ) {
					return {
						test1: state.current.test1 + 1,
					};
				},
			},
		}, ), );
		const nextState = {
			...initial,
			...nextChange,
		};
		act( () => {
			result.current[ 1 ].cta.increment();
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
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
		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( nextStatePartial, );
		expect( result.current[ 0 ].current, ).toStrictEqual( nextState, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );

		const customCTADispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'customUpdateDefault',
			}, );
		}, );

		expect( customCTADispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );
