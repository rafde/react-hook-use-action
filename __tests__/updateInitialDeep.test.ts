import {act, renderHook} from "@testing-library/react";
import { describe, test, expect, } from 'vitest';
import {useCTA} from "../src";
import {nestedInitial} from "./setup/simple";

describe('dispatch.cta.updateInitialDeep', () => {
	const initial = nestedInitial;

	test('updates a deep property with nested partial', () => {
		const changes = {
			user: {
				profile: {
					name: 'Jon',
					contacts: [
						{type: 'email', value: 'john.doe@example.com'},
						{type: 'phone', value: '777-777-7777'},
					],
					settings: {
						theme: {
							mode: 'light',
						}
					}
				},
				metadata: {
					visits: 99,
				}
			},
		}
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( changes, );
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...changes.user.profile,
					settings: {
						...initial.user.profile.settings,
						theme: {
							...initial.user.profile.settings.theme,
							...changes.user.profile.settings.theme,
						}
					}
				},
				metadata: {
					...initial.user.metadata,
					...changes.user.metadata,
				}
			}
		}, );
	});

	test('updates a deep property with array of keys and partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30
			}
		}
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( ['user', 'profile', 'settings', 'notifications'],  changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
					}
				}
			}
		}, );
	});

	test('updates a deep property with array of one key and value', () => {
		const changes = ['Tom'];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( ['[friends]'],  changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	});

	test('updates a deep property with array of keys and value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( ['user', 'profile', 'settings', 'notifications', 'email'],  changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
						}
					}
				}
			}
		}, );
	});

	test('updates a deep property with deep string of props and partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30
			}
		}
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( 'user.profile.settings.notifications',  changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
					}
				}
			}
		}, );
	});

	test('updates a deep property with string and value', () => {
		const changes = ['Tom'];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( '[friends]',  changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	});

	test('updates a deep property with deep string prop and value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( 'user.profile.settings.notifications.email', changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
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
						}
					}
				}
			}
		}, );
	});

	test('updates a deep property with deep string prop with dot and value', () => {
		const changes = {
			'profile.name': 'Jon',
			'[profile.name]': 'Jon',
			profile: {
				name: 'Jon',
			}
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( 'user', changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				...changes,
				profile: {
					...initial.user.profile,
					...changes.profile,
				}
			}
		}, );
	});

	test('updates a deep property with deep string prop with dot and value', () => {
		const changes = 'Jon';
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const res1 = {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					name: changes,
				}
			}
		};

		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( 'user.profile.name', changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( res1, );

		const res2 = {
			...initial,
			user: {
				...initial.user,
				'profile.name': changes,
				profile: {
					...initial.user.profile,
					name: changes,
				}
			}
		};
		act( () => {
			result.current[1].cta.updateInitialDeep('user.profile\\.name', changes,);
		});
		expect( result.current[ 0 ].initial, ).toStrictEqual( res2, );

		const res3 = {
			...res2,
			user: {
				...res2.user,
				'[profile.name]': changes,
				profile: {
					...res2.user.profile,
					name: changes,
				}
			}
		};
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( 'user.[profile\\.name]', changes,);
		});

		expect( result.current[ 0 ].initial, ).toStrictEqual( res3, );
	});

	test('updates [friends] value', () => {
		const changes = ['Jon'];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep( '[friends]', changes,);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	});


	test('updates key 1 value', () => {
		const changes =  {
			greet: 'hello',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.updateInitialDeep(1, changes);
		}, );

		expect( result.current[ 0 ].initial, ).toStrictEqual( {
			...initial,
			1: {
				...initial[ 1 ],
				...changes,
			}
		}, );
	});
});
