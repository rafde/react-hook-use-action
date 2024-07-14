import { returnUseCTAParameter, } from '../../src';

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

export const resetCTAParams = returnUseCTAParameter( {
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

export const resetCTAWithOptionsParams = returnUseCTAParameter( {
	initial,
	actions: {
		reset( state, payload, options?: { rejectNegativeTest1: boolean }, ) {
			if ( !payload || typeof payload !== 'object' ) {
				let {
					test1,
				} = state.initial;

				if ( state.initial.test2 === 'be cool' ) {
					return;
				}

				if ( test1 < 0 && options?.rejectNegativeTest1 ) {
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

			if ( test1 < 0 && options?.rejectNegativeTest1 ) {
				test1 = 0;
			}

			return {
				...payload,
				test1,
			};
		},
	},
}, );

export const updateCTAParam = returnUseCTAParameter( {
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

export const updateCTAWithOptionParam = returnUseCTAParameter( {
	initial,
	actions: {
		update( state, payload, options?: { rejectNegativeTest1: boolean }, ) {
			const {
				test1,
				..._payload
			} = payload;
			if ( typeof test1 === 'number' && test1 < 0 && options?.rejectNegativeTest1 ) {
				return _payload;
			}
			return payload;
		},
	},
}, );

export const updateInitialCTAParam = returnUseCTAParameter( {
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

export const updateInitialCTAWithOptionParam = returnUseCTAParameter( {
	initial,
	actions: {
		updateInitial( state, payload, options?: { rejectNegativeTest1: boolean }, ) {
			const {
				test1,
				..._payload
			} = payload;
			if ( typeof test1 === 'number' && test1 < 0 && options?.rejectNegativeTest1 ) {
				return _payload;
			}
			return payload;
		},
	},
}, );
