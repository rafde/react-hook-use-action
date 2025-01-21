import { describe, test, expect, } from 'vitest';
import { act, renderHook, } from '@testing-library/react';
import {useCTA, type NestedCTAStateValue, returnCTAParameter} from "../src";
import {nestedInitial} from "./setup/simple";

describe( 'updateAction', () => {
	const initial = nestedInitial;

	test('update a deep string property with a value', () => {
		const changes = false;
		const {result} = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile.settings.notifications.email'>, ) {
					return state.deepUpdateInitialAction('user.profile.settings.notifications.email', payload, );
				}
			}
		}, ), );
		act(() => {
			result.current[1].cta.updateEmailStatus(changes);
		})
		expect(result.current[0].initial).toStrictEqual({
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					settings: {
						...initial.user.profile.settings,
						notifications: {
							...initial.user.profile.settings.notifications,
							email: changes,
						},
					},
				},
			},
		});
	})

	test('updates a deep string property with partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30
			}
		}
		const {result} = renderHook( () => useCTA( {
			initial,
			actions: {
				updateNotif( state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile.settings.notifications'>, ) {
					return state.deepUpdateInitialAction('user.profile.settings.notifications', payload, );
				}
			}
		}, ), );
		act(() => {
			result.current[1].cta.updateNotif(changes);
		})
		expect(result.current[0].initial).toStrictEqual({
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					settings: {
						...initial.user.profile.settings,
						notifications: {
							...initial.user.profile.settings.notifications,
							...changes,
							frequency: {
								...initial.user.profile.settings.notifications.frequency,
								...changes.frequency
							}
						}
					},
				},
			},
		});
	})

	test('updates object with dot in key', () => {
		const { result } = renderHook(() => useCTA({
			initial,
			actions: {
				updateDisplayName(state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile\\.name'>) {
					return state.deepUpdateInitialAction('user.profile\\.name', payload);
				}
			}
		}));

		act(() => {
			result.current[1].cta.updateDisplayName('Jane');
		});

		expect(result.current[0].initial.user['profile.name']).toBe('Jane');
	});

	test('update a deep array property with a value', () => {
		const changes = false;
		const {result} = renderHook( () => useCTA( {
			initial,
			actions: {
				updateEmailStatus( state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile.settings.notifications.email'>, ) {
					return state.deepUpdateInitialAction(['user','profile','settings','notifications','email'], payload, );
				}
			}
		}, ), );
		act(() => {
			result.current[1].cta.updateEmailStatus(changes);
		})
		expect(result.current[0].initial).toStrictEqual({
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					settings: {
						...initial.user.profile.settings,
						notifications: {
							...initial.user.profile.settings.notifications,
							email: changes,
						},
					},
				},
			},
		});
	})

	test('updates a deep string property with partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30
			}
		}
		const {result} = renderHook( () => useCTA( {
			initial,
			actions: {
				updateNotif( state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile.settings.notifications'>, ) {
					return state.deepUpdateInitialAction(['user','profile','settings','notifications'], payload, );
				}
			}
		}, ), );
		act(() => {
			result.current[1].cta.updateNotif(changes);
		})
		expect(result.current[0].initial).toStrictEqual({
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					settings: {
						...initial.user.profile.settings,
						notifications: {
							...initial.user.profile.settings.notifications,
							...changes,
							frequency: {
								...initial.user.profile.settings.notifications.frequency,
								...changes.frequency
							}
						}
					},
				},
			},
		});
	})

	test('updates object with dot in key', () => {
		const { result } = renderHook(() => useCTA({
			initial,
			actions: {
				updateDisplayName(state, payload: NestedCTAStateValue<typeof state.initial, 'user.profile\\.name'>) {
					return state.deepUpdateInitialAction(['user','profile.name'], payload);
				}
			}
		}));

		act(() => {
			result.current[1].cta.updateDisplayName('Jane');
		});

		expect(result.current[0].initial.user['profile.name']).toBe('Jane');
	});

	test('bypass overridden deepUpdate', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30
			}
		}
		const props = returnCTAParameter({
			actions: {
				updateNotif(
					state,
					payload: NestedCTAStateValue<typeof state.initial, 'user.profile.settings.notifications'>,
					useDefault = true,
				) {
					return state.deepUpdateInitialAction(['user', 'profile', 'settings', 'notifications'], payload, {useDefault,});
				},
				deepUpdateInitial(ctaState, payload) {
					return {
						...payload,
						1: {
							greet: 'deepUpdateInitial',
						}
					}
				}
			},
			initial,
			transform: (payload,) => payload
		});
		// @ts-expect-error -- this error is incorrect.
		const deepUpdate = vi.spyOn(props.actions, 'deepUpdateInitial');
		const transform = vi.spyOn(props, 'transform');
		const {result} = renderHook( () => useCTA(props, ), );

		act(() => {
			result.current[1].cta.updateNotif(changes);
		});
		expect(deepUpdate).not.toHaveBeenCalled();
		expect(result.current[0].initial).toHaveProperty('1', initial[1]);

		act(() => {
			result.current[1].cta.updateNotif(changes, false);
		});
		expect(result.current[0].initial).toHaveProperty('1', {...initial[1], greet: 'deepUpdateInitial'});
		expect(deepUpdate).toHaveBeenCalled();
		expect(transform).toHaveBeenCalled();
	})
});
