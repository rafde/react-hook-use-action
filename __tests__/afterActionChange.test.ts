import { act, renderHook, waitFor, } from '@testing-library/react';
import { useCTA, } from '../src';
import { UseCTAParameterAfterActionChange, } from '../src/types/UseCTAParameterAfterActionChange';
import { initial, } from './setup/simple';

describe( 'afterActionChange', () => {
	const afterActionChangeFn: UseCTAParameterAfterActionChange<typeof initial> = async() => {
		// console.log( 'history:', history, );
	};

	test( 'should not run when `update` is called a payload equals the current state', async() => {
		const afterActionChange = jest.fn( afterActionChangeFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			afterActionChange,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.update( initial, );
		}, );
		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 0, );
		}, );
	}, );

	test( 'should run after `update` has changed the hook state history', async() => {
		const afterActionChange = jest.fn( afterActionChangeFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			afterActionChange,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( { test1: 333, }, );
		}, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );
		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( result.current[ 0 ], 'update', undefined, );
		}, );
	}, );

	test( 'should run after a custom action using `reset` has changed the hook state history', async() => {
		const afterActionChange = jest.fn( afterActionChangeFn, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			afterActionChange,
			actions: {
				customUpdate( state, test2: string, ) {
					return state.resetAction( {
						...state.current,
						test2,
					}, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customUpdate( 'custom', );
		}, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );
		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( result.current[ 0 ], 'reset', 'customUpdate', );
		}, );
	}, );

	test( 'should run after a custom action using overridden `replace` has changed the hook state history', async() => {
		const afterActionChange = jest.fn( afterActionChangeFn, );
		const replace = jest.fn( ( state, payload, ) => payload, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			afterActionChange,
			actions: {
				replace,
				customUpdate( state, test2: string, ) {
					return state.replaceAction( {
						...state.current,
						test2,
					}, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customUpdate( 'custom', );
		}, );

		expect( replace, ).toHaveBeenCalledTimes( 1, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );
		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( result.current[ 0 ], 'replace', 'customUpdate', );
		}, );
	}, );

	test( 'should run after a custom action using default `replace` has changed the hook state history', async() => {
		const afterActionChange = jest.fn( afterActionChangeFn, );
		const replace = jest.fn( ( state, payload, ) => payload, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			afterActionChange,
			actions: {
				replace,
				customUpdate( state, test2: string, ) {
					return state.replaceAction( {
						...state.current,
						test2,
					}, { useDefault: true, }, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.customUpdate( 'custom', );
		}, );

		expect( replace, ).toHaveBeenCalledTimes( 0, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );
		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( result.current[ 0 ], 'replace', 'customUpdate', );
		}, );
	}, );
}, );
