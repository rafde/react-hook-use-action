import { ctaCallback, } from '../src';

describe( 'ctaCallback', () => {
	const initial = {
		count: 0,
		text: 'initial',
		isActive: false,
		2: 'number',
	};

	test( 'should initialize with correct default state', () => {
		const [state,] = ctaCallback( {
			initial,
			actions: {},
		}, );

		expect( state, ).toEqual( {
			changes: null,
			current: initial,
			initial,
			previous: null,
			previousInitial: null,
		}, );
	}, );

	test( 'should handle update action', () => {
		const [, dispatch,] = ctaCallback( { initial, }, );
		const count = 1;
		const newState = dispatch.cta.update( { count, }, );

		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle update(string, value) action', () => {
		const [, dispatch,] = ctaCallback( { initial, }, );
		const count = 1;
		const newState = dispatch.cta.update( 'count', count, );

		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle update(number, value) action', () => {
		const [, dispatch,] = ctaCallback( { initial, }, );
		const val = 'count';
		const newState = dispatch.cta.update( 2, val, );

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
		const [, dispatch,] = ctaCallback( { initial, }, );
		const count = 1;
		dispatch.cta.update( { count, }, );
		const resetState = dispatch.cta.reset();

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
		const count = 1;
		const [, dispatch,] = ctaCallback( {
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

		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle custom update action', () => {
		const count = 1;
		const text = 'customUpdate';
		const [, dispatch,] = ctaCallback( {
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
		const [, dispatch,] = ctaCallback( { initial, }, );

		const newState = dispatch.cta.updateInitial( { count, }, );

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
		const [, dispatch,] = ctaCallback( { initial, }, );

		const newInitial = {
			2: 'replaceInitial',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replaceInitial( newInitial, );

		expect( newState.current, ).toStrictEqual( initial, );
		expect( newState.previous, ).toBeNull( );
		expect( newState.initial, ).toEqual( newInitial, );
		expect( newState.previousInitial, ).toEqual( initial, );
		expect( newState.changes, ).toStrictEqual( initial, );
	}, );

	test( 'should handle replace action', () => {
		const [, dispatch,] = ctaCallback( { initial, }, );

		const newInitial = {
			2: 'replace',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replace( newInitial, );

		expect( newState.current, ).toStrictEqual( newInitial, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( newInitial, );
	}, );

	test( 'should handle custom compare function', () => {
		const customCompare = ( a: unknown, b: unknown, ) => JSON.stringify( a, ) === JSON.stringify( b, );
		const [, dispatch,] = ctaCallback( {
			initial,
			compare: customCompare,
		}, );

		const newState = dispatch.cta.update( { count: 0, }, );
		expect( newState.changes, ).toBeNull( );
	}, );
}, );
