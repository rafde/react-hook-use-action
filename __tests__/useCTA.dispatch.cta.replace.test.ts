import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { changes, initial, payload, } from './setup/simple';

describe( 'dispatch.cta.replace( payload )', function() {
	test( 'should `replace` state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ], ).toEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

		act( () => {
			result.current[ 1 ].cta.replace( initial, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();
	}, );

	test( 'should `replace` state when `payload` is a function', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ], ).toEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

		act( () => {
			result.current[ 1 ].cta.replace( initial, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();
	}, );

	test( 'should not `replace` state when function `payload` returns `null`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			// @ts-expect-error making sure invalid return is not evaluated
			result.current[ 1 ].cta.replace( () => null, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();
	}, );

	test( 'should not `replace` state when `payload` is a function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();

		act( () => {
			result.current[ 1 ].cta.replace( initial, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();
	}, );

	test( 'should `replace` state when custom action is defined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				customAction() {
					return undefined;
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ], ).toEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

		act( () => {
			result.current[ 1 ].cta.replace( initial, );
		}, );

		expect( result.current[ 0 ], ).toEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBeNull();
	}, );

	describe( 'as augmented action', function() {

	}, );
}, );
