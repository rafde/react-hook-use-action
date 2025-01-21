import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import { useCTA, type GetCTAStateValue, returnCTAParameter, } from '../src';
import { nestedInitial, } from './setup/simple';

describe( 'updateAction', () => {
	const initial = nestedInitial;

	test( 'update a deep string property with a value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile.1.notifications.email'>, ) {
					return state.deepUpdateInitialAction( 'user.profile.1.notifications.email', payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateEmailStatus( changes, );
		}, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
				updateNotif( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile.1.notifications'>, ) {
					return state.deepUpdateInitialAction( 'user.profile.1.notifications', payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
				updateDisplayName( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile\\.name'>, ) {
					return state.deepUpdateInitialAction( 'user.profile\\.name', payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateDisplayName( 'Jane', );
		}, );

		expect( result.current[ 0 ].initial.user[ 'profile.name' ], ).toBe( 'Jane', );
	}, );

	test( 'update a deep array property with a value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile.1.notifications.email'>, ) {
					return state.deepUpdateInitialAction( ['user', 'profile', 1, 'notifications', 'email',], payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateEmailStatus( changes, );
		}, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
				updateNotif( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile.1.notifications'>, ) {
					return state.deepUpdateInitialAction( ['user', 'profile', 1, 'notifications',], payload, );
				},
			},
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
				updateDisplayName( state, payload: GetCTAStateValue<typeof state.initial, 'user.profile\\.name'>, ) {
					return state.deepUpdateInitialAction( ['user', 'profile.name',], payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateDisplayName( 'Jane', );
		}, );

		expect( result.current[ 0 ].initial.user[ 'profile.name' ], ).toBe( 'Jane', );
	}, );

	test( 'update number key', () => {
		const changes = {
			greet: '123',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				update1( state, payload: GetCTAStateValue<typeof state.initial, 1>, ) {
					return state.deepUpdateInitialAction( 1, payload, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update1( changes, );
		}, );

		expect( result.current[ 0 ].initial[ 1 ], ).toStrictEqual( {
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
					return state.deepUpdateInitialAction( changes, );
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.custom();
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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

	test( 'bypass overridden deepUpdateInitialAction', () => {
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
					payload: GetCTAStateValue<typeof state.initial, 'user.profile.1.notifications'>,
					useDefault = true,
				) {
					return state.deepUpdateInitialAction( ['user', 'profile', 1, 'notifications',], payload, { useDefault, }, );
				},
				deepUpdateInitial( ctaState, payload, ) {
					return {
						...payload,
						1: {
							greet: 'deepUpdateInitial',
						},
					};
				},
			},
			initial,
			transform: payload => payload,
		}, );
		// @ts-expect-error -- this error is incorrect.
		const deepUpdateInitialAction = vi.spyOn( props.actions, 'deepUpdateInitial', );
		const transform = vi.spyOn( props, 'transform', );
		const { result, } = renderHook( () => useCTA( props, ), );

		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, );
		}, );
		expect( deepUpdateInitialAction, ).not.toHaveBeenCalled();
		expect( result.current[ 0 ].initial, ).toHaveProperty( '1', initial[ 1 ], );

		act( () => {
			result.current[ 1 ].cta.updateNotif( changes, false, );
		}, );
		expect( result.current[ 0 ].initial, ).toHaveProperty( '1', { ...initial[ 1 ],
			greet: 'deepUpdateInitial', }, );
		expect( deepUpdateInitialAction, ).toHaveBeenCalled();
		expect( transform, ).toHaveBeenCalled();
	}, );
}, );
