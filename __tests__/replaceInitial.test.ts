import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { initial, } from './setup/simple';

const actions = {
	customAction() {
		return undefined;
	},
};

describe( 'dispatch.cta.replaceInitial(state)', function() {
	test( 'should `replaceInitial` entire state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replaceInitial',
			test3: false,
			2: 22,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initial, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` entire state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replaceInitial',
			test3: false,
			2: 22,
			extra: 'key',
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			...initial,
			extra: undefined,
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` some state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replaceInitial',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` some state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replaceInitial',
			2: 22,
			extra: 'key',
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
			extra: undefined,
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
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
			test2: 'replaceInitial',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		act( () => {
			result.current[ 1 ].cta.replaceInitial( initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload: initial,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` when custom action is defined', function() {
		const someChanges = {
			test2: 'replaceInitial',
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
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload,
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );

describe( 'dispatch.cta.replaceInitial(() => newState | undefined))', function() {
	test( 'should `replaceInitial` entire state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replaceInitial',
			test3: false,
			2: 22,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( initial, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` entire state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			test1: 0,
			test2: 'replaceInitial',
			test3: false,
			2: 22,
			extra: 'key',
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			...initial,
			extra: undefined,
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` some state', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replaceInitial',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` some state including extra key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const someChanges = {
			test2: 'replaceInitial',
			2: 22,
			extra: 'key',
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
			extra: undefined,
		}, );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
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
			test2: 'replaceInitial',
			2: 22,
		};
		const payload = {
			...initial,
			...someChanges,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toBe( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => initial, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].changes, ).toBeNull( );

		const dispatchState = result.current[ 1 ].history;

		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload() {
					return initial;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should `replaceInitial` when custom action is defined', function() {
		const someChanges = {
			test2: 'replaceInitial',
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
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( payload, );
		expect( result.current[ 0 ].previousInitial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].changes, ).toStrictEqual( {
			test2: initial.test2,
			2: initial[ '2' ],
		}, );

		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ]( {
				type: 'replaceInitial',
				payload() {
					return payload;
				},
			}, );
		}, );

		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not `replaceInitial` entire state when callback returns undefined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );

	test( 'should not `replaceInitial` entire state when callback returns null', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const dispatchState = result.current[ 1 ].history;
		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previous, ).toBeNull( );
		expect( result.current[ 0 ].initial, ).toStrictEqual( initial, );
		expect( result.current[ 0 ].previousInitial, ).toBeNull( );
		expect( result.current[ 0 ].changes, ).toBeNull( );
		expect( dispatchState === result.current[ 1 ].history, ).toBe( true, );
	}, );
}, );
