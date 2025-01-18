import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { initial, } from './setup/simple';

const actions = {
	customAction() {
		return undefined;
	},
};

describe( 'dispatch.cta.replace(state)', function() {
	test( 'should `replace` entire state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replace',
			test3: false,
			2: 22,
		};
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` entire state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replace',
			test3: false,
			2: 22,
			extra: 'key',
		};
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` some state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` some state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
			extra: 'key',
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should set changes to null if payload is initial', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		act( () => {
			result.current[ 1 ].cta.replace( initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload: initial,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` when custom action is defined', function() {
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replace( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );

describe( 'dispatch.cta.replace(() => newState | undefined))', function() {
	test( 'should `replace` entire state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replace',
			test3: false,
			2: 22,
		};
		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` entire state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replace',
			test3: false,
			2: 22,
			extra: 'key',
		};
		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( payload, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` some state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` some state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
			extra: 'key',
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should set changes to null if payload is initial', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toBe( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		act( () => {
			result.current[ 1 ].cta.replace( () => initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return initial;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replace` when custom action is defined', function() {
		const someChanges = {
			test2: 'replace',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replace( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previous, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toStrictEqual( someChanges, );

		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'replace',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not `replace` entire state when callback returns undefined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ].cta.replace( () => undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not `replace` entire state when callback returns null', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ].cta.replace( () => undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );
