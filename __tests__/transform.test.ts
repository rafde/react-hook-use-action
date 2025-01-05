import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { UseCTAParameterTransform, } from '../src/types/UseCTAParameterTransform';
import { initial, } from './setup/simple';

describe( 'useCTA parameter: transform', () => {
	const _transform: UseCTAParameterTransform<typeof initial> = ( payload, transformCTAHistory, ) => {
		let {
			test2,
		} = payload;
		const {
			actionType,
			customAction,
		} = transformCTAHistory;

		if ( typeof test2 === 'string' && test2.length > 10 && actionType.endsWith( 'Initial', ) ) {
			( {
				test2,
			} = transformCTAHistory.initial );
		}

		if ( customAction ) {
			test2 = String( customAction, );
		}

		return {
			...payload,
			test2,
		};
	};
	const transform = jest.fn( _transform, );

	test( 'should not transform the state payload', async() => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			transform,
		}, ), );
		const payload = {
			test2: '012345678911',
		};
		act( () => {
			result.current[ 1 ].cta.updateInitial( payload, );
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
	}, );

	test( 'should transform the state payload', async() => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			transform,
		}, ), );
		const payload = {
			test1: 34343,
			test2: 'test',
		};
		act( () => {
			result.current[ 1 ].cta.update( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			...payload,
		}, );
	}, );

	test( 'should transform the state payload with custom action', async() => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			transform,
			actions: {
				custom( state, ) {
					return state.updateInitialAction( {
						test2: '343432342342342',
					}, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.custom();
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			test2: 'custom',
		}, );
	}, );
}, );
