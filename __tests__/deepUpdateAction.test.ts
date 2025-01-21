import { describe, test, expect, } from 'vitest';
import { act, renderHook, waitFor, } from '@testing-library/react';
import { useCTA, type GetCTAStateValue, returnCTAParameter, } from '../src';
import { nestedInitial, } from './setup/simple';

describe( 'updateAction', () => {
	const initial = nestedInitial;

	test( 'update a deep string property with a value', async() => {
		const changes = false;
		const afterActionChange = vi.fn( p => p, );
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: GetCTAStateValue<typeof state.current, 'user.profile.1.notifications.email'>, ) {
					return state.deepUpdateAction( 'user.profile.1.notifications.email', payload, );
				},
			},
			afterActionChange,
		}, ), );

		expect( afterActionChange, ).not.toHaveBeenCalled();

		act( () => {
			result.current[ 1 ].cta.updateEmailStatus( changes, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							email: changes,
						},
					},
				},
			},
		}, );

		await waitFor( () => expect( afterActionChange, ).toHaveBeenCalledTimes( 1, ), );

		act( () => {
			result.current[ 1 ].cta.updateEmailStatus( changes, );
		}, );

		await waitFor( () => expect( afterActionChange, ).toHaveBeenCalledTimes( 1, ), );
	}, );

	test( 'updates a deep string property with partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30,
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateNotif( state, payload: GetCTAStateValue<typeof state.current, 'user.profile.1.notifications'>, ) {
					return state.deepUpdateAction( 'user.profile.1.notifications', payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							...changes,
							frequency: {
								...initial.user.profile[ 1 ].notifications.frequency,
								...changes.frequency,
							},
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates object with dot in key', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateDisplayName( state, payload: GetCTAStateValue<typeof state.current, 'user.profile\\.name'>, ) {
					return state.deepUpdateAction( 'user.profile\\.name', payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateDisplayName( 'Jane', );
		}, );

		expect( result.current[ 0 ].current.user[ 'profile.name' ], ).toBe( 'Jane', );
	}, );

	test( 'update a deep array property with a value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: GetCTAStateValue<typeof state.current, 'user.profile.1.notifications.email'>, ) {
					return state.deepUpdateAction( ['user', 'profile', 1, 'notifications', 'email',], payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateEmailStatus( changes, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							email: changes,
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates a deep string property with partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30,
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateNotif( state, payload: GetCTAStateValue<typeof state.current, 'user.profile.1.notifications'>, ) {
					return state.deepUpdateAction( ['user', 'profile', 1, 'notifications',], payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							...changes,
							frequency: {
								...initial.user.profile[ 1 ].notifications.frequency,
								...changes.frequency,
							},
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates object with dot in key', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateDisplayName( state, payload: GetCTAStateValue<typeof state.current, 'user.profile\\.name'>, ) {
					return state.deepUpdateAction( ['user', 'profile.name',], payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateDisplayName( 'Jane', );
		}, );

		expect( result.current[ 0 ].current.user[ 'profile.name' ], ).toBe( 'Jane', );
	}, );

	test( 'update number key', () => {
		const changes = {
			greet: '123',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				update1( state, payload: GetCTAStateValue<typeof state.current, 1>, ) {
					return state.deepUpdateAction( 1, payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update1( changes, );
		}, );

		expect( result.current[ 0 ].current[ 1 ], ).toStrictEqual( {
			...initial[ 1 ],
			...changes,
		}, );
	}, );

	test( 'update nested payload', () => {
		const changes = {
			user: {
				'profile.name': 'Joe',
				'[profile.name]': 'Jo',
				profile: {
					name: 'Jon',
				},
			},
			'[friends]': ['Jin', 'Joe', 'Jac',],
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				custom( state, ) {
					return state.deepUpdateAction( changes, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.custom();
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			...changes,
			user: {
				...initial.user,
				...changes.user,
				profile: {
					...initial.user.profile,
					...changes.user.profile,
				},
			},
		}, );
	}, );

	test( 'bypass overridden deepUpdate', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30,
			},
		};
		const props = returnCTAParameter( {
			actions: {
				updateNotif(
					state,
					payload: GetCTAStateValue<typeof state.current, 'user.profile.1.notifications'>,
					useDefault = true,
				) {
					return state.deepUpdateAction( ['user', 'profile', 1, 'notifications',], payload, { useDefault, }, );
				},
				deepUpdate( ctaState, payload, ) {
					return {
						...payload,
						1: {
							greet: 'deepUpdate',
						},
					};
				},
			},
			initial,
			transform: payload => payload,
		}, );
		// @ts-expect-error -- this error is incorrect.
		const deepUpdate = vi.spyOn( props.actions, 'deepUpdate', );
		const transform = vi.spyOn( props, 'transform', );
		const { result, } = renderHook( () => useCTA( props, ), );

		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( deepUpdate, ).not.toHaveBeenCalled();
		expect( result.current[ 0 ].current, ).toHaveProperty( '1', initial[ 1 ], );

		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, false, );
		}, );
		expect( result.current[ 0 ].current, ).toHaveProperty( '1', { ...initial[ 1 ],
			greet: 'deepUpdate', }, );
		expect( deepUpdate, ).toHaveBeenCalled();
		expect( transform, ).toHaveBeenCalled();
	}, );

	test( 'use deepUpdateAction to update multiple properties', () => {
		const props = returnCTAParameter( {
			actions: {
				toggleModeAndEmailAndPush( { current: { user: { profile: { 1: one, }, }, }, deepUpdateAction, }, ) {
					return deepUpdateAction(
						'user.profile.1.notifications',
						{
							email: !one.notifications.email,
							push: !one.notifications.push,
						},
					).merge(
						'user.profile.1.the\\.me\\.s.mode',
						one[ 'the.me.s' ].mode === 'light' ? 'dark' : 'light',
					);
				},
			},
			initial,
		}, );
		const { result, } = renderHook( () => useCTA( props, ), );

		act( () => {
			result.current[ 1 ].cta.toggleModeAndEmailAndPush();
		}, );
		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.1.the\\.me\\.s', {
			...initial.user.profile[ 1 ][ 'the.me.s' ],
			mode: 'dark',
		}, );
		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.1.notifications', {
			...initial.user.profile[ 1 ].notifications,
			email: !initial.user.profile[ 1 ].notifications.email,
			push: !initial.user.profile[ 1 ].notifications.push,
		}, );
	}, );
}, );
