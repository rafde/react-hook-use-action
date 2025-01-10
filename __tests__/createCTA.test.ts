import { createCTA, } from '../src';

describe( 'createCTA', () => {
	const initial = {
		count: 0,
		text: 'initial',
		isActive: false,
		2: 'number',
	};

	test( 'should initialize with correct default state', () => {
		const [state,] = createCTA( {
			actions: {},
			afterActionChange() {
				// here for verifying that it accepts parameter
			},
			compare() {
				return true;
			},
			initial,
			// @ts-expect-error ensuring that this parameter is not accepted
			onInit() {

			},
			transform( payload, ) {
				return payload;
			},
		}, );

		expect( state, ).toEqual( {
			changes: null,
			current: initial,
			initial,
			previous: null,
			previousInitial: null,
		}, );
	}, );

	test( 'should initialize with history equal to dispatch.history', () => {
		const [
			state,
			dispatch,
		] = createCTA( {
			initial,
			actions: {},
		}, );

		expect( state, ).toEqual( dispatch.history, );
	}, );

	test( 'should handle update action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const count = 1;
		const newState = dispatch.cta.update( { count, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle update(string, value) action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const count = 1;
		const newState = dispatch.cta.update( 'count', count, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle update(number, value) action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const val = 'count';
		const newState = dispatch.cta.update( 2, val, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			2: val,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { 2: val, }, );
	}, );

	test( 'should handle reset action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const count = 1;
		dispatch.cta.update( { count, }, );
		const resetState = dispatch.cta.reset();

		expect( resetState, ).toStrictEqual( dispatch.history, );
		expect( resetState.current, ).toStrictEqual( initial, );
		expect( resetState.previous, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( resetState.initial, ).toStrictEqual( initial, );
		expect( resetState.previousInitial, ).toBeNull( );
		expect( resetState.changes, ).toBeNull( );
	}, );

	test( 'should handle custom actions', () => {
		const [history, dispatch,] = createCTA( {
			initial,
			actions: {
				increment( ctaParam, ) {
					const { current, } = ctaParam;
					return {
						count: current.count + 1,
					};
				},
			},
		}, );
		const newState = dispatch.cta.increment();

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count: history.current.count + 1,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( {
			count: history.current.count + 1,
		}, );
	}, );

	test( 'should handle custom update action', () => {
		const count = 1;
		const text = 'customUpdate';
		const [, dispatch,] = createCTA( {
			initial,
			actions: {
				update( ctaParam, payload, ) {
					return {
						...payload,
						count: ctaParam.current.count + 1,
					};
				},
			},
		}, );

		const newState = dispatch.cta.update( { text, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			text,
			count,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( {
			count,
			text,
		}, );
	}, );

	test( 'should handle updateInitial action', () => {
		const count = 1;
		const [, dispatch,] = createCTA( { initial, }, );

		const newState = dispatch.cta.updateInitial( { count, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( initial, );
		expect( newState.previous, ).toBeNull( );
		expect( newState.initial, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState.previousInitial, ).toEqual( initial, );
		expect( newState.changes, ).toStrictEqual( { count: initial.count, }, );
	}, );

	test( 'should handle replaceInitial action', () => {
		const [, dispatch,] = createCTA( { initial, }, );

		const newInitial = {
			2: 'replaceInitial',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replaceInitial( newInitial, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( initial, );
		expect( newState.previous, ).toBeNull( );
		expect( newState.initial, ).toEqual( newInitial, );
		expect( newState.previousInitial, ).toEqual( initial, );
		expect( newState.changes, ).toStrictEqual( initial, );
	}, );

	test( 'should handle replace action', () => {
		const [, dispatch,] = createCTA( { initial, }, );

		const newInitial = {
			2: 'replace',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replace( newInitial, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( newInitial, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( newInitial, );
	}, );

	test( 'should handle optional parameters', () => {
		const payload = { count: 3, };
		const compare = jest.fn( ( a: unknown, b: unknown, ) => JSON.stringify( a, ) === JSON.stringify( b, ), );
		const afterActionChange = jest.fn( () => {
			// ensure this is called after the action has changed data
		}, );
		const transform = jest.fn( payload => payload, );
		const [, dispatch,] = createCTA( {
			initial,
			compare,
			afterActionChange,
			transform,
		}, );

		const newState = dispatch.cta.update( payload, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.changes, ).toStrictEqual( payload, );
		expect( compare, ).toHaveBeenCalled();
		expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		expect( transform, ).toHaveBeenCalledTimes( 1, );
	}, );
}, );
