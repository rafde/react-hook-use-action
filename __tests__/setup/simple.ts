import { returnCTAParameter, } from '../../src';

export const initial = {
	test1: 1,
	test2: 'test2',
	test3: true,
	2: 2,
};

export const changes = {
	test1: 10,
	test2: 'changes',
};

export const initialChanges = {
	test1: 1,
	test2: 'test2',
};

export const payload = {
	...initial,
	...changes,
};

export const arbitraryKey = {
	'arbitrary key': 'value',
};

export const resetCTAParams = returnCTAParameter( {
	initial,
	actions: {
		reset( state, payload, ) {
			if ( !payload || typeof payload !== 'object' ) {
				let {
					test1,
				} = state.initial;

				if ( state.initial.test2 === 'be cool' ) {
					return;
				}

				if ( test1 < 0 ) {
					test1 = 0;
				}

				return {
					...state.initial,
					test1,
				};
			}

			let {
				test1,
			} = payload;

			if ( payload.test2 === 'be cool' ) {
				return;
			}

			if ( test1 < 0 ) {
				test1 = 0;
			}

			return {
				...payload,
				test1,
			};
		},
	},
}, );

export const updateCTAParam = returnCTAParameter( {
	initial,
	actions: {
		update( state, payload, ) {
			const {
				test1,
				..._payload
			} = payload;
			if ( typeof test1 === 'number' && test1 < 0 ) {
				return _payload;
			}
			return payload;
		},
	},
}, );

export const updateInitialCTAParam = returnCTAParameter( {
	initial,
	actions: {
		updateInitial( state, payload, ) {
			const {
				test1,
				..._payload
			} = payload;
			if ( typeof test1 === 'number' && test1 < 0 ) {
				return _payload;
			}
			return payload;
		},
	},
}, );

export const nestedInitial = {
	user: {
		'profile.name': 'John',
		'[profile.name]': 'John',
		profile: {
			name: 'John',
			contacts: [
				{type: 'email', value: 'john.doe@example.com'},
			],
			settings: {
				notifications: {
					email: true,
					push: true,
					frequency: {
						daily: 5,
						weekly: 10
					},
					favoriteDays: ['Monday', 'Wednesday', 'Friday']
				},
				theme: {
					mode: 'light',
					colors: {
						primary: '#111',
						secondary: '#fff'
					}
				}
			}
		},
		metadata: {
			lastLogin: new Date('2023-04-01'),
			visits: 43,
			preferences: new Set(['music', 'sports'])
		}
	},
	'[friends]': ['Jim'],
	'.[friends]': ['Jim'],
	'.[friends].': ['Jim'],
	'.[.].': ['Jim'],
	'.[.].[asdf.dddd]': ['Jim'],
	1: {
		greet: 'hello',
		friendly: true
	},
}
